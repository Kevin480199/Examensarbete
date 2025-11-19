import {createRoot} from 'react-dom/client';
import GoogleLoginButton from './components/GoogleLoginButton';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyListings from "./pages/MyListings";
import AddListing from "./pages/AddListing";
import { AuthProvider } from './hooks/useAuth';

function App(){
    
    return(
        <div>
            <Navbar/>
            
        </div>
    )
}

const root = createRoot( document.querySelector("#root") );
root.render(
  <BrowserRouter>
    <AuthProvider>
        <App />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add" element={<AddListing />} />
            <Route path="/my-listings" element={<MyListings />} />
        </Routes>
    </AuthProvider>
    
  </BrowserRouter>
);