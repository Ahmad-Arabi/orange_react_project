import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/main.css'; // Adjust the path as necessary

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <h1>Threadly</h1>
            </div>
            <nav className="nav">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/content">Content</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;