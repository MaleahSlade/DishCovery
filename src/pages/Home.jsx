// NOTES: Home page ("/"). Right now it only holds TEST code for favorites and the shared components. It will show the real recipe categories in step 5.

import { useFavorites } from "../context/FavoritesContext";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import RecipeCard from "../components/RecipeCard";

export default function Home() {
  const { favoriteIds, addFavorite } = useFavorites();

  return (
    <>
      <div className="home">
        <div className="home-text">
          <h1>DishCovery</h1>
          <p>Discover recipes from around the world.</p>

          <button onClick={() => addFavorite("123")}>Add test favorite</button>
          <p>Favorites: {favoriteIds.join(", ")}</p>
        </div>
      </div>

      <Spinner />
      <ErrorMessage message="Test error" />
      <div className="recipe-grid">
        <RecipeCard
          meal={{
            idMeal: "52772",
            strMeal: "Teriyaki Chicken Casserole",
            strMealThumb:
              "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
          }}
        />
      </div>
    </>
  );
}