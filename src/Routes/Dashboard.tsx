import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import HomeworkTracker from "../Components/HomeworkTracker";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Get the current session (includes user info if logged in)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
      }
    });
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Sign out error:", error);
    } else {
      // Navigate to homepage after successful logout
      navigate("/");
    }
  };

  return (
    <div className="p-6">
      {user ? (
        <div className="flex flex-col justify-center">
          <div className="flex flex-row justify-between items-center my-8">
            <div>
              <h1 className="text-2xl font-bold">
                Hoşgeldin,{" "}
                <span className="text-yellow-800">
                  {user.user_metadata?.full_name || user.email}
                </span>
              </h1>
              <p className="text-gray-600">Giriş yaptınız 🎉</p>
            </div>
            <div>
              <button
                className="text-gray-500 hover:underline"
                onClick={handleSignOut}
              >
                çıkıs yap
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <HomeworkTracker studentId={user.id} />
          </div>
          {/* <HomeworkTracker studentId="c6849016-3ebb-4a99-8483-26e0fcd5d89f" /> */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
