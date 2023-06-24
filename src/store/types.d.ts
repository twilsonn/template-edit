type Action<K, T> = (
  set: (
    partial: K | Partial<K> | ((state: K) => K | Partial<K>),
    replace?: boolean | undefined
  ) => void,
  get: () => K
) => T;
