import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "../components/GoogleLoginButton";
import useAuth from "../hooks/useAuth";
import Toast from "../components/Toast";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [toast, setToast] = useState(null);
  
  async function handleGoogleLogin(idToken) {
    try {
      console.log("Sending Google ID token to backend:", idToken);

      const response = await fetch("http://localhost:8080/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      const jwt = await response.text();

      console.log("JWT received:", jwt);

      login(jwt);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-lg border border-gray-100">
        {toast && (
        <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
        />
        )}

        <h1 className="text-3xl font-semibold text-gray-800 text-center">
          Welcome Back
        </h1>

        <p className="text-gray-500 text-center mt-2">
          Sign in using your Google account
        </p>

        <div className="mt-8 flex justify-center">
          <GoogleLoginButton onLogin={handleGoogleLogin} />
        </div>
      </div>
    </div>
  );
}
