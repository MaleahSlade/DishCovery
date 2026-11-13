// NOTES: The top navigation bar shown on every page. <Link> changes pages without reloading.

import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link>
      </div>
    </nav>
  );
}
