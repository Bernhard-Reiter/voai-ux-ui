module.exports = {
  root: true,
  extends: ["next/core-web-vitals", "eslint:recommended"],
  rules: {
    // Verbot von Roh-Hexfarben im Code außer Whitelist (Tokens nutzen!)
    "no-restricted-syntax": [
      "error",
      { selector: "Literal[value=/^#(?!16A34A|000000|ffffff|FFFFFF).{3,6}$/]", message: "Nur definierte Design-Tokens (#16A34A/Black/White) verwenden." }
    ]
  }
}