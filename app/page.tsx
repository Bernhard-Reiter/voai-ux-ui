"use client";

import React, { useEffect, useState, HTMLAttributes, ButtonHTMLAttributes } from "react";

// =====================
// Utils & Brand
// =====================
function clsx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}
function assert(cond: boolean, msg: string) {
  if (!cond) throw new Error(msg);
}
const ACCENT = "#7DC182"; // subtle accent
const HERO_SOURCES = [
  "/images/hero-placeholder.svg",
  "/hero-mock.svg",
]; // Fallback-Kandidaten für das Hero-Bild
function formatEuro(n: number) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

// =====================
// Primitives
// =====================
export function Container({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8", className)} {...props} />;
}
export function Section({ className = "", ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={clsx("py-20 md:py-28", className)} {...props} />;
}
export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("rounded-3xl border border-gray-200 bg-white shadow-sm transition", className)} {...props} />;
}
export function Button({ variant = "primary", className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "inverse" }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-2xl px-6 md:px-8 py-4 md:py-5 text-base md:text-lg font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black disabled:opacity-50 disabled:pointer-events-none";
  const styles: Record<string, string> = {
    primary: `${base} bg-black text-white hover:opacity-90`,
    secondary: `${base} border border-gray-300 text-gray-900 hover:bg-gray-100`,
    inverse: `${base} border border-white/70 text-white hover:bg-white hover:text-black`,
  };
  return <button className={clsx(styles[variant], className)} {...props} />;
}
function IconCheck({ className = "", style = {} as React.CSSProperties }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={className} style={style}>
      <path d="M7.5 10.5l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// =====================
// Layout: Header & Footer
// =====================
function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur">
      <Container className="flex items-center gap-6 py-3 md:py-4">
        <a href="#" className="flex items-baseline gap-2">
          <span className="text-2xl" style={{ color: ACCENT }}>●</span>
          <span className="text-2xl font-semibold tracking-tight">voai</span>
        </a>
        <nav className="ml-auto hidden md:flex items-center gap-6 text-sm text-gray-700">
          <a href="#how" className="hover:underline">Wie es funktioniert</a>
          <a href="#testimonials" className="hover:underline">Beispiele</a>
          <a href="#pricing" className="hover:underline">Preise</a>
          <a href="#faq" className="hover:underline">FAQ</a>
          <a href="#login" className="hover:underline">Login</a>
        </nav>
        <div className="hidden md:block">
          <Button className="btn-sm btn-accent">Kostenlos starten</Button>
        </div>
      </Container>
    </header>
  );
}
function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <Container className="py-12 md:py-16">
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-700">
          <a href="#team" className="hover:underline">Das Team</a>
          <span>•</span>
          <a href="#mission" className="hover:underline">Mission</a>
          <span>•</span>
          <a href="#blog" className="hover:underline">Blog</a>
          <span>•</span>
          <a href="#support" className="hover:underline">Support</a>
          <span>•</span>
          <a href="#impressum" className="hover:underline">Impressum</a>
          <span>•</span>
          <a href="#datenschutz" className="hover:underline">Datenschutz</a>
          <span>•</span>
          <a href="#agb" className="hover:underline">AGB</a>
        </div>
        <div className="mt-6 text-center text-xs text-gray-600">© 2025 voai GmbH – Wir verhandeln für dich.</div>
      </Container>
    </footer>
  );
}

// =====================
// HERO
// =====================
function Hero() {
  const [heroIdx, setHeroIdx] = useState(0 as number);
  return (
    <div className="px-4 md:px-6 lg:px-8">
      <section id="hero" className="relative mx-auto mt-4 h-[72vh] w-full max-w-[1400px] overflow-hidden rounded-[32px]">
        <div className="absolute inset-0">
          <img
            src={HERO_SOURCES[heroIdx]}
            alt="voai hero"
            className="h-full w-full object-cover"
            onError={() => setHeroIdx((i) => (i + 1 < HERO_SOURCES.length ? i + 1 : i))}
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.30),rgba(0,0,0,0.55))]" />
        </div>
        <Container className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <div className="mb-3 text-sm uppercase tracking-[0.18em] opacity-90">Dein Angebot ist zu teuer?</div>
          <h1 className="max-w-[22ch] text-4xl md:text-6xl lg:text-7xl font-medium leading-[0.98]">
            <span data-hero-dot className="align-middle text-5xl md:text-6xl lg:text-7xl" style={{ color: ACCENT }}>●</span> voai – einfach sparen!
          </h1>
          <p className="mt-4 max-w-[60ch] text-lg md:text-xl text-white/90">Wir verhandeln fair, professionell und ohne Risiko.<br className="hidden md:inline" />Keine Ersparnis = keine Kosten. <strong>Garantiert.</strong></p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button variant="inverse" className="!bg-white !text-black !border-0 !rounded-full !px-6 !py-3 md:!px-7 md:!py-3.5 shadow-lg">Erstes Angebot hochladen</Button>
            <Button variant="inverse" className="!rounded-full !px-6 !py-3 md:!px-7 md:!py-3.5 !border-white/40 !text-white !bg-white/10 backdrop-blur hover:!bg-white hover:!text-black">Beispiel ansehen →</Button>
          </div>
          {/* Trust bullets */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-white/90">
            <div className="flex items-center gap-2"><IconCheck className="w-5 h-5" style={{ color: ACCENT }} /><span>100&nbsp;% erfolgsbasiert</span></div>
            <div className="flex items-center gap-2"><IconCheck className="w-5 h-5" style={{ color: ACCENT }} /><span>Transparent & fair</span></div>
            <div className="flex items-center gap-2"><IconCheck className="w-5 h-5" style={{ color: ACCENT }} /><span>Ergebnis in 24h</span></div>
          </div>
        </Container>
        {/* Glassy cards overlay á la Circula */}
        <div className="pointer-events-none absolute bottom-6 left-0 right-0">
          <Container className="pointer-events-auto">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/20 bg-white/15 backdrop-blur-md text-white p-6">
                <div className="mb-2 text-sm opacity-90">Automatisiert & selbsterklärend</div>
                <div className="text-xs opacity-80">80 % weniger Aufwand, keine Schulungen</div>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/15 backdrop-blur-md text-white p-6">
                <div className="mb-2 text-sm opacity-90">Nahtlose Integration</div>
                <div className="text-xs opacity-80">Kompatibel mit typischen Workflows</div>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/15 backdrop-blur-md text-white p-6">
                <div className="mb-2 text-sm opacity-90">100 % konform</div>
                <div className="text-xs opacity-80">Datenschutz & Fairness im Fokus</div>
              </div>
            </div>
          </Container>
        </div>
      </section>
    </div>
  );
}

// =====================
// WHY (Vertrauensbuilder)
// =====================
function Why() {
  return (
    <Section id="why">
      <Container>
        <div className="mx-auto max-w-4xl text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Warum voai?</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-8">
            <h3 className="text-xl font-semibold mb-2">Mathematisch optimiert</h3>
            <p className="text-gray-700">Unsere KI erkennt Verhandlungsspielräume, die andere übersehen.</p>
          </Card>
          <Card className="p-8">
            <h3 className="text-xl font-semibold mb-2">Rechtlich sicher</h3>
            <p className="text-gray-700">Vollmacht-basiert, DSGVO-konform.</p>
          </Card>
          <Card className="p-8">
            <h3 className="text-xl font-semibold mb-2">Risikofrei</h3>
            <p className="text-gray-700">Kein Erfolg = keine Kosten. Punkt.</p>
          </Card>
        </div>
      </Container>
    </Section>
  );
}

// =====================
// HOW IT WORKS (3 Schritte)
// =====================
function How() {
  return (
    <Section id="how" className="bg-[#F8FAFC]">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold" style={{ letterSpacing: "-0.01em", lineHeight: 0.95 }}>Wie es funktioniert</h2>
          <p className="max-w-[60ch] mx-auto text-lg md:text-xl text-gray-600 leading-relaxed">In drei Schritten zu echten Einsparungen – ohne Risiko.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "1. Angebot hochladen", desc: "Foto, PDF oder Link – wir analysieren automatisch." },
            { title: "2. Wir verhandeln für dich", desc: "Mit Marktvergleichen und erprobten Strategien." },
            { title: "3. Du bekommst das Ergebnis", desc: "Neues Angebot mit dokumentierter Ersparnis." },
          ].map((x, i) => (
            <Card key={i} className="p-8">
              <div className="mb-5 h-16 w-16 rounded-3xl" style={{ background: "#F1F5F9" }} />
              <h3 className="mb-2 text-xl font-semibold">{x.title}</h3>
              <p className="text-gray-700">{x.desc}</p>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a href="#testimonials" className="inline-flex items-center gap-2 text-gray-900 hover:underline">Beispiel ansehen →</a>
        </div>
      </Container>
    </Section>
  );
}

