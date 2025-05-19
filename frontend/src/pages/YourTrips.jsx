import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import NavbarWithMenu from '../components/Navbar';

const YourTrips = () => {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [upcomingRides, setUpcomingRides] = useState([]);
    const [pastRides, setPastRides] = useState([]);
    const { user } = useContext(UserDataContext);

    useEffect(() => {
        fetchRides();
    }, []);

    const fetchRides = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/user-rides`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            // Separate rides into upcoming and past
            const now = new Date();
            const upcoming = response.data.filter(ride => new Date(ride.scheduledTime) > now);
            const past = response.data.filter(ride => new Date(ride.scheduledTime) <= now);
            
            setUpcomingRides(upcoming);
            setPastRides(past);
        } catch (error) {
            console.error('Error fetching rides:', error);
        }
    };

    const formatDate = (dateString) => {
        const options = { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const RideCard = ({ ride }) => (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-semibold text-lg">{ride.vehicleType}</h3>
                    <p className="text-gray-600 text-sm">{formatDate(ride.scheduledTime)}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                    ride.status === 'completed' ? 'bg-green-100 text-green-800' :
                    ride.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                }`}>
                    {ride.status}
                </span>
            </div>
            <div className="mt-3">
                <div className="flex items-center mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <p className="text-gray-700">{ride.pickup}</p>
                </div>
                <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <p className="text-gray-700">{ride.destination}</p>
                </div>
            </div>
            <div className="mt-3 pt-3 border-t">
                <p className="text-gray-600">Fare: ${ride.fare}</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <NavbarWithMenu />
            <main className="pt-16 px-4">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Trips</h1>
                    
                    {/* Tab Navigation */}
                    <div className="flex border-b mb-6">
                        <button
                            className={`px-4 py-2 font-medium ${
                                activeTab === 'upcoming'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                            onClick={() => setActiveTab('upcoming')}
                        >
                            Upcoming Rides
                        </button>
                        <button
                            className={`px-4 py-2 font-medium ${
                                activeTab === 'past'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                            onClick={() => setActiveTab('past')}
                        >
                            Past Rides
                        </button>
                    </div>

                    {/* Rides List */}
                    <div className="space-y-4">
                        {activeTab === 'upcoming' ? (
                            upcomingRides.length > 0 ? (
                                upcomingRides.map(ride => (
                                    <RideCard key={ride._id} ride={ride} />
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    No upcoming rides
                                </div>
                            )
                        ) : (
                            pastRides.length > 0 ? (
                                pastRides.map(ride => (
                                    <RideCard key={ride._id} ride={ride} />
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    No past rides
                                </div>
                            )
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default YourTrips; 