import React, { useState } from 'react';
import './ProfilePage.css';
import profilePic from '../assets/admin_profile.jpg'; // Use the admin profile picture

function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
    const [profile, setProfile] = useState({
        name: 'Ramesh Soyza',
        email: 'ramesh123@gmail.com',
        phone: '077-752-3894',
        address: 'Colombo, Sri Lanka',
        profilePicture: profilePic,
    });
    const [newProfilePicture, setNewProfilePicture] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewProfilePicture(URL.createObjectURL(file)); // Preview the new profile picture
            setProfile({ ...profile, profilePicture: file });
        }
    };

    const handleSave = () => {
        // Save the updated profile details (e.g., send to backend)
        alert('Profile updated successfully!');
        setIsEditing(false);
    };

    return (
        <div className="profile-page-container">
            <div className="profile-card">
                <div className="profile-header">
                    <img
                        src={newProfilePicture || profile.profilePicture}
                        alt="Profile"
                        className="profile-pic-large"
                    />
                    {!isEditing && <h2>{profile.name}</h2>}
                    {!isEditing && <p className="profile-role">Super Admin</p>}
                </div>
                <div className="profile-details">
                    <h3>Personal Details</h3>
                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                name="name"
                                value={profile.name}
                                onChange={handleInputChange}
                                placeholder="Full Name"
                                className="profile-input"
                            />
                            <input
                                type="email"
                                name="email"
                                value={profile.email}
                                onChange={handleInputChange}
                                placeholder="Email"
                                className="profile-input"
                            />
                        </>
                    ) : (
                        <>
                            <p><strong>Full Name:</strong> {profile.name}</p>
                            <p><strong>Email:</strong> {profile.email}</p>
                        </>
                    )}
                    <p><strong>Role:</strong> Super Admin</p>
                </div>
                <div className="profile-contact">
                    <h3>Contact Information</h3>
                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                name="phone"
                                value={profile.phone}
                                onChange={handleInputChange}
                                placeholder="Phone"
                                className="profile-input"
                            />
                            <input
                                type="text"
                                name="address"
                                value={profile.address}
                                onChange={handleInputChange}
                                placeholder="Address"
                                className="profile-input"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleProfilePictureChange}
                                className="profile-input"
                            />
                        </>
                    ) : (
                        <>
                            <p><strong>Phone:</strong> {profile.phone}</p>
                            <p><strong>Address:</strong> {profile.address}</p>
                        </>
                    )}
                </div>
                <div className="profile-actions">
                    {isEditing ? (
                        <>
                            <button className="save-profile-btn" onClick={handleSave}>Save</button>
                            <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                        </>
                    ) : (
                        <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
                    )}
                    <button className="logout-btn" onClick={() => alert('Logged out successfully!')}>Logout</button>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
