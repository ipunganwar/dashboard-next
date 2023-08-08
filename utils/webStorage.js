const STORAGE_KEY_BRAND = "filterBrands";
const STORAGE_KEY_CATEGORY = "filterCategory";
const STORAGE_KEY_LIST_FILTER = "filterList";

// STORAGE_KEY_BRAND
export const setStorageBrand = (payload) => {
  localStorage.setItem(STORAGE_KEY_BRAND, JSON.stringify(payload));
};
export const getStorageBrand = () => {
  const cacheData = localStorage.getItem(STORAGE_KEY_BRAND);
  return JSON.parse(cacheData) || [];
};
export const removeStorageBrand = () => {
  localStorage.removeItem(STORAGE_KEY_BRAND);
};

// STORAGE_KEY_CATEGORY
export const setStorageCategory = (payload) => {
  localStorage.setItem(STORAGE_KEY_CATEGORY, JSON.stringify(payload));
};
export const getStorageCategory = () => {
  const cacheData = localStorage.getItem(STORAGE_KEY_CATEGORY);
  return JSON.parse(cacheData) || [];
};
export const removeStorageCategory = () => {
  localStorage.removeItem(STORAGE_KEY_CATEGORY);
};

// STORAGE_KEY_LIST_FILTER
export const setStorageList = (payload) => {
  localStorage.setItem(STORAGE_KEY_LIST_FILTER, JSON.stringify(payload));
};
export const getStorageList = () => {
  const cacheData = localStorage.getItem(STORAGE_KEY_LIST_FILTER);
  return JSON.parse(cacheData) || [];
};
export const removeStorageList = () => {
  localStorage.removeItem(STORAGE_KEY_LIST_FILTER);
};
