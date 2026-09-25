export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const brazilTimezone = "America/Sao_Paulo";
const allowedFields = new Set(["nome", "email", "whatsapp", "consentimento_contato"]);

type LeadPayload = {
  nome: string;
  email: string;
  whatsapp: string;
  consentimento_contato: "sim";
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function textValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeWhatsapp(value: string) {
  const digits = value.replace(/\D/g, "");
  const nationalNumber = digits.startsWith("55") ? digits.slice(2) : digits;

  if (!/^\d{10,11}$/.test(nationalNumber) || nationalNumber.startsWith("0")) return null;

  return `+55${nationalNumber}`;
}

function saoPauloTimestamp() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: brazilTimezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const getPart = (type: string) => parts.find((part) => part.type === type)?.value ?? "";

  return `${getPart("year")}-${getPart("month")}-${getPart("day")} ${getPart("hour")}:${getPart("minute")}:${getPart("second")}`;
}

function invalidRequest(message: string) {
  return Response.json({ persisted: false, message }, { status: 400 });
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return invalidRequest("Dados inválidos.");
  }

  if (!isRecord(body) || Object.keys(body).some((field) => !allowedFields.has(field))) {
    return invalidRequest("Dados inválidos.");
  }

  const nome = textValue(body.nome);
  const email = textValue(body.email);
  const whatsapp = normalizeWhatsapp(textValue(body.whatsapp));
  const consentimento = textValue(body.consentimento_contato);

  if (nome.length < 2) return invalidRequest("Nome inválido.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return invalidRequest("E-mail inválido.");
  if (!whatsapp) return invalidRequest("WhatsApp inválido.");
  if (consentimento !== "sim") return invalidRequest("Consentimento obrigatório.");

  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  const webhookSecret = process.env.N8N_WEBHOOK_SECRET;

  if (!webhookUrl || !webhookSecret) {
    return Response.json({ persisted: false }, { status: 503 });
  }

  const payload: LeadPayload & { timestamp: string } = {
    timestamp: saoPauloTimestamp(),
    nome,
    email,
    whatsapp,
    consentimento_contato: "sim",
  };
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 7000);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        key: webhookSecret,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) return Response.json({ persisted: false }, { status: 502 });

    return Response.json({ persisted: true }, { status: 201 });
  } catch {
    return Response.json({ persisted: false }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}
