import {createRoot} from 'react-dom/client';
import GoogleLoginButton from './components/GoogleLoginButton';


function App(){
    const handleGoogleLogin = (response) => {
    console.log("Google Token:", response.credential);
  };
    return(
        <div>
            <GoogleLoginButton onLogin={handleGoogleLogin}/>
        </div>
    )
}

const root = createRoot( document.querySelector("#root") );
root.render(<App/>); 