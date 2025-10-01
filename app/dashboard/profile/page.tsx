'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface UserProfile {
    _id: string;
    username: string;
    email: string;
}

export default function ProfilePage() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [newUsername, setNewUsername] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/user/profile');
                setUser(response.data.data);
                setNewUsername(response.data.data.username); 
            } catch (error) {
                console.error('Failed to fetch profile', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserProfile();
    }, []);

    
    const handleSave = async () => {
        if (!user) return;
        try {
            const response = await axios.put('/api/user/profile', { username: newUsername });
            setUser(response.data.data);
            setIsEditing(false); 
        } catch (error) {
            console.error('Failed to update profile', error);
        }
    };

    if (loading) {
        return <p className="text-center text-gray-900 mt-10">Loading profile...</p>;
    }

    if (!user) {
        return <p className="text-center text-gray-900 mt-10">Could not load user profile.</p>;
    }

    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Your Profile</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-500">Username</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        ) : (
                            <p className="text-lg text-gray-900">{user.username}</p>
                        )}
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-500">Email</label>
                        <p className="text-lg text-gray-900">{user.email}</p>
                    </div>
                </div>

                <div className="mt-6">
                    {isEditing ? (
                        <div className="flex gap-4">
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}