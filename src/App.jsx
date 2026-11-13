// NOTES: The app layout. NavBar shows on every page. <Routes> shows one page at a time based on the URL. path="*" catches unknown URLs (404).

import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <>
      <NavBar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}
