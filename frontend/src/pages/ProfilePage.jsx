import React from 'react';
import UserInfo from '../components/profile/UserInfo';

const ProfilePage = () => {
    return (
        <div className="profile-page">
            <h1>User Profile</h1>
            <UserInfo />
        </div>
    );
};

export default ProfilePage;