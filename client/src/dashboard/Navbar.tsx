import React, { useState } from "react";
import Profile from "./Profile";
import LogoNavbar from "./LogoNavbar";
import "./style/Navbar.css";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Replace this with your actual authentication logic

    return (
        <nav className="app-navbar">
            <LogoNavbar />
            {isLoggedIn && <Profile />}
        </nav>
    );
}

export default Navbar;
