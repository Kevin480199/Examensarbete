import { useEffect } from "react";

export default function GoogleLoginButton({ onLogin }) {
  const CLIENT_ID = "964404372428-slu7okqrmdv28s9cgu9bc6ma5e8uo6m7.apps.googleusercontent.com";

  useEffect(() => {
    /* global google */
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCredentialResponse,
      });

      google.accounts.id.renderButton(
        document.getElementById("googleBtn"),
        {
          theme: "outline",
          size: "large",
          width: "300",
        }
      );
    };

    document.body.appendChild(script);
  }, []);

  function handleCredentialResponse(response) {
    // response.credential = Google ID Token
    onLogin(response.credential);
  }

  return (
    <div>
      <div id="googleBtn"></div>
    </div>
  );
}
