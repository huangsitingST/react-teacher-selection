export const getLocalInfo = (key: string, defaultValue: any) => {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      return JSON.parse(raw);
    }
    
  } catch {
    throw new Error("no found local info :" + key);
  }
  return defaultValue;
};

export const setLocalInfo = (key: string, obj: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(obj));
  } catch {
    throw new Error("set local info failed:" + key);
  }
};
