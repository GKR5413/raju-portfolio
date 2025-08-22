import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Signal that React has started loading
if (window.reactLoadStartTime) {
  console.log('React started loading after', Date.now() - window.reactLoadStartTime, 'ms');
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Signal that React has successfully rendered
window.reactLoaded = true;
console.log('React loaded successfully');
