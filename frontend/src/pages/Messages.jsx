import React, { useState, useContext } from 'react';
import { UserDataContext } from '../context/UserContext';
import NavbarWithMenu from '../components/Navbar';

const Messages = () => {
    const { user } = useContext(UserDataContext);
    const [activeFilter, setActiveFilter] = useState('all'); // 'all' or 'unread'

    // Mock notifications data - in real app, this would come from your backend
    const [notifications] = useState([
        {
            id: 1,
            type: 'ride_completed',
            message: 'Your ride from Downtown to Airport has been completed',
            timestamp: '2024-03-15T10:30:00',
            read: false,
            rideDetails: {
                from: 'Downtown',
                to: 'Airport',
                fare: '$25.00',
                distance: '12.5 km',
                duration: '25 mins'
            }
        },
        {
            id: 2,
            type: 'ride_completed',
            message: 'Your ride from Home to Office has been completed',
            timestamp: '2024-03-14T15:45:00',
            read: true,
            rideDetails: {
                from: 'Home',
                to: 'Office',
                fare: '$15.00',
                distance: '8.2 km',
                duration: '18 mins'
            }
        }
    ]);

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

        if (diffInHours < 24) {
            return date.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            });
        } else if (diffInHours < 48) {
            return 'Yesterday';
        } else {
            return date.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric'
            });
        }
    };

    const filteredNotifications = notifications.filter(notification => 
        activeFilter === 'all' || !notification.read
    );

    const EmptyState = () => (
        <div className="text-center py-12">
            <div className="mb-4">
                <i className="ri-notification-off-line text-4xl text-gray-400"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">You're up to date!</h3>
            <p className="text-gray-600">No new notifications yet. Come back later for updates.</p>
        </div>
    );

    const NotificationCard = ({ notification }) => (
        <div
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
                    <div className="mt-2 text-xs text-gray-500 space-y-1">
                        <p>From: {notification.rideDetails.from}</p>
                        <p>To: {notification.rideDetails.to}</p>
                        <p>Fare: {notification.rideDetails.fare}</p>
                        <p>Distance: {notification.rideDetails.distance}</p>
                        <p>Duration: {notification.rideDetails.duration}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        {formatTimestamp(notification.timestamp)}
                    </p>
                </div>
                {!notification.read && (
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                )}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <NavbarWithMenu />
            <main className="pt-16 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setActiveFilter('all')}
                                className={`px-3 py-1 rounded-full text-sm ${
                                    activeFilter === 'all'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setActiveFilter('unread')}
                                className={`px-3 py-1 rounded-full text-sm ${
                                    activeFilter === 'unread'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                Unread
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        {filteredNotifications.length === 0 ? (
                            <EmptyState />
                        ) : (
                            <div className="space-y-4">
                                {filteredNotifications.map(notification => (
                                    <NotificationCard
                                        key={notification.id}
                                        notification={notification}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Messages; 