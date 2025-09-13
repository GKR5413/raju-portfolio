import React, { useState, useEffect } from 'react';

interface LoadingTransitionProps {
  onComplete: () => void;
  duration?: number;
}

const LoadingTransition: React.FC<LoadingTransitionProps> = ({ 
  onComplete, 
  duration = 3500 
}) => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const phases = [
    { text: "Initializing Experience", delay: 0 },
    { text: "Loading Portfolio", delay: 800 },
    { text: "Crafting Innovation", delay: 1600 },
    { text: "Ready to Impress", delay: 2400 }
  ];

  useEffect(() => {
    const startTime = Date.now();
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      
      // Update phase based on progress
      const phaseIndex = Math.min(Math.floor((elapsed / duration) * phases.length), phases.length - 1);
      setCurrentPhase(phaseIndex);
      
      if (newProgress >= 100) {
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(() => {
            setIsVisible(false);
            onComplete();
          }, 800);
        }, 200);
      } else {
        requestAnimationFrame(updateProgress);
      }
    };
    
    requestAnimationFrame(updateProgress);
  }, [duration, onComplete, phases.length]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden transition-opacity duration-500 ${
        isComplete ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-xl animate-float-orb-1" />
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-float-orb-2" />
        <div className="absolute bottom-1/3 left-1/3 w-28 h-28 bg-gradient-to-r from-cyan-400/25 to-blue-400/25 rounded-full blur-xl animate-float-orb-3" />
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-8">
        {/* Logo/Brand */}
        <div className="mb-12 animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <div className="relative inline-block">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 p-1 blur-sm animate-spin-slow">
              <div className="w-20 h-20 bg-slate-900 rounded-full"></div>
            </div>
            
            <div className="relative w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-2xl font-bold text-white">R</span>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="mb-8 h-8">
          <div 
            key={currentPhase}
            className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-fade-in-up"
          >
            {phases[currentPhase]?.text}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-700/50 rounded-full h-2 mb-4 overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full shadow-lg transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full w-24 animate-shimmer-loading" />
        </div>

        {/* Progress Percentage */}
        <div className="text-sm text-slate-400 font-medium tabular-nums animate-pulse">
          {Math.round(progress)}%
        </div>

        {/* Dots Animation */}
        <div className="flex justify-center space-x-2 mt-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce-dots"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>
      </div>

      {/* Completion Animation */}
      {progress >= 100 && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm flex items-center justify-center animate-fade-in">
          <div className="text-6xl text-green-400 animate-completion">
            ✨
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingTransition;