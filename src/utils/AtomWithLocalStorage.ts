import { atom } from "jotai";

const atomWithLocalStorage = <T>(key: string, initialValue: T) => {
  const getInitialValue = (): T => {
    let item = null;
    if (process.browser) {
      item = localStorage.getItem(key);
    }
    if (item !== null) {
      return JSON.parse(item);
    }
    return initialValue;
  };

  const baseAtom = atom<T>(getInitialValue());

  const derivedAtom = atom<T, T[], void>(
    (get) => get(baseAtom),
    (get, set, update) => {
      const nextValue =
        typeof update === "function" ? update(get(baseAtom)) : (update as T);
      set(baseAtom, nextValue);

      if (process.browser) {
        localStorage.setItem(key, JSON.stringify(nextValue));
      }
    }
  );
  return derivedAtom;
};

export { atomWithLocalStorage };
