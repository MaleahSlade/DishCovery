// NOTES: Recipe page ("/recipe/:recipeId"). Shows one full recipe and an Add/Remove Favorites button.

import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useFavorites } from "../context/FavoritesContext";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

// The API gives ingredients as strIngredient1..20 and strMeasure1..20.
// This gathers the filled-in ones into a single tidy list.
function getIngredients(meal) {
  const list = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      list.push({ ingredient: ingredient.trim(), measure: (measure || "").trim() });
    }
  }
  return list;
}

export default function RecipeDetail() {
  const { recipeId } = useParams();
  const { data, loading, error } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(recipeId)}`
  );
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  const meal = data?.meals?.[0];

  if (!meal) {
    return (
      <div>
        <ErrorMessage message="Recipe not found." />
        <p style={{ textAlign: "center" }}>
          <Link to="/">← Back to categories</Link>
        </p>
      </div>
    );
  }

  const favorited = isFavorite(meal.idMeal);
  const ingredients = getIngredients(meal);

  return (
    <div className="recipe-detail">
      <Link to="/">← Back to categories</Link>

      <h1 className="page-title">{meal.strMeal}</h1>
      <p className="recipe-meta">
        {meal.strCategory} · {meal.strArea}
      </p>

      <button
        className={`favorite-btn ${favorited ? "is-favorite" : ""}`}
        onClick={() =>
          favorited ? removeFavorite(meal.idMeal) : addFavorite(meal.idMeal)
        }
      >
        {favorited ? "♥ Remove from Favorites" : "♡ Add to Favorites"}
      </button>

      <img className="recipe-hero" src={meal.strMealThumb} alt={meal.strMeal} />

      <h2>Ingredients</h2>
      <ul className="ingredient-list">
        {ingredients.map(({ ingredient, measure }) => (
          <li key={ingredient}>
            {measure} {ingredient}
          </li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <p className="instructions">{meal.strInstructions}</p>

      {meal.strYoutube && (
        <p>
          <a href={meal.strYoutube} target="_blank" rel="noreferrer">
            ▶ Watch on YouTube
          </a>
        </p>
      )}
    </div>
  );
}