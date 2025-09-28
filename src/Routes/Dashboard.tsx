import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import HomeworkTracker from "../Components/HomeworkTracker";
import { useNavigate } from "react-router-dom";
import NameForm from "../Components/NameForm";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [studentName, setStudentName] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        // Set studentName from display name if it exists
        const studentNameFromMetadata = user.user_metadata?.student_name || "";
        setStudentName(studentNameFromMetadata);
      }
    };
    fetchUser();
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
    <div className="p-6 relative">
      {user ? (
        <div className="flex flex-col justify-center">
          {/* Welcome + Logout */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left my-8 w-full">
            <div className="flex flex-col items-center sm:items-start gap-1">
              {!studentName && (
                <NameForm onComplete={(name) => setStudentName(name)} />
              )}
              <h1 className="text-2xl font-bold">
                Hoşgeldin,{" "}
                <span className="text-yellow-800">{studentName}</span>
              </h1>
              <p className="text-gray-600">Giriş yaptınız 🎉</p>

              {/* Subtle logout button for mobile */}
              <button
                className="text-gray-400 hover:text-gray-600 text-sm font-normal mt-1 sm:hidden transition"
                onClick={handleSignOut}
              >
                çıkış yap
              </button>
            </div>

            {/* Logout button for larger screens */}
            <div className="hidden sm:block">
              <button
                className="text-gray-500 hover:underline transition"
                onClick={handleSignOut}
              >
                çıkış yap
              </button>
            </div>
          </div>

          {/* Homework tracker */}
          <div className="flex justify-center">
            <HomeworkTracker studentId={user.id} />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
