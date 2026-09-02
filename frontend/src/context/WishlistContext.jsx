import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("oc-favorites")) || [];
    } catch {
      return [];
    }
  });
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  useEffect(() => {
    localStorage.setItem("oc-favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (favorites.length === 0 && showOnlyFavorites) {
      setShowOnlyFavorites(false);
    }
  }, [favorites, showOnlyFavorites]);

  const isFavorite = (id) => favorites.includes(id);

  const toggle = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const value = {
    favorites,
    isFavorite,
    toggle,
    count: favorites.length,
    showOnlyFavorites,
    setShowOnlyFavorites,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}

