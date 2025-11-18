import { useEffect, useState } from "react";

export default function GoogleLoginButton({ onLogin }) {
  const CLIENT_ID = "964404372428-slu7okqrmdv28s9cgu9bc6ma5e8uo6m7.apps.googleusercontent.com";
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => setScriptLoaded(true);

    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!scriptLoaded) return;

    google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: (response) => {
        onLogin(response.credential);
      },
    });

    google.accounts.id.renderButton(
      document.getElementById("googleBtn"),
      { theme: "outline", size: "large", width: "300" }
    );
  }, [scriptLoaded]);

  return <div id="googleBtn"></div>;
}
