export default function DebugPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">CSS Debug Page</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">CSS Variables Test</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">--c-bg:</p>
              <div className="w-24 h-24 bg-[var(--c-bg)] border-2 border-gray-300"></div>
            </div>
            <div>
              <p className="font-medium">--c-foreground:</p>
              <div className="w-24 h-24 bg-[var(--c-foreground)] border-2 border-gray-300"></div>
            </div>
            <div>
              <p className="font-medium">--circula-success:</p>
              <div className="w-24 h-24 bg-[var(--circula-success)] border-2 border-gray-300"></div>
            </div>
            <div>
              <p className="font-medium">--circula-black:</p>
              <div className="w-24 h-24 bg-[var(--circula-black)] border-2 border-gray-300"></div>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Body Styles</h2>
          <p>Background should be dark (--c-bg / --circula-black)</p>
          <p>Text should be white (--c-foreground / --circula-white)</p>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Component Test</h2>
          <button className="px-4 py-2 bg-[var(--circula-black)] text-[var(--circula-white)] rounded-[var(--circula-radius-md)] hover:bg-[var(--circula-gray-800)] transition-colors">
            Circula Button
          </button>
        </div>
      </div>
    </div>
  );
}