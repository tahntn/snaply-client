export const storage = {
  getString: (key: string) => {
    return window.localStorage.getItem(key) || null;
  },
  setString: (key: string, value: string) => {
    window.localStorage.setItem(key, value);
  },
  clearString: (key: string) => {
    window.localStorage.removeItem(key);
  },
};
