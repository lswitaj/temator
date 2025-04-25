import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { STRINGS } from '../strings';

interface TopicDisplayProps {
  topic: string;
  isLoading: boolean;
  onRefresh: () => void;
}

const TopicDisplay: React.FC<TopicDisplayProps> = ({ topic, isLoading, onRefresh }) => {
  const [animation, setAnimation] = useState<'fade-in' | 'fade-out' | null>(null);
  const [displayTopic, setDisplayTopic] = useState<string>(topic);
  
  // Handle topic changes with animation
  useEffect(() => {
    if (topic && topic !== displayTopic) {
      // Fade out current topic
      setAnimation('fade-out');
      
      // After fade out, update to new topic and fade in
      const timeout = setTimeout(() => {
        setDisplayTopic(topic);
        setAnimation('fade-in');
      }, 300); // Should match the CSS transition duration
      
      return () => clearTimeout(timeout);
    } else if (topic && !animation) {
      // Initial fade in
      setAnimation('fade-in');
    }
  }, [topic, displayTopic, animation]);

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
      <h2 className="text-xl text-red-400 font-mono uppercase tracking-widest mb-4">{STRINGS.topicDisplay.topicLabel}</h2>
      <div className="bg-gray-800 rounded-xl p-8 w-full min-h-[200px] flex flex-col items-center justify-center relative">
        {isLoading ? (
          <div className="animate-pulse flex items-center justify-center">
            <div className="h-8 w-40 bg-gray-700 rounded"></div>
          </div>
        ) : (
          <div 
            className={`text-center transition-all duration-300 ease-in-out
              ${animation === 'fade-out' ? 'opacity-0 transform -translate-y-4' : ''}
              ${animation === 'fade-in' ? 'opacity-100 transform translate-y-0' : 'opacity-0'}
            `}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {displayTopic}
            </h1>
            <p className="text-yellow-300 text-lg">{STRINGS.topicDisplay.topicSubtext}</p>
          </div>
        )}
        
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="absolute top-4 right-4 p-2 rounded-full bg-yellow-900 text-yellow-200 hover:bg-yellow-800 transition-colors"
          aria-label="Get new topic"
        >
          <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default TopicDisplay