// =====================
// USE CASES (Einsatzbereiche)
// =====================
function UseCases() {
  const items = [
    { t: "Küchen & Möbel", s: "bis zu 25 % möglich" },
    { t: "Elektronik & Technik", s: "10–20 % realistisch" },
    { t: "Handwerk & Renovierung", s: "15–30 %" },
    { t: "Fahrzeuge & Mobilität", s: "5–15 %" },
  ];
  return (
    <Section id="cases">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold">Einsatzbereiche</h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-[60ch] mx-auto">Wo voai wirkt – und wie viel realistisch drin ist.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {items.map((x, i) => (
            <Card key={i} className="p-8">
              <h3 className="mb-1 text-xl font-semibold">{x.t}</h3>
              <p className="text-sm text-gray-700">{x.s}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// =====================
// PRICING — Transparente Preisgestaltung
// =====================
function Pricing() {
  useEffect(() => {
    const sec = document.getElementById('pricing');
    assert(!!sec, 'Pricing section missing');
    const txtRaw = sec?.textContent || '';
    const txt = txtRaw.toLowerCase().replace(/\u00a0/g, ' ');

    // Robust bullets (case/format tolerant)
    assert(/standard/.test(txt) && /10\s*%/.test(txt), 'Pricing bullet missing: Standard 10 %');
    assert(/mindestgebühr/.test(txt), 'Pricing bullet missing: Mindestgebühr');
    assert(/kein erfolg/.test(txt) && /0\s*€/.test(txt), 'Pricing bullet missing: Kein Erfolg = 0 €');

    // Example numbers present
    ['5.000', '4.250', '750', '75', '675'].forEach((n) => assert((sec?.textContent || '').includes(n), `Pricing example ${n} missing`));
  }, []);

  return (
    <Section id="pricing" className="bg-[#F8FAFC]">
      <Container>
        <div className="mx-auto max-w-4xl text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Transparente Preisgestaltung</h2>
          <p className="text-lg md:text-xl text-gray-600">Fair. Einfach. Erfolgsbasiert.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <Card className="p-8">
            <h3 className="text-xl font-semibold mb-2">Standard</h3>
            <p className="text-4xl font-semibold" style={{ color: ACCENT }}>10 %</p>
            <p className="text-gray-700 mt-2">Erfolgsprovision</p>
          </Card>
          <Card className="p-8">
            <h3 className="text-xl font-semibold mb-2">Mindestgebühr</h3>
            <p className="text-4xl font-semibold text-gray-900">20 €</p>
            <p className="text-gray-700 mt-2">pro Verhandlung</p>
          </Card>
          <Card className="p-8">
            <h3 className="text-xl font-semibold mb-2">Kein Erfolg</h3>
            <p className="text-4xl font-semibold" style={{ color: ACCENT }}>0 €</p>
            <p className="text-gray-700 mt-2">Kosten</p>
          </Card>
        </div>

        <Card className="p-8">
          <h3 className="text-xl font-semibold mb-4">Beispielrechnung</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-gray-800">
            <div className="flex justify-between"><span>Angebot</span><strong>5.000 €</strong></div>
            <div className="flex justify-between"><span>voai verhandelt</span><strong>4.250 €</strong></div>
            <div className="flex justify-between"><span>Deine Ersparnis</span><strong>750 €</strong></div>
            <div className="flex justify-between"><span>voai Provision (10%)</span><strong>75 €</strong></div>
            <div className="flex justify-between border-t pt-2"><span>Dein Vorteil</span><strong style={{ color: ACCENT }}>675 €</strong></div>
          </div>
          <p className="mt-4 text-gray-600">👉 Kurz gesagt: voai kostet dich nur, wenn wir sparen.</p>
        </Card>
      </Container>
    </Section>
  );
}

// =====================
// CALCULATOR — Interaktiver Ersparnis‑Rechner
// =====================
function Calculator() {
  const [amount, setAmount] = useState(5000);
  const savingRate = 0.15; // Annahme 15 % (bitte bestätigen)
  const saving = Math.round(amount * savingRate);
  const fee = Math.round(saving * 0.10);
  const gain = saving - fee;

  useEffect(() => {
    // Programmatic slider test -> ensure UI updates
    const el = document.getElementById('calc-amount') as HTMLInputElement | null;
    if (el) {
      el.value = '10000';
      el.dispatchEvent(new Event('input', { bubbles: true }));
      // wait one frame for React to commit
      setTimeout(() => {
        const s = document.getElementById('calc-saving')?.textContent || '';
        const f = document.getElementById('calc-fee')?.textContent || '';
        const g = document.getElementById('calc-gain')?.textContent || '';
        assert(s.includes(formatEuro(1500)), 'Calculator values not updating as expected (saving)');
        assert(f.includes(formatEuro(150)), 'Calculator values not updating as expected (fee)');
        assert(g.includes(formatEuro(1350)), 'Calculator values not updating as expected (gain)');
      }, 0);
    }
  }, []);

  return (
    <Section id="calculator">
      <Container>
        <div className="mx-auto max-w-3xl text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Wie viel kannst du mit voai sparen?</h2>
          <p className="text-gray-600 mt-2">Schieberegler bewegt den Angebotswert. <span className="italic">Standardannahme: 15&nbsp;% Ersparnis.</span></p>
        </div>
        <Card className="p-8">
          <label htmlFor="calc-amount" className="block text-sm text-gray-700 mb-2">Angebotswert</label>
          <input id="calc-amount" type="range" min={1000} max={50000} step={250} defaultValue={amount} onInput={(e) => setAmount(parseInt((e.target as HTMLInputElement).value))} className="w-full" />
          <div className="mt-2 text-sm text-gray-600">Aktuell: <strong>{formatEuro(amount)}</strong></div>

          <div id="calc-values" className="mt-6 grid sm:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-sm text-gray-600">Geschätzte Ersparnis</div>
              <div id="calc-saving" className="text-3xl font-semibold" style={{ color: ACCENT }}>{formatEuro(saving)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Deine Kosten (10 %)</div>
              <div id="calc-fee" className="text-3xl font-semibold text-gray-900">{formatEuro(fee)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Dein Gewinn</div>
              <div id="calc-gain" className="text-3xl font-semibold" style={{ color: ACCENT }}>{formatEuro(gain)}</div>
            </div>
          </div>

          {/* Garantien */}
          <div className="mt-8 grid sm:grid-cols-3 gap-4 text-left">
            <div className="rounded-2xl border p-4"><strong>✅ Erfolgsgarantie</strong><div>Kein Erfolg = 0 € Kosten</div></div>
            <div className="rounded-2xl border p-4"><strong>✅ Zufriedenheitsgarantie</strong><div>Erste Provision zurück bei Unzufriedenheit</div></div>
            <div className="rounded-2xl border p-4"><strong>✅ Geschwindigkeitsgarantie</strong><div>Ergebnis in 48h oder gratis</div></div>
          </div>
        </Card>
      </Container>
    </Section>
  );
}

// =====================
// TESTIMONIALS — Erste Erfolge
// =====================
function Testimonials() {
  const items = [
    { q: "890 € bei meinem E-Bike gespart!", a: "Marco, Early Adopter" },
    { q: "Küchen-Angebot um 1.650 € reduziert.", a: "Anna, Beta-Testerin" },
    { q: "Handwerker-Rechnung 430 € günstiger.", a: "Tim, Pilot-Kunde" },
  ];
  return (
    <Section id="testimonials" className="bg-[#F8FAFC]">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold">Erste Erfolge</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((x, i) => (
            <Card key={i} className="p-8">
              <p className="mb-3 text-lg text-gray-800">"{x.q}"</p>
              <div className="text-sm text-gray-600">{x.a}</div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// =====================
// QUALITY & SECURITY
// =====================
function Quality() {
  return (
    <Section id="quality">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold">Qualität & Sicherheit</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-8"><h3 className="text-xl font-semibold mb-2">Verschlüsselte Datenübertragung</h3><p className="text-gray-700">State‑of‑the‑art Transport- und Ruhende‑Daten‑Sicherheit.</p></Card>
          <Card className="p-8"><h3 className="text-xl font-semibold mb-2">DSGVO‑konform & geprüft</h3><p className="text-gray-700">Vertragliche und technische Maßnahmen nach EU‑Standards.</p></Card>
          <Card className="p-8"><h3 className="text-xl font-semibold mb-2">Kontrolle behalten</h3><p className="text-gray-700">Jederzeit abbrechen – Datenlöschung garantiert.</p></Card>
        </div>
      </Container>
    </Section>
  );
}

// =====================
// FAQ
// =====================
function FAQ() {
  return (
    <Section id="faq" className="bg-[#F8FAFC]">
      <Container>
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl md:text-4xl font-semibold" style={{ letterSpacing: "-0.01em", lineHeight: 0.95 }}>FAQ</h2>
        </div>
        <div className="mx-auto max-w-3xl">
          <details className="mb-4 rounded-2xl border border-gray-300 bg-white p-5">
            <summary className="cursor-pointer text-sm font-semibold">Warum sollte ich euch vertrauen?</summary>
            <p className="mt-3 text-sm text-gray-700">Weil wir nur verdienen, wenn du sparst.</p>
          </details>
          <details className="mb-4 rounded-2xl border border-gray-300 bg-white p-5">
            <summary className="cursor-pointer text-sm font-semibold">Was, wenn der Verkäufer nicht verhandelt?</summary>
            <p className="mt-3 text-sm text-gray-700">Dann kostet es dich nichts.</p>
          </details>
          <details className="mb-4 rounded-2xl border border-gray-300 bg-white p-5">
            <summary className="cursor-pointer text-sm font-semibold">Wie schnell bekomme ich ein Ergebnis?</summary>
            <p className="mt-3 text-sm text-gray-700">In 24–48 Stunden.</p>
          </details>
        </div>
      </Container>
    </Section>
  );
}

// =====================
// CLOSER CTA
// =====================
function Closer() {
  return (
    <Section id="closer">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Probier's aus – du hast nichts zu verlieren.</h2>
          <p className="mt-3 text-lg text-gray-700">Lade dein Angebot hoch und wir zeigen dir, wie viel drin ist.</p>
          <div className="mt-6"><Button>Jetzt kostenlos starten</Button></div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
            <span>✓ Keine Anmeldung nötig für den Test</span>
            <span>✓ Ergebnis in 24–48h</span>
            <span>✓ Bezahlung nur bei Erfolg</span>
          </div>
        </div>
      </Container>
    </Section>
  );
}

// =====================
// App + Global Smoke‑Tests
// =====================
export default function App() {
  const css = `
  .pricing-card { transition: all 0.3s ease; }
  .pricing-card:hover { transform: translateY(-6px); box-shadow: 0 24px 48px rgba(0,0,0,0.12); }
  /* Ensure header CTA is small and voai-green regardless of Tailwind availability */
  .btn-sm { padding: 0.5rem 0.75rem; font-size: 0.875rem; border-radius: 0.75rem; }
  .btn-accent { background-color: ${ACCENT}; color: #000; }
`;

  // Global sanity tests (aligned with latest spec)
  useEffect(() => {
    // Header: Login link present AND header CTA present, menu items present
    const header = document.querySelector('header');
    assert(!!header?.querySelector('a[href="#login"]'), 'Header Login fehlt');
    const headerBtn = Array.from(header?.querySelectorAll('button') || []).find(b => /kostenlos starten/i.test(b.textContent || ''));
    assert(!!headerBtn, 'Header CTA "Kostenlos starten" fehlt');
    const navText = (header?.textContent || '').toLowerCase().replace(/\u00a0/g, ' ');
    ['wie es funktioniert','beispiele','preise','faq','login'].forEach(k => assert(navText.includes(k), `Nav‑Eintrag fehlt: ${k}`));

    // Hero: H1 & hero dot
    const h1 = document.querySelector('#hero h1');
    assert(!!h1, 'Hero H1 fehlt');
    const dot = document.querySelector('#hero [data-hero-dot]') as HTMLElement | null;
    assert(!!dot, 'Hero‑Punkt fehlt');

    // Hero: two CTAs with the required labels
    const heroBtns = Array.from(document.querySelectorAll('#hero button'));
    const hasUpload = heroBtns.some(b => /erstes\s+angebot\s+hochladen/i.test(b.textContent || ''));
    const hasExample = heroBtns.some(b => /beispiel ansehen/i.test(b.textContent || ''));
    assert(heroBtns.length === 2 && hasUpload && hasExample, 'Hero Buttons nicht korrekt');

    // Trust bullets present including 24h (normalize nbsp)
    let heroText = document.getElementById('hero')?.textContent || '';
    heroText = heroText.replace(/\u00a0/g, ' ');
    ['100 % erfolgsbasiert', 'Transparent', '24h'].forEach(k => assert(heroText.includes(k), `Trust Bullet fehlt: ${k}`));

    // Sections exist
    ['why','how','cases','pricing','calculator','testimonials','quality','faq','closer'].forEach((id) => assert(!!document.getElementById(id), `Section #${id} fehlt`));

    // No className tokens end with '-'
    const badClassToken = Array.from(document.querySelectorAll('[class]')).some((el) => (el.getAttribute('class') || '').split(/\s+/).some((t) => t.endsWith('-')));
    assert(!badClassToken, 'Fehler: className endet mit "-"');

    // Accent NOT used as button background (we keep buttons black/white)
    const badBtn = Array.from(document.querySelectorAll('button')).some((b) => (b.getAttribute('style') || '').includes(ACCENT));
    assert(!badBtn, 'ACCENT darf nicht als Button‑Background genutzt werden');
  }, []);

  return (
    <main className="min-h-screen bg-white text-black antialiased font-sans">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <Header />
      <Hero />
      <Why />
      <How />
      <UseCases />
      <Pricing />
      <Calculator />
      <Testimonials />
      <Quality />
      <FAQ />
      <Closer />
      <Footer />
    </main>
  );
}