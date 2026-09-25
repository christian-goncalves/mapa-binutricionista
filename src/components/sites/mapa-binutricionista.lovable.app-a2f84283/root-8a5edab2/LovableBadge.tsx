import { useState } from "react";

export function LovableBadge() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <aside className="mapa-lovable-badge" aria-label="Made with Lovable">
      <a className="mapa-lovable-cta" href="https://lovable.dev/projects/lovp_1zwn378gvt8vqt3jfbqw62yg2m?utm_source=lovable-badge&utm_campaign=badge-wording-enabled" target="_blank" rel="noopener nofollow" aria-label="Made with Lovable">
        <span>Made with</span>
        <span className="mapa-lovable-wordmark"><span className="mapa-lovable-gem" aria-hidden="true">●</span>Lovable</span>
      </a>
      <button type="button" aria-label="Dismiss" title="Dismiss" onClick={() => setVisible(false)}>×</button>
    </aside>
  );
}
