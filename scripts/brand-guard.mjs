import { globby } from "globby";
import fs from "node:fs/promises";

const allowedHex = new Set([
  "#000000","#0a0a0a","#ffffff","#fafafa","#f5f5f5","#e5e7eb","#d1d5db",
  "#9ca3af","#6b7280","#4b5563","#374151","#1f2937","#16a34a" // accent
]);

const disallowedClassPatterns = [
  /\b(bg|text|ring|from|via|to)-(?:red|blue|yellow|purple|pink|amber|lime|emerald|teal|cyan|indigo|rose)\b/i,
  /\bshadow-(md|lg|xl|2xl|inner|black)\b/i,
  /\bbackdrop-|\bglow|\bneon|\bglassmorphism/i,
  /\brounded-(2xl|3xl|full)\b(?!:)/i // nur wenn nicht ausdrücklich gewünscht
];

const fileGlobs = [
  "packages/**/*.{ts,tsx,css}", 
  "src/**/*.{ts,tsx,css}",
  "!packages/**/dist/**",
  "!packages/**/_archive/**",
  "!packages/**/node_modules/**"
];
const files = await globby(fileGlobs);

let errors = [];
for (const f of files) {
  const txt = await fs.readFile(f, "utf8");

  // 1) Disallowed classes
  for (const pat of disallowedClassPatterns) {
    if (pat.test(txt)) errors.push(`${f}: disallowed class match -> ${pat}`);
  }

  // 2) Disallowed hex (nur exakt erlaubte)
  const hexes = txt.match(/#[0-9a-fA-F]{6}\b/g) || [];
  for (const h of hexes) {
    const low = h.toLowerCase();
    if (!allowedHex.has(low)) errors.push(`${f}: disallowed hex -> ${h}`);
  }

  // 3) Grün als Fläche/CTA (Heuristik)
  if (/(bg|fill|border)-\[?#?16a34a/i.test(txt)) {
    errors.push(`${f}: accent green must not be used as surface/CTA`);
  }
}

if (errors.length) {
  console.error("❌ Brand violations:\n" + errors.map(e => " - " + e).join("\n"));
  process.exit(1);
} else {
  console.log("✅ Brand-Guard passed.");
}