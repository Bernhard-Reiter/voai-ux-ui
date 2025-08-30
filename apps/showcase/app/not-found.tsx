export const runtime = "nodejs"; // oder 'edge', aber ohne Client-Hooks

export default function NotFound() {
  return (
    <main style={{ padding: 24, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>
        404 - Seite nicht gefunden
      </h1>
      <p style={{ fontSize: '1rem', color: '#666' }}>
        Die gewünschte Seite existiert nicht.
      </p>
      <a 
        href="/" 
        style={{ 
          display: 'inline-block',
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#000',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '0.25rem'
        }}
      >
        Zurück zur Startseite
      </a>
    </main>
  );
}