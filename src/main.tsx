import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// Add debug logging
console.log('main.tsx: Starting React app...');
console.log('main.tsx: Current URL:', window.location.href);

const rootElement = document.getElementById("root");
console.log('main.tsx: Root element:', rootElement);

if (rootElement) {
  try {
    const root = createRoot(rootElement);
    console.log('main.tsx: Root created successfully');
    root.render(<App />);
    console.log('main.tsx: App rendered successfully');
  } catch (error) {
    console.error('main.tsx: Error creating or rendering app:', error);
    // Fallback HTML
    rootElement.innerHTML = `
      <div style="padding: 20px; background: #ffebee; min-height: 100vh; font-family: Arial;">
        <h1 style="color: #c62828;">React Failed to Load</h1>
        <p>Error: ${error}</p>
        <p>Check console for details</p>
      </div>
    `;
  }
} else {
  console.error('main.tsx: Root element not found!');
}
