import { useFavorites } from "../context/FavoritesContext";

export default function Home() {
  const { favoriteIds, addFavorite } = useFavorites();

  return (
    <div className="home">
      <div className="home-text">
        <h1>DishCovery</h1>
        <p>Discover recipes from around the world.</p>

        <button onClick={() => addFavorite("123")}>Add test favorite</button>
        <p>Favorites: {favoriteIds.join(", ")}</p>
      </div>
    </div>
  );
}