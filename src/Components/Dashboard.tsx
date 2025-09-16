import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Get the current session (includes user info if logged in)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
      }
    });
  }, []);

  return (
    <div className="p-6">
      {user ? (
        <>
          <h2 className="text-xl font-bold">
            Welcome, {user.user_metadata?.full_name || user.email}
          </h2>
          <p className="text-gray-600">You are logged in 🎉</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
