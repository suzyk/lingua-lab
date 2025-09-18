import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Reset_Password() {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (password === confirmPassword) {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({ password: password });
      if (error) {
        setMessage(error.message);
        setLoading(false);
      } else {
        // password reset success
        setMessage("Şifre başarıyla güncellendi. Yönlendiriliyorsunuz...");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } else {
      // password not matching
      setMessage("Yeni şifre eşleşmiyor");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Şifreyi Sıfırla
        </h2>

        {/* Recieve new password */}
        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Yeni Şifre
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Şifreyi Onayla
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`mb-4 w-full rounded-md px-4 py-2 transition 
              ${
                loading
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "text-white bg-amber-600 hover:bg-amber-700"
              }`}
        >
          {loading ? "Kaydediliyor..." : "Şifreyi Güncelle"}
        </button>
        {message && (
          <p className="mt-4 text-center text-sm text-red-500">{message}</p>
        )}
      </div>
    </div>
  );
}
