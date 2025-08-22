const App = () => {
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f0f0f0', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>
        🎉 React is Working!
      </h1>
      <div style={{ 
        backgroundColor: '#e8f5e8', 
        padding: '15px', 
        borderRadius: '8px',
        border: '1px solid #4caf50',
        marginBottom: '20px'
      }}>
        <p style={{ margin: 0, color: '#2e7d32' }}>
          ✅ If you can see this, React is loading successfully
        </p>
      </div>
      <div style={{ 
        backgroundColor: '#fff3e0', 
        padding: '15px', 
        borderRadius: '8px',
        border: '1px solid #ff9800',
        marginBottom: '20px'
      }}>
        <p style={{ margin: 0, color: '#e65100' }}>
          🔧 This is a minimal test version
        </p>
      </div>
      <div style={{ 
        backgroundColor: '#e3f2fd', 
        padding: '15px', 
        borderRadius: '8px',
        border: '1px solid #2196f3'
      }}>
        <p style={{ margin: 0, color: '#0d47a1' }}>
          📍 Current URL: {window.location.href}
        </p>
        <p style={{ margin: '10px 0 0 0', color: '#0d47a1' }}>
          🕒 Loaded at: {new Date().toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default App;