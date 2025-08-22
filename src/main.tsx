import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('main.tsx: Starting React app...');

const rootElement = document.getElementById("root");

if (rootElement) {
  try {
    const root = createRoot(rootElement);
    root.render(<App />);
    console.log('main.tsx: App rendered successfully');
  } catch (error) {
    console.error('main.tsx: Error:', error);
    rootElement.innerHTML = `
      <div style="padding: 20px; background: #ffebee; min-height: 100vh; font-family: Arial;">
        <h1 style="color: #c62828;">React Failed to Load</h1>
        <p>Error: ${error}</p>
      </div>
    `;
  }
} else {
  console.error('main.tsx: Root element not found!');
}
