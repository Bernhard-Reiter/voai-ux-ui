module.exports = {
  meta: { 
    type: "problem", 
    docs: { 
      description: "No legacy classes/green surfaces" 
    } 
  },
  create(ctx) {
    const disallowed = [
      /\b(bg|text|ring|from|via|to)-(?:red|blue|yellow|purple|pink|amber|lime|emerald|teal|cyan|indigo|rose)\b/i,
      /\bshadow-(md|lg|xl|2xl|inner|black)\b/i,
      /\bbackdrop-|\bglow|\bneon|\bglassmorphism/i,
      /\bbg-\[?#?16a34a/i
    ];
    return {
      JSXAttribute(node) {
        if (node.name && node.name.name === "className" && node.value && node.value.value) {
          const val = String(node.value.value);
          for (const r of disallowed) {
            if (r.test(val)) {
              ctx.report({ 
                node, 
                message: `Brand violation: ${r}` 
              });
            }
          }
        }
      }
    };
  }
};