import { useState, useEffect } from 'react';

function App() {
  const [topic, setTopic] = useState('');

  const fetchTopic = async () => {
  console.log("Kliknięto przycisk!");
  try {
    const res = await fetch('http://localhost:8000/topic');
    const data = await res.json();
    if (data.error) {
      setTopic(`Error: ${data.error}`);
    } else {
      setTopic(data.topic);
    }
  } catch (err) {
    setTopic('Failed to fetch topic. Please try again.');
    console.error(err);
  }
};

  useEffect(() => {
    fetchTopic();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>TEMATOR</h1>
      <p style={{ fontSize: '1.5rem' }}>{topic}</p>
      <button onClick={fetchTopic}>Nowy temat</button>
    </div>
  );
}

export default App;