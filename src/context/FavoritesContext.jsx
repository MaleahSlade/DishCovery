// NOTES: Shares the favorites list with the whole app. Gives back favoriteIds, addFavorite, removeFavorite and isFavorite. Read it with useFavorites().

import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useLocalStorage("favorites", []);

  // (prev) => ... uses the latest list; [...prev, id] makes a new array.
  const addFavorite = (id) => {
    setFavoriteIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  // filter keeps every ID except the one being removed.
  const removeFavorite = (id) => {
    setFavoriteIds((prev) => prev.filter((favId) => favId !== id));
  };

  const isFavorite = (id) => favoriteIds.includes(id);

  const value = { favoriteIds, addFavorite, removeFavorite, isFavorite };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}