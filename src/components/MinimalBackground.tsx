import React from 'react';

const MinimalBackground: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 w-full h-full z-0"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 20s ease infinite'
      }}
    />
  );
};

export default MinimalBackground;
