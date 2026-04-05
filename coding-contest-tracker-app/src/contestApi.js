// API calls to local backend server (running on localhost:5001)
// The backend wraps official platform APIs and handles CORS

const API_BASE_URL = 'http://localhost:5001';

export const fetchContestsFromPlatforms = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/all`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching contests from backend:', error);
    return [];
  }
};

// Fetch specific platform contests
export const fetchPlatformContests = async (platform) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/${platform.toLowerCase()}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(`Error fetching ${platform} contests:`, error);
    return [];
  }
};

// Fetch contests from specific platforms
export const fetchMultiplePlatforms = async (platforms) => {
  try {
    const platformStr = platforms.map(p => p.toLowerCase()).join(',');
    const response = await fetch(`${API_BASE_URL}/api/all?platforms=${platformStr}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching multiple platforms:', error);
    return [];
  }
};
