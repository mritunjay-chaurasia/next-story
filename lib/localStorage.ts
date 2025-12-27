const KEY_PREFIX = "theme-";

const getKeyName = (key: string) => {
  return KEY_PREFIX + key;
};

export const setLocalStorageItem = (key: string, val: string) => {
  localStorage.setItem(getKeyName(key), val);
};

export const getLocalStorageItem = (
  key: string,
  defaultValue: string | null = null
) => {
  let val = localStorage.getItem(getKeyName(key));
  if (
    val === undefined ||
    val === "undefined" ||
    val === "" ||
    val === "null"
  ) {
    val = null;
  }
  if (val === null) {
    return defaultValue;
  }
  return val;
};

export const removeLocalStorageItem = (key: string) => {
  localStorage.removeItem(getKeyName(key));
};
