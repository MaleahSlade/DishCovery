// NOTES: Home page ("/"). Fetches all recipe categories and shows each as a link to /category/:name.

import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

const CATEGORIES_URL = "https://www.themealdb.com/api/json/v1/1/categories.php";

export default function Home() {
  const { data, loading, error } = useFetch(CATEGORIES_URL);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  const categories = data?.categories ?? [];

  return (
    <div>
      <h1 className="page-title">DishCovery</h1>
      <p className="page-subtitle">Pick a category to start exploring recipes.</p>

      <div className="recipe-grid">
        {categories.map((cat) => (
          <Link
            key={cat.idCategory}
            to={`/category/${encodeURIComponent(cat.strCategory)}`}
            className="recipe-card"
          >
            <img src={cat.strCategoryThumb} alt={cat.strCategory} loading="lazy" />
            <h3>{cat.strCategory}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}