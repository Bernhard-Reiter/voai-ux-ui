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

copyRecursiveSync(stylesDir, path.join(distDir, 'styles'));

const cssSrc = path.join(srcDir, 'styles.css');
if (fs.existsSync(cssSrc)) {
  fs.copyFileSync(cssSrc, path.join(distDir, 'styles.css'));
}

console.log('Styles copied to dist');



