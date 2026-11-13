// NOTES: Favorites page ("/favorites"). Looks up every saved recipe ID and shows them as cards.

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import RecipeCard from "../components/RecipeCard";

export default function FavoritesPage() {
  const { favoriteIds } = useFavorites();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(favoriteIds.length > 0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (favoriteIds.length === 0) {
      setMeals([]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    // The API can only look up one recipe per request, so send one request per
    // saved ID and wait for all of them together.
    Promise.all(
      favoriteIds.map((id) =>
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(id)}`)
          .then((res) => {
            if (!res.ok) throw new Error(`Request failed (status ${res.status})`);
            return res.json();
          })
      )
    )
      .then((results) => {
        if (cancelled) return;
        setMeals(results.map((r) => r.meals?.[0]).filter(Boolean));
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Something went wrong");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [favoriteIds]);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h1 className="page-title">Your Favorites</h1>

      {meals.length === 0 ? (
        <div className="empty-state">
          <p>You haven't saved any recipes yet.</p>
          <Link to="/">Browse categories and add some!</Link>
        </div>
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