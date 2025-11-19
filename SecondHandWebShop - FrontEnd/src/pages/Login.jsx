import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "../components/GoogleLoginButton";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

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

      login(jwt); // Save JWT in global state + localStorage

      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  return (
    <div style={styles.container}>
      <h1>Login</h1>
      <p>Please sign in using your Google account</p>

      {/* Google Login Button */}
      <GoogleLoginButton onLogin={handleGoogleLogin} />
    </div>
  );
}

const styles = {
  container: {
    marginTop: "80px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  }
};
