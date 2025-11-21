import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode"; 

const AuthContext = createContext(null);

// -------- Decode user from JWT --------
function decodeUserFromToken(token) {
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);

    return {
      id: decoded.id ?? null,
      email: decoded.sub ?? decoded.email ?? null,
      name: decoded.name ?? null,
    };
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
}

// -------- Auth Provider --------
export function AuthProvider({ children }) {
  //const [jwt, setJwt] = useState(() => localStorage.getItem("jwt"));
  const [jwt, setJwt] = useState(() => {
  const stored = localStorage.getItem("jwt");
  return stored && stored !== "null" ? stored : null;
});
  //const [user, setUser] = useState(() => decodeUserFromToken(localStorage.getItem("jwt")));
  const [user, setUser] = useState(() => {
  const stored = localStorage.getItem("jwt");
  return decodeUserFromToken(stored && stored !== "null" ? stored : null);
});


  // Keep user in sync when jwt changes
  useEffect(() => {
    setUser(decodeUserFromToken(jwt));
  }, [jwt]);

  // Login
  const login = useCallback((token) => {
    localStorage.setItem("jwt", token);
    setJwt(token);
  }, []);

  // Logout
  const logout = useCallback(() => {
    localStorage.removeItem("jwt");
    setJwt(null);
    setUser(null);
  }, []);

  const isLoggedIn = Boolean(jwt);

  return (
    <AuthContext.Provider value={{ jwt, user, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

// -------- useAuth Hook --------
export default function useAuth() {
  return useContext(AuthContext);
}
