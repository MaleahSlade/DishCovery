// NOTES: Search page ("/search?query=..."). Searches recipes by name and shows matches.

import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import RecipeCard from "../components/RecipeCard";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("query") ?? "").trim();

  // null skips the request, so nothing is fetched until there is something to search.
  const url = query
    ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`
    : null;
  const { data, loading, error } = useFetch(url);

  if (!query) {
    return (
      <div>
        <h1 className="page-title">Search</h1>
        <p>Type a recipe name in the search bar to get started.</p>
      </div>
    );
  }

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  const meals = data?.meals ?? [];

  return (
    <div>
      <h1 className="page-title">Results for "{query}"</h1>

      {meals.length === 0 ? (
        <p>No recipes found. Try a different search.</p>
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