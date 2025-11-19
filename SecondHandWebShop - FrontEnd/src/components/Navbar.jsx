import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { jwt, logout } = useAuth();
  const isLoggedIn = Boolean(jwt);

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link to="/">SecondHand</Link>
      </div>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>

        {isLoggedIn && (
          <>
            <Link to="/add" style={styles.link}>Add Listing</Link>
            <Link to="/my-listings" style={styles.link}>My Listings</Link>
          </>
        )}
      </div>

      <div style={styles.auth}>
        {!isLoggedIn ? (
          <Link to="/login" style={styles.loginBtn}>Login</Link>
        ) : (
          <button style={styles.logoutBtn} onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    height: "60px",
    background: "#1e1e1e",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 30px",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  logo: {
    fontSize: "22px",
    fontWeight: "bold",
  },
  links: {
    display: "flex",
    gap: "20px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
  },
  auth: {
    display: "flex",
    alignItems: "center",
  },
  loginBtn: {
    color: "white",
    textDecoration: "none",
    border: "1px solid white",
    padding: "6px 14px",
    borderRadius: "6px",
  },
  logoutBtn: {
    background: "transparent",
    border: "1px solid red",
    color: "red",
    padding: "6px 14px",
    cursor: "pointer",
    borderRadius: "6px",
  }
};
