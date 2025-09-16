import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 py-4 gap-4 sm:gap-0">
      {/* Logo */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-500 tracking-tight">
        <Link to={"/"}>LinguaLab ☀️</Link>
      </h1>

      {/* Nav Links */}
      <nav>
        <ul className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-base sm:text-lg text-gray-700 font-medium text-center">
          <li>
            <Link
              to="/homework"
              className="hover:text-amber-500 transition-colors px-2 py-1"
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
          <li>
            <Link
              to="/signIn"
              className="text-amber-500 border-amber-500 hover:border-b-2 border-b-0 transition-colors px-2 py-1 ml-5"
            >
              Sign In
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
