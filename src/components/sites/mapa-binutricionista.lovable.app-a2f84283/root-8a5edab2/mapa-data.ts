export type MapaCategory =
  | "fome_energia"
  | "emocoes_recompensa"
  | "rotina_ambiente"
  | "regras_rigidas"
  | "piloto_automatico";

export type MapaQuestion = {
  title: string;
  support?: string;
  options: Array<{ category: MapaCategory; text: string }>;
};

export type MapaPattern = {
  name: string;
  map: string[];
  dayToDay: string[];
  observe: string[];
  experiment: string[];
};

export const categoryOrder: MapaCategory[] = [
  "fome_energia",
  "emocoes_recompensa",
  "rotina_ambiente",
  "regras_rigidas",
  "piloto_automatico",
];

export const mapaQuestions: MapaQuestion[] = [
  {
    title: "Quando você costuma comer de um jeito diferente do que pretendia?",
    support: "Escolha a situação que mais se repete.",
    options: [
      { category: "emocoes_recompensa", text: "Quando estou ansiosa, estressada ou precisando de conforto." },
      { category: "fome_energia", text: "Quando chego ao fim do dia muito cansada ou com muita fome." },
      { category: "rotina_ambiente", text: "Quando minha rotina muda ou não tenho uma opção prática organizada." },
      { category: "piloto_automatico", text: "Às vezes acontece tão automaticamente que só percebo depois." },
      { category: "regras_rigidas", text: "Quando passei o dia tentando controlar ou restringir muito o que comi." },
    ],
  },
  {
    title: "Antes desses momentos, o que costuma estar acontecendo?",
    options: [
      { category: "piloto_automatico", text: "Não costumo perceber o que aconteceu antes." },
      { category: "fome_energia", text: "Estou com muita fome ou pouca energia." },
      { category: "regras_rigidas", text: "Estou tentando controlar muito minha alimentação ou compensar algo que comi." },
      { category: "emocoes_recompensa", text: "Quero relaxar, me confortar ou ter algum prazer." },
      { category: "rotina_ambiente", text: "Estou fora da rotina ou sem uma opção prática para comer." },
    ],
  },
  {
    title: "Qual pensamento mais se aproxima do que costuma acontecer com você?",
    options: [
      { category: "rotina_ambiente", text: "“Hoje minha rotina virou uma bagunça.”" },
      { category: "emocoes_recompensa", text: "“Eu mereço.”" },
      { category: "piloto_automatico", text: "“Nem pensei. Quando percebi, já estava comendo.”" },
      { category: "regras_rigidas", text: "“Já estraguei mesmo.”" },
      { category: "fome_energia", text: "“Estou morrendo de fome.”" },
    ],
  },
  {
    title: "Depois de comer, o que costuma acontecer com mais frequência?",
    options: [
      { category: "regras_rigidas", text: "Sinto culpa e penso em compensar depois." },
      { category: "fome_energia", text: "Percebo que estava com mais fome ou mais cansada do que imaginava." },
      { category: "piloto_automatico", text: "Muitas vezes sigo sem entender exatamente por que fiz aquilo." },
      { category: "emocoes_recompensa", text: "Sinto alívio ou conforto por um tempo." },
      { category: "rotina_ambiente", text: "Penso que teria sido diferente se eu tivesse me organizado melhor." },
    ],
  },
  {
    title: "Qual dessas frases mais parece com você hoje?",
    options: [
      { category: "emocoes_recompensa", text: "“Minhas emoções interferem bastante na minha forma de comer.”" },
      { category: "rotina_ambiente", text: "“Quando minha rotina muda ou fica corrida, minha alimentação se desorganiza junto.”" },
      { category: "regras_rigidas", text: "“Tenho muitos ‘posso’, ‘não posso’, compensações e recomeços.”" },
      { category: "fome_energia", text: "“Quando chego com muita fome ou cansada, fica muito mais difícil escolher.”" },
      { category: "piloto_automatico", text: "“Muitas vezes meu comportamento acontece antes mesmo de eu perceber.”" },
    ],
  },
];

