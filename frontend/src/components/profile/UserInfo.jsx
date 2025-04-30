import React from 'react';

const UserInfo = ({ user }) => {
    return (
        <div className="user-info">
            <h2>User Profile</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
            <p><strong>Liked Items:</strong> {user.likedItems.length}</p>
        </div>
    );
};

export default UserInfo;