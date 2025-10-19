import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import HomeworkTracker from "../Components/HomeworkTracker";
import { useNavigate } from "react-router-dom";
import NameForm from "../Components/NameForm";
import PerformanceMetrics from "../Components/PerformanceMetrics";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [studentName, setStudentName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);

        // Fetch student name from student table
        const { data, error } = await supabase
          .from("students")
          .select("full_name")
          .eq("id", user.id)
          .single();

        if (!error && data) {
          setStudentName(data.full_name);
        }
      }

      setLoading(false); // sets after name fetch
    };

    fetchUser();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Sign out error:", error);
    } else {
      navigate("/");
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Show this while fetching user & student name
  }

  return (
    <div className="p-6 relative">
      {user && (
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

          {/* informational panels */}
          <div className="flex flex-col gap-5 lg:flex-row justify-center">
            {/* Homework tracker */}
            <div className="flex justify-center">
              <HomeworkTracker studentId={user.id} />
            </div>
            {/* Homework Completion Rate */}
            <div className="flex justify-center">
              <PerformanceMetrics studentId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
