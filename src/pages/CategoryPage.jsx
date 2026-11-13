// NOTES: Category page ("/category/:categoryName"). Shows every recipe in one category.

import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import RecipeCard from "../components/RecipeCard";

export default function CategoryPage() {
  const { categoryName } = useParams();
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(categoryName)}`;
  const { data, loading, error } = useFetch(url);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  const meals = data?.meals ?? [];

  return (
    <div>
      <Link to="/">← Back to categories</Link>
      <h1 className="page-title">{categoryName}</h1>

      {meals.length === 0 ? (
        <p>No recipes found in this category.</p>
      ) : (
        <div className="recipe-grid">
          {meals.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
}