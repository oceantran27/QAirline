import NodeCache from "node-cache";

export const flightCache = new NodeCache({ stdTTL: 300, checkperiod: 60 });
export const flightSuggestionsCache = new NodeCache({
  stdTTL: 43200,
  checkperiod: 3600,
});
export const userCache = new NodeCache({ stdTTL: 300, checkperiod: 60 });
export const newsCache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

export const getCache = (cache, key) => {
  return cache.get(key);
};

export const setCache = (cache, key, value) => {
  cache.set(key, value);
};

export const deleteCache = (cache, key) => {
  cache.del(key);
};