export const mapaPatterns: Record<MapaCategory, MapaPattern> = {
  fome_energia: {
    name: "Fome e energia",
    map: [
      "Suas respostas sugerem que fome intensa, cansaço ou pouca energia podem estar tendo bastante peso nas suas decisões alimentares.",
      "Quando você chega a uma escolha já muito cansada ou com muita fome, pode ficar mais difícil parar, avaliar possibilidades e decidir com calma.",
      "Isso não é necessariamente falta de controle. Às vezes, a decisão começou algumas horas antes.",
    ],
    dayToDay: [
      "passar muitas horas sem comer e chegar à próxima refeição com muita fome;",
      "terminar o dia exausta e escolher simplesmente o que estiver mais fácil ou disponível.",
    ],
    observe: ["Quando essa vontade aparece, quanta fome e quanto cansaço já estavam presentes antes dela?"],
    experiment: [
      "Escolha um horário em que isso costuma acontecer.",
      "Antes de interpretar a situação como “falta de controle”, observe: como está minha fome? Como está minha energia? O que aconteceu nas últimas horas?",
      "O objetivo não é controlar a escolha. É perceber o contexto em que ela está acontecendo.",
    ],
  },
  emocoes_recompensa: {
    name: "Emoções e recompensa",
    map: [
      "Suas respostas sugerem que a comida pode aparecer com frequência como uma forma rápida de conforto, prazer, recompensa ou alívio.",
      "Comer por prazer faz parte da alimentação.",
      "O que vale observar é quando essa resposta começa a acontecer automaticamente sempre que determinada emoção aparece.",
    ],
    dayToDay: [
      "procurar algo para comer depois de um dia estressante;",
      "usar a comida como recompensa depois de uma situação difícil ou cansativa.",
    ],
    observe: [
      "Além da comida, do que eu estava precisando naquele momento?",
      "Pode ser descanso, conforto, distração, prazer, pausa ou simplesmente comida.",
    ],
    experiment: [
      "Quando perceber esse padrão, tente nomear primeiro o que está acontecendo: “estou ansiosa?”, “estou cansada?”, “quero conforto?”, “estou com fome?”.",
      "Depois disso, faça sua escolha.",
      "O objetivo não é proibir a comida. É acrescentar consciência à decisão.",
    ],
  },
  rotina_ambiente: {
    name: "Rotina e ambiente",
    map: [
      "Suas respostas sugerem que sua alimentação pode ser bastante influenciada pela organização da rotina e pelo ambiente ao seu redor.",
      "Isso faz sentido, porque nossas decisões alimentares não acontecem isoladamente. Disponibilidade, praticidade, horários e contexto ajudam a determinar o que fica mais fácil fazer.",
    ],
    dayToDay: [
      "sua alimentação muda completamente nos dias mais corridos;",
      "quando não existe uma opção prática disponível, você acaba escolhendo apenas o que estiver mais fácil.",
    ],
    observe: ["O que o meu ambiente tornou mais fácil ou mais difícil nessa situação?"],
    experiment: [
      "Escolha apenas um momento recorrente do seu dia em que sua alimentação costuma ficar mais difícil.",
      "Pergunte: “existe alguma coisa simples que eu poderia deixar um pouco mais fácil para mim nesse horário?”",
      "Não precisa ser a opção perfeita. Precisa ser uma opção que caiba na vida real.",
    ],
  },
  regras_rigidas: {
    name: "Regras rígidas",
    map: [
      "Suas respostas sugerem que regras muito rígidas sobre alimentação podem estar participando do ciclo.",
      "Quando uma alimentação fica dividida entre “certo” e “errado”, uma escolha fora do planejado pode parecer suficiente para gerar culpa, compensação ou o pensamento de que “já estragou”.",
    ],
    dayToDay: [
      "comer algo que não estava planejado e pensar “já estraguei mesmo”;",
      "tentar compensar depois com restrição, jejum ou um novo recomeço.",
    ],
    observe: ["Qual regra eu estava tentando cumprir antes de achar que tinha falhado?"],
    experiment: [
      "Quando aparecer o pensamento “já estraguei”, experimente substituir por: “foi uma escolha. Minha próxima escolha continua disponível.”",
      "Depois, siga a alimentação normalmente.",
      "Uma decisão não precisa determinar o restante do dia.",
    ],
  },
  piloto_automatico: {
    name: "Piloto automático",
    map: [
      "Suas respostas sugerem que parte do seu comportamento alimentar pode estar acontecendo antes de você perceber conscientemente o que está fazendo.",
      "Isso pode acontecer quando um comportamento foi repetido muitas vezes no mesmo contexto.",
      "O ambiente ou determinada situação começa a funcionar quase como um sinal para a ação.",
    ],
    dayToDay: [
      "começar a comer enquanto usa o celular ou assiste televisão e perceber somente depois;",
      "procurar comida no mesmo horário ou situação sem identificar claramente o que desencadeou aquilo.",
    ],
    observe: [
      "O que estava acontecendo imediatamente antes?",
      "Onde você estava? O que estava fazendo? Quem estava por perto? Como estava se sentindo?",
    ],
    experiment: [
      "Escolha apenas um momento recorrente.",
      "Antes da primeira mordida, faça uma pausa de alguns segundos e observe: onde estou? O que estava fazendo? Estou com fome? O que aconteceu imediatamente antes?",
      "Você não precisa mudar a escolha. Primeiro, perceba.",
    ],
  },
};

export function deriveCategory(answers: Array<MapaCategory | null>): MapaCategory {
  const counts = Object.fromEntries(categoryOrder.map((category) => [category, 0])) as Record<MapaCategory, number>;
  answers.forEach((answer) => {
    if (answer) counts[answer] += 1;
  });
  const highest = Math.max(...Object.values(counts));
  const tied = categoryOrder.filter((category) => counts[category] === highest);
  const lastAnswer = answers[4];
  return lastAnswer && tied.includes(lastAnswer) ? lastAnswer : tied[0];
}

export function answerText(questionIndex: number, category: MapaCategory | null) {
  return category ? mapaQuestions[questionIndex]?.options.find((option) => option.category === category)?.text ?? null : null;
}
