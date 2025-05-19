import React, { useState, useContext, useRef } from 'react';
import { UserDataContext } from '../context/UserContext';
import NavbarWithMenu from '../components/Navbar';

const Settings = () => {
    const { user } = useContext(UserDataContext);
    const fileInputRef = useRef(null);
    const [activeTab, setActiveTab] = useState('profile');
    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        profilePicture: user?.profilePicture || ''
    });
    const [favoriteLocations, setFavoriteLocations] = useState({
        home: {
            address: '',
            coordinates: null,
            label: 'Home'
        },
        office: {
            address: '',
            coordinates: null,
            label: 'Office'
        }
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [locationStatus, setLocationStatus] = useState({
        home: { saved: false, message: '' },
        office: { saved: false, message: '' }
    });

    // Mock notifications data - in real app, this would come from your backend
    const [notifications] = useState([
        {
            id: 1,
            type: 'ride_completed',
            message: 'Your ride from Downtown to Airport has been completed',
            timestamp: '2024-03-15T10:30:00',
            read: false
        },
        {
            id: 2,
            type: 'ride_completed',
            message: 'Your ride from Home to Office has been completed',
            timestamp: '2024-03-14T15:45:00',
            read: true
        }
    ]);

    // Function to get initials from name
    const getInitials = (name) => {
        if (!name) return '?';
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // Function to get random background color based on name
    const getRandomColor = (name) => {
        const colors = [
            'bg-blue-500',
            'bg-green-500',
            'bg-purple-500',
            'bg-pink-500',
            'bg-indigo-500',
            'bg-red-500',
            'bg-yellow-500',
            'bg-teal-500'
        ];
        if (!name) return colors[0];
        const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return colors[index % colors.length];
    };

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Here you would typically make an API call to update the profile
            console.log('Profile updated:', profileData);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size should be less than 5MB');
            return;
        }

        setIsLoading(true);
        try {
            // Here you would typically upload the file to your server
            // For now, we'll create a local URL
            const imageUrl = URL.createObjectURL(file);
            setProfileData(prev => ({
                ...prev,
                profilePicture: imageUrl
            }));
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            console.error('Error uploading photo:', error);
            alert('Error uploading photo. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLocationChange = (type, value) => {
        setFavoriteLocations(prev => ({
            ...prev,
            [type]: {
                ...prev[type],
                address: value
            }
        }));
        // Reset status when user starts typing
        setLocationStatus(prev => ({
            ...prev,
            [type]: { saved: false, message: '' }
        }));
    };

    const handleLocationSubmit = async (type) => {
        if (!favoriteLocations[type].address.trim()) {
            setLocationStatus(prev => ({
                ...prev,
                [type]: { saved: false, message: 'Please enter an address' }
            }));
            return;
        }

        setIsLoading(true);
        try {
            // Here you would typically make an API call to save the location
            // For now, we'll simulate an API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setLocationStatus(prev => ({
                ...prev,
                [type]: { saved: true, message: 'Location saved successfully!' }
            }));

            // Clear success message after 3 seconds
            setTimeout(() => {
                setLocationStatus(prev => ({
                    ...prev,
                    [type]: { saved: false, message: '' }
                }));
            }, 3000);
        } catch (error) {
            console.error('Error saving location:', error);
            setLocationStatus(prev => ({
                ...prev,
                [type]: { saved: false, message: 'Error saving location. Please try again.' }
            }));
        } finally {
            setIsLoading(false);
        }
    };

    const ProfileSection = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Profile Information</h2>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-blue-600 hover:text-blue-800"
                    disabled={isLoading}
                >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        {profileData.profilePicture ? (
                            <img
                                src={profileData.profilePicture}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover"
                            />
                        ) : (
                            <div className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-semibold ${getRandomColor(profileData.name)}`}>
                                {getInitials(profileData.name)}
                            </div>
                        )}
                        {isEditing && (
                            <>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handlePhotoUpload}
                                    accept="image/*"
                                    className="hidden"
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
                                    disabled={isLoading}
                                >
                                    <i className="ri-camera-line"></i>
                                </button>
                            </>
                        )}
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-medium">{profileData.name}</h3>
                        <p className="text-gray-600">{profileData.email}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={profileData.name}
                            onChange={handleProfileChange}
                            disabled={!isEditing || isLoading}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleProfileChange}
                            disabled={!isEditing || isLoading}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleProfileChange}
                            disabled={!isEditing || isLoading}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                    </div>
                </div>

                {isEditing && (
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                )}
            </form>
        </div>
    );

    const FavoriteLocationsSection = () => (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Favorite Locations</h2>
            
            <div className="space-y-4">
                {Object.entries(favoriteLocations).map(([type, location]) => (
                    <div key={type} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center space-x-3 mb-3">
                            <i className={`ri-${type === 'home' ? 'home' : 'building'}-line text-2xl text-blue-600`}></i>
                            <h3 className="font-medium">{location.label}</h3>
                        </div>
                        <div className="space-y-2">
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    value={location.address}
                                    onChange={(e) => handleLocationChange(type, e.target.value)}
                                    placeholder={`Enter your ${type} address`}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    disabled={isLoading}
                                />
                                <button
                                    onClick={() => handleLocationSubmit(type)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                            {locationStatus[type].message && (
                                <p className={`text-sm ${locationStatus[type].saved ? 'text-green-600' : 'text-red-600'}`}>
                                    {locationStatus[type].message}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const MessagesSection = () => {
        const formatTimestamp = (timestamp) => {
            const date = new Date(timestamp);
            return date.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            });
        };

        if (notifications.length === 0) {
            return (
                <div className="text-center py-12">
                    <div className="mb-4">
                        <i className="ri-notification-off-line text-4xl text-gray-400"></i>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">You're up to date!</h3>
                    <p className="text-gray-600">No new notifications yet. Come back later for updates.</p>
                </div>
            );
        }

        return (
            <div className="space-y-4">
                {notifications.map(notification => (
                    <div
                        key={notification.id}
                        className={`p-4 rounded-lg border ${
                            notification.read
                                ? 'bg-white border-gray-200'
                                : 'bg-blue-50 border-blue-200'
                        }`}
                    >
                        <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-full ${
                                notification.read ? 'bg-gray-100' : 'bg-blue-100'
                            }`}>
                                <i className={`ri-${notification.type === 'ride_completed' ? 'car' : 'notification'}-line text-xl ${
                                    notification.read ? 'text-gray-600' : 'text-blue-600'
                                }`}></i>
                            </div>
                            <div className="flex-1">
                                <p className={`text-sm ${
                                    notification.read ? 'text-gray-600' : 'text-gray-900'
                                }`}>
                                    {notification.message}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {formatTimestamp(notification.timestamp)}
                                </p>
                            </div>
                            {!notification.read && (
                                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <NavbarWithMenu />
            <main className="pt-16 px-4">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
                    
                    {/* Tab Navigation */}
                    <div className="flex border-b mb-6">
                        <button
                            className={`px-4 py-2 font-medium ${
                                activeTab === 'profile'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                            onClick={() => setActiveTab('profile')}
                        >
                            Profile
                        </button>
                        <button
                            className={`px-4 py-2 font-medium ${
                                activeTab === 'favorites'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                            onClick={() => setActiveTab('favorites')}
                        >
                            Favorite Locations
                        </button>
                        <button
                            className={`px-4 py-2 font-medium ${
                                activeTab === 'messages'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                            onClick={() => setActiveTab('messages')}
                        >
                            Messages
                        </button>
                    </div>

                    {/* Content Sections */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        {activeTab === 'profile' ? (
                            <ProfileSection />
                        ) : activeTab === 'favorites' ? (
                            <FavoriteLocationsSection />
                        ) : (
                            <MessagesSection />
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Settings; 