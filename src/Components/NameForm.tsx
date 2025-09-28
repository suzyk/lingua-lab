import React from "react";
import { useState } from "react";
import { supabase } from "../supabaseClient";

interface NameFormProps {
  onComplete: (studentName: string) => void;
}

const NameForm = ({ onComplete }: NameFormProps) => {
  const [studentName, setStudentName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) return;

    setLoading(true);
    setErrorMsg("");

    try {
      // Update the current user's student_name in Supabase Auth user_metadata
      const { error } = await supabase.auth.updateUser({
        data: { student_name: studentName.trim() },
      });

      if (error) throw error;

      // Notify parent component
      onComplete(studentName.trim());
    } catch (err: any) {
      console.error("İsim güncellenemedi:", err);
      setErrorMsg(err.message || "Hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-6 shadow-lg w-80 flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold text-center">
          Öğrenci Adını Girin
        </h2>
        <p className="text-gray-600 text-sm text-center">
          Lütfen çocuğunuzun adını girin. Bu işlem zorunludur.
        </p>
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="Öğrenci adı"
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-amber-500 text-white py-2 rounded hover:bg-amber-600 transition"
        >
          {loading ? "Kaydediliyor..." : "Kaydet"}
        </button>
        {errorMsg && (
          <p className="text-red-600 text-sm text-center">{errorMsg}</p>
        )}
      </form>
    </div>
  );
};

export default NameForm;
