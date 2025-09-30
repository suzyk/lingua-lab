import { useState } from "react";
import { supabase } from "../supabaseClient";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const redirectBase =
    import.meta.env.MODE === "development"
      ? "http://localhost:5173/dashboard"
      : "https://lingualab-tr.vercel.app/dashboard";

  const translateError = (error: any) => {
    if (!error?.message) return "Bilinmeyen bir hata oluştu.";
    const msg = error.message.toLowerCase();
    if (msg.includes("invalid login credentials"))
      return "E-posta veya şifre yanlış.";
    if (msg.includes("password should be at least"))
      return "Şifre en az 6 karakter olmalıdır.";
    if (msg.includes("user already registered"))
      return "Bu e-posta ile zaten kayıtlı bir hesap var.";
    if (msg.includes("invalid email"))
      return "Geçerli bir e-posta adresi giriniz.";
    if (msg.includes("email not confirmed"))
      return "E-posta adresinizi onaylamanız gerekiyor.";
    return error.message;
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: redirectBase },
    });
    if (error) {
      setMessage(translateError(error));
      setGoogleLoading(false);
    }
  };

  const handleEmailSignUp = async () => {
    setEmailLoading(true);

    if (!email.includes("@")) {
      setMessage("Geçerli bir e-posta adresi giriniz.");
      setEmailLoading(false);
      return;
    }
    if (password.length < 6) {
      setMessage("Şifre en az 6 karakter olmalıdır.");
      setEmailLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectBase,
      },
    });

    if (error) {
      setMessage(translateError(error));
    } else {
      setMessage("E-postanızı kontrol edin, doğrulama linki gönderildi!");
    }
    setEmailLoading(false);
  };

  const handleEmailSignIn = async () => {
    setEmailLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setMessage(translateError(error));
    else {
      navigate(redirectBase); // NameForm check will happen in dashboard
    }
    setEmailLoading(false);
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setMessage("Lütfen önce e-posta adresinizi girin.");
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${redirectBase}/reset-password`,
    });
    if (error) setMessage(translateError(error));
    else setMessage("Şifre sıfırlama linki e-postanıza gönderildi.");
  };

  const handleSubmit = () => {
    if (isSignUp) {
      handleEmailSignUp();
    } else {
      handleEmailSignIn();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          {isSignUp ? "Hesap Oluşturun" : "Giriş Yap"}
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            E-Posta
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Şifre
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={emailLoading || googleLoading}
          className={`mb-4 w-full rounded-md px-4 py-2 transition 
              ${
                googleLoading || emailLoading
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "text-white bg-amber-600 hover:bg-amber-700"
              }`}
        >
          {emailLoading ? (
            <span className="flex items-center justify-center gap-2">
              <Spinner color="text-white" />
              İşlem yapılıyor...
            </span>
          ) : isSignUp ? (
            "Üye Ol"
          ) : (
            "Giriş Yap"
          )}
        </button>

        {/* Google */}
        <button
          onClick={handleGoogleLogin}
          disabled={emailLoading || googleLoading}
          className={`mb-6 w-full rounded-md border border-gray-300 bg-white px-4 py-2 flex items-center justify-center gap-2 transition ${
            googleLoading || emailLoading
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {googleLoading ? (
            <span className="flex items-center justify-center gap-2">
              <Spinner color="text-gray-600" />
              İşlem yapılıyor...
            </span>
          ) : (
            <>
              <FcGoogle size={20} /> <span>Google İle Giriş Yap</span>
            </>
          )}
        </button>

        {/* Toggle */}
        <p className="text-center text-sm text-gray-600">
          {isSignUp ? (
            <>
              Zaten üye misiniz?{" "}
              <button
                onClick={() => setIsSignUp(false)}
                className="font-medium text-blue-600 hover:underline"
              >
                Giriş Yap
              </button>
            </>
          ) : (
            <>
              Burada yeni misiniz?{" "}
              <button
                onClick={() => setIsSignUp(true)}
                className="font-medium text-blue-600 hover:underline"
              >
                Hesap oluşturun
              </button>
            </>
          )}
        </p>

        {!isSignUp && (
          <p className="mt-2 text-center text-sm text-gray-600">
            <button
              onClick={handlePasswordReset}
              className="font-medium text-blue-600 hover:underline"
            >
              Şifrenizi mi unuttunuz?
            </button>
          </p>
        )}

        {message && (
          <p className="mt-4 text-center text-sm text-red-500">{message}</p>
        )}
      </div>
    </div>
  );
}
