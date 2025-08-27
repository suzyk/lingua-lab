import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center px-8 py-4">
      <h1 className="text-3xl font-extrabold text-amber-500 tracking-tight">
        <Link to={"/"}>LinguaLab ☀️</Link>
      </h1>
      <nav>
        <ul className="flex gap-8 text-gray-700 font-medium">
          <li>
            <Link
              to="/homework"
              className="hover:text-amber-500 transition-colors  px-2 py-1"
            >
              Homework
            </Link>
          </li>
          <li>
            <Link
              to="/games"
              className="hover:text-amber-500 transition-colors px-2 py-1"
            >
              Games
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-amber-500 transition-colors px-2 py-1"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
