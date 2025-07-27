// This file exists to help Vercel detect the project structure
// The actual Next.js app is in apps/frontend
module.exports = (req, res) => {
  res.status(308).setHeader('Location', '/').end()
}
