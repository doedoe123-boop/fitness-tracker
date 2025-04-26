export const BASE_URL = import.meta.env.VITE_API_URL || 'https://api.fitnesses.lifestyle/api';

// Add other configuration values here if needed
export const config = {
  apiUrl: BASE_URL,
  // You can add more configuration values here
} as const;

export default config;