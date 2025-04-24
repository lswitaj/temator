import React, { useState, useEffect } from 'react';
import { useTopic } from './services/topicService';
import BannerArea from './components/BannerArea';
import TopicDisplay from './components/TopicDisplay';
import Timer from './components/Timer';
import Footer from './components/Footer';
import { Mic2 } from 'lucide-react';

function App() {
  const { topic, isLoading, error, fetchTopic } = useTopic();
  const [timerKey, setTimerKey] = useState<number>(0);
  const [duration, setDuration] = useState<number>(45);
  
  // Handle timer completion
  const handleTimerComplete = () => {
    fetchTopic();
    setTimerKey(prev => prev + 1);
  };
  
  // Handle manual refresh
  const handleRefresh = () => {
    fetchTopic();
    setTimerKey(prev => prev + 1);
  };

  // Handle duration change
  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDuration = parseInt(event.target.value, 10);
    if (!isNaN(newDuration) && newDuration > 0) {
      setDuration(newDuration);
      setTimerKey(prev => prev + 1);
    }
  };

  // Update document title with current topic
  useEffect(() => {
    if (topic) {
      document.title = `Battle Topic: ${topic}`;
    }
  }, [topic]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-yellow-600 to-red-700 py-4 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Mic2 className="w-6 h-6 text-yellow-300 mr-2" />
            <h1 className="text-xl font-bold">Freestyle Battle</h1>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-8 flex flex-col items-center gap-10">
        {/* Banner */}
        <BannerArea />
        
        {/* Error message if API fails */}
        {error && (
          <div className="w-full max-w-md mx-auto bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
            <p className="font-medium">Error: {error}</p>
            <p className="text-sm mt-1">Using fallback topic. Please try again later.</p>
          </div>
        )}
        
        {/* Topic Display */}
        <TopicDisplay 
          topic={topic} 
          isLoading={isLoading} 
          onRefresh={handleRefresh} 
        />
        
        {/* Timer Settings */}
        <div className="w-full max-w-md mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <label htmlFor="duration" className="text-yellow-300 font-mono">
              Duration (seconds):
            </label>
            <input
              type="number"
              id="duration"
              min="1"
              value={duration}
              onChange={handleDurationChange}
              className="bg-gray-800 border border-yellow-700 rounded px-3 py-1 text-yellow-200 w-24"
            />
          </div>
          
          {/* Timer */}
          <Timer 
            duration={duration} 
            onComplete={handleTimerComplete} 
            key={timerKey} 
          />
        </div>
        
        {/* Instructions */}
        <div className="w-full max-w-lg mx-auto bg-gray-800/60 rounded-lg p-6 mt-4">
          <h3 className="text-lg font-semibold text-yellow-300 mb-2">How It Works</h3>
          <ul className="text-gray-300 space-y-2">
            <li className="flex items-start">
              <span className="text-red-400 mr-2">•</span>
              <span>Set your preferred duration for topic switches</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-400 mr-2">•</span>
              <span>Click the refresh button to get a new topic instantly</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-400 mr-2">•</span>
              <span>Pause the timer if you need more time on a topic</span>
            </li>
          </ul>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;