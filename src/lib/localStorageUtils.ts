export const localStorageUtils = {
  set: (key: string, value: unknown) => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  },

  get: <T>(key: string, defaultValue: T | null = null): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : defaultValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return defaultValue;
    }
  },

  remove: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  },

  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  },
};
