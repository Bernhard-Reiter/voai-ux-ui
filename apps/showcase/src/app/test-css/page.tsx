'use client';

import { useEffect, useState } from 'react';

export default function TestCSSPage() {
  const [cssVars, setCssVars] = useState<Record<string, string>>({});
  
  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    const vars = {
      '--c-bg': styles.getPropertyValue('--c-bg'),
      '--c-foreground': styles.getPropertyValue('--c-foreground'),
      '--circula-black': styles.getPropertyValue('--circula-black'),
      '--circula-white': styles.getPropertyValue('--circula-white'),
      '--circula-success': styles.getPropertyValue('--circula-success'),
    };
    setCssVars(vars);
  }, []);
  
  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Circula CSS Test Page</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">CSS Variables Loaded:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-black">
            {JSON.stringify(cssVars, null, 2)}
          </pre>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-4">Visual Tests:</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="mb-2">Background (--c-bg):</p>
              <div className="w-32 h-32 bg-[var(--c-bg)] border-2 border-gray-500"></div>
            </div>
            <div>
              <p className="mb-2">Foreground (--c-foreground):</p>
              <div className="w-32 h-32 bg-[var(--c-foreground)] border-2 border-gray-500"></div>
            </div>
            <div>
              <p className="mb-2">Success (--circula-success):</p>
              <div className="w-32 h-32 bg-[var(--circula-success)] border-2 border-gray-500"></div>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-4">Expected Behavior:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Page background should be dark (--c-bg = --circula-black = #0F172A)</li>
            <li>Text should be white (--c-foreground = --circula-white = #FFFFFF)</li>
            <li>Success color should be green (#41a344)</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-4">Body Computed Styles:</h2>
          <div id="body-styles" className="bg-gray-100 p-4 rounded text-black">
            <script dangerouslySetInnerHTML={{
              __html: `
                const bodyStyles = getComputedStyle(document.body);
                document.getElementById('body-styles').innerHTML = 
                  'Background: ' + bodyStyles.backgroundColor + '<br>' +
                  'Color: ' + bodyStyles.color;
              `
            }} />
          </div>
        </section>
      </div>
    </div>
  );
}