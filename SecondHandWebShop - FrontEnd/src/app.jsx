import "./globals";
import {createRoot} from 'react-dom/client';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyListings from "./pages/MyListings";
import AddListing from "./pages/AddListing";
import EditProduct from "./pages/EditProduct";
import Favorites from "./pages/Favorites"
import { AuthProvider } from './hooks/useAuth';
import Recommendations from "./pages/Recommendations";

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
            <Route path="/edit/:id" element={<EditProduct />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/recommendations" element={<Recommendations />} />
        </Routes>
    </AuthProvider>
    
  </BrowserRouter>
);