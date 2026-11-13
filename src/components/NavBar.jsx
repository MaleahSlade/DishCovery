// NOTES: The top navigation bar shown on every page. Has page links and a search bar that goes to /search?query=...

import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

export default function NavBar() {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();
  const { favoriteIds } = useFavorites();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = term.trim();
    if (!trimmed) return;
    navigate(`/search?query=${encodeURIComponent(trimmed)}`);
    setTerm("");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        🍜 DishCovery
      </Link>

      <div className="nav-links">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/favorites">Favorites ({favoriteIds.length})</NavLink>
      </div>

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Search recipes..."
          aria-label="Search recipes"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </nav>
  );
}