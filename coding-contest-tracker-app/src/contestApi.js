/**
 * Contest API service
 * Fetches contest data from the backend server
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001';

/**
 * Fetch all contests from all platforms
 */
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

/**
 * Fetch contests from a specific platform
 */
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

/**
 * Fetch contests from multiple specific platforms
 */
export const fetchMultiplePlatforms = async (platforms) => {
  try {
    const platformStr = platforms.map((p) => p.toLowerCase()).join(',');
    const response = await fetch(
      `${API_BASE_URL}/api/all?platforms=${platformStr}`
    );
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
