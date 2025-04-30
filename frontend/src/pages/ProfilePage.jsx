import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import '../assets/styles/profile.css';

const ProfilePage = () => {
    const { isAuthenticated, user, loading: authLoading } = useSelector((state) => state.auth);

    // Redirect if not authenticated
    if (!isAuthenticated && !authLoading) {
        return <Navigate to="/login" />;
    }

    // Show loading state
    if (authLoading) {
        return <div className="loading">Loading profile...</div>;
    }

    return (
        <div className="profile-page">
            <div className="profile-header">
                <div className="profile-avatar">
                    {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="profile-info">
                    <h1>{user?.name || 'User'}</h1>
                    <p className="profile-email">{user?.email || 'email@example.com'}</p>
                </div>
                <button className="btn btn-outline edit-profile-btn">Edit Profile</button>
            </div>

            <div className="profile-content">
                <h2>My Posts</h2>
                <div className="no-content">
                    <p>You haven't posted anything yet.</p>
                    <button className="btn btn-primary">Create Your First Post</button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;