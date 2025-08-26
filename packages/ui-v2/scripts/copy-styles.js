/* eslint-disable */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const srcDir = path.join(root, 'src');
const stylesDir = path.join(srcDir, 'styles');
const distDir = path.join(root, 'dist');

function copyRecursiveSync(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src)) {
    const s = path.join(src, entry);
    const d = path.join(dest, entry);
    const stat = fs.statSync(s);
    if (stat.isDirectory()) {
      copyRecursiveSync(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

// Copy all style files
copyRecursiveSync(stylesDir, path.join(distDir, 'styles'));

// Also copy circula-tokens.css to dist root for backward compatibility
const circulaTokensSource = path.join(stylesDir, 'circula-tokens.css');
if (fs.existsSync(circulaTokensSource)) {
  fs.copyFileSync(circulaTokensSource, path.join(distDir, 'circula-tokens.css'));
  console.log('Copied circula-tokens.css to dist root');
}

// Create a concatenated styles.css file that includes all imports inline
const circulaTokensPath = path.join(stylesDir, 'circula-tokens.css');
const circulaGlobalsPath = path.join(stylesDir, 'circula-globals.css');

if (fs.existsSync(circulaTokensPath) && fs.existsSync(circulaGlobalsPath)) {
  const circulaTokens = fs.readFileSync(circulaTokensPath, 'utf8');
  const circulaGlobals = fs.readFileSync(circulaGlobalsPath, 'utf8');
  
  const combinedStyles = `/* Circula Design System - Combined Styles */
/* This file is auto-generated, do not edit directly */

/* ========== Circula Tokens ========== */
${circulaTokens}

/* ========== Circula Globals ========== */
${circulaGlobals}
`;
  
  // Write the combined styles file
  fs.writeFileSync(path.join(distDir, 'styles.css'), combinedStyles);
  console.log('Created combined styles.css with inlined imports');
} else {
  // Fallback: just copy the original file
  const cssSrc = path.join(srcDir, 'styles.css');
  if (fs.existsSync(cssSrc)) {
    fs.copyFileSync(cssSrc, path.join(distDir, 'styles.css'));
  }
}

console.log('Styles copied to dist');



