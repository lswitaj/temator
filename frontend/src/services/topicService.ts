import { useState, useEffect, useCallback } from 'react';

// The base URL for the API
const API_URL = 'http://127.0.0.1:8000/topic';

export interface TopicData {
  topic: string;
}

export const useTopic = () => {
  const [topic, setTopic] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTopic = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch topic: ${response.status}`);
      }
      
      const data: TopicData = await response.json();
      setTopic(data.topic);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      // Provide a fallback topic in case of an error
      setTopic('Freestyle about technology');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch the initial topic when the component mounts
  useEffect(() => {
    fetchTopic();
  }, [fetchTopic]);

  return {
    topic,
    isLoading,
    error,
    fetchTopic
  };
};