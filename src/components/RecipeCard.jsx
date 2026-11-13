// NOTES: One recipe tile (photo + name) that links to that recipe's page. Expects a meal object from the API.

import { Link } from "react-router-dom";

export default function RecipeCard({ meal }) {
  return (
    <Link to={`/recipe/${meal.idMeal}`} className="recipe-card">
      <img src={meal.strMealThumb} alt={meal.strMeal} loading="lazy" />
      <h3>{meal.strMeal}</h3>
    </Link>
  );
}