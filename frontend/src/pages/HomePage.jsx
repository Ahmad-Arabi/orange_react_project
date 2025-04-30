import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchContents } from '../store/contentSlice';
import ContentCard from '../components/content/ContentCard';
import '../assets/styles/home.css';

const HomePage = () => {
    const dispatch = useDispatch();
    const { contents, loading, error } = useSelector((state) => state.content);
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const [featured, setFeatured] = useState([]);

    useEffect(() => {
        // Fetch all content when component mounts
        dispatch(fetchContents());
    }, [dispatch]);

    useEffect(() => {
        // Set featured content when contents are loaded
        if (contents.length > 0) {
            setFeatured(contents.slice(0, 3));
        }
    }, [contents]);

    return (
        <div className="home-page">
            <section className="hero">
                <div className="hero-content">
                    <h1>Welcome to Orange Social</h1>
                    <p>Share your thoughts and connect with friends</p>
                    {!isAuthenticated && (
                        <div className="hero-buttons">
                            <Link to="/login" className="btn btn-primary">Login</Link>
                            <Link to="/register" className="btn btn-outline">Register</Link>
                        </div>
                    )}
                </div>
            </section>
            
            {isAuthenticated && (
                <section className="welcome-back">
                    <h2>Welcome back, {user?.name || 'User'}!</h2>
                    <Link to="/content/create" className="btn btn-primary">Create New Post</Link>
                </section>
            )}

            <section className="featured-content">
                <div className="section-header">
                    <h2>Featured Content</h2>
                    <Link to="/content" className="view-all">View All</Link>
                </div>
                
                {loading ? (
                    <p className="loading">Loading featured content...</p>
                ) : error ? (
                    <p className="error-message">Error loading content: {error}</p>
                ) : (
                    <div className="content-grid">
                        {featured.length > 0 ? (
                            featured.map(content => (
                                <ContentCard key={content.id} content={content} />
                            ))
                        ) : (
                            <p>No content available yet. Be the first to share!</p>
                        )}
                    </div>
                )}
            </section>

            <section className="app-features">
                <h2>Discover Orange Social</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">📝</div>
                        <h3>Share Posts</h3>
                        <p>Express yourself with text, images, and more</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">❤️</div>
                        <h3>Like & Comment</h3>
                        <p>Engage with others through likes and comments</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">👥</div>
                        <h3>Build Connections</h3>
                        <p>Connect with friends and grow your network</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;