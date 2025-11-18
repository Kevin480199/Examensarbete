import {createRoot} from 'react-dom/client';
import GoogleLoginButton from './components/GoogleLoginButton';


function App(){
    function handleGoogleToken(idToken) {
  console.log("Google ID token:", idToken);

  // Example: send to backend
  fetch("http://localhost:8080/api/auth/google", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idToken })
  })
    .then(res => res.text())
    .then(jwt => {
      console.log("JWT from backend:", jwt);
    });
}

    return(
        <div>
            <GoogleLoginButton onLogin={handleGoogleToken}/>
        </div>
    )
}

const root = createRoot( document.querySelector("#root") );
root.render(<App/>); 