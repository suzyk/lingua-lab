import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa6";

const Navbar = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // check if user is already logged in
    //const { data, error } = await supabase.auth.getSession()
    // data : {session}   == data.session deconstruction
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // listen for login/logout
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null); // in sign out, session becomes null
    });
    // if (event === 'SIGNED_IN') {
    //   console.log('Welcome back!', session.user.email)
    //   setUser(session.user)
    // }
    // if (event === 'SIGNED_OUT') {
    //   console.log('User signed out')
    //   setUser(null)
    // }

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 py-4 gap-4 sm:gap-0">
      {/* Logo */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-500 tracking-tight">
        <Link to={"/"}>LinguaLab ☀️</Link>
      </h1>

      {/* Nav Links */}
      <nav>
        <ul className="flex flex-col items-center sm:flex-row gap-4 sm:gap-8 text-base sm:text-lg text-gray-700 font-medium text-center">
          {user && (
            <li>
              <Link
                to="/homework"
                className="hover:text-amber-500 transition-colors px-2 py-1"
              >
                Homework
              </Link>
            </li>
          )}

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
            {user ? (
              <Link to="/dashboard">
                <FaUser className="text-gray-400 hover:text-amber-600 transition-colors" />
              </Link>
            ) : (
              <Link
                to="/signIn"
                className="text-amber-500 border-amber-500 hover:border-b-2 border-b-0 transition-colors px-2 py-1 ml-0 sm:ml-5"
              >
                Giriş Yap
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
