export function filterDishes(dishesList) {
  return Object.entries(dishesList).reduce((prev, next) => {
    return [...prev, { id: next[0], data: { ...next[1] } }];
  }, []);
}

export function filterFavouriteDishes(dishesList) {
  return Object.entries(dishesList)
    .filter(e => e[1].favourite)
    .reduce((prev, next) => {
      return [...prev, { id: next[0], data: { ...next[1] } }];
    }, []);
}

export function filterOwnedDishes(dishesList, user) {
  return Object.entries(dishesList)
    .reduce((prev, next) => {
      return [...prev, { id: next[0], data: { ...next[1] } }];
    }, [])
    .filter(e => e.data.user.uid === user.uid);
}
