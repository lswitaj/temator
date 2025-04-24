// This is a mock service worker for development only
// It intercepts API requests and returns mock data

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

const topics = [
  "The future of AI",
  "Growing up in your hometown",
  "Your biggest dream",
  "Things that make you laugh",
  "The perfect day",
  "Your favorite food",
  "Life in the digital age",
  "Money and success",
  "Love and relationships",
  "Travel and adventure",
  "Music that moves you",
  "Overcoming challenges",
  "Social media influence",
  "Your personal style",
  "The state of the world",
  "Dreams and nightmares",
  "Your hidden talents",
  "What makes you unique",
  "Things you can't live without",
  "Your superhero powers"
];

// Helper to get a random topic
const getRandomTopic = () => {
  const randomIndex = Math.floor(Math.random() * topics.length);
  return topics[randomIndex];
};

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Only intercept the topic API endpoint
  if (url.pathname.includes('/api/topic')) {
    event.respondWith(
      new Response(
        JSON.stringify({ topic: getRandomTopic() }),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
    );
  }
});