import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faEnvelope,
    faCalendar,
    faCrown,
    faCamera,
    faSave,
    faLock,
    faKey
} from '@fortawesome/free-solid-svg-icons';

export default function ProfilePage() {
    const { user, updateProfile, changePassword } = useAuth();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [profileForm, setProfileForm] = useState({
        full_name: '',
        profile_picture: ''
    });
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (user) {
            setProfileForm({
                full_name: user.full_name || '',
                profile_picture: user.profile_picture || 'https://via.placeholder.com/150'
            });
        }
    }, [user]);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        const result = await updateProfile(profileForm);

        if (result.success) {
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } else {
            setMessage({ type: 'error', text: result.message });
        }

        setLoading(false);
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setMessage({ type: 'error', text: 'New passwords do not match' });
            setLoading(false);
            return;
        }

        if (passwordForm.newPassword.length < 6) {
            setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
            setLoading(false);
            return;
        }

        const result = await changePassword(passwordForm.currentPassword, passwordForm.newPassword);

        if (result.success) {
            setMessage({ type: 'success', text: 'Password changed successfully!' });
            setPasswordForm({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        } else {
            setMessage({ type: 'error', text: result.message });
        }

        setLoading(false);
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4 text-white">Please login to view profile</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-dark py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-8">My Profile</h1>

                {message.text && (
                    <div className={`mb-6 p-4 rounded-lg ${message.type === 'success'
                            ? 'bg-green-900/30 border border-green-700'
                            : 'bg-red-900/30 border border-red-700'
                        }`}>
                        <p className={message.type === 'success' ? 'text-green-300' : 'text-red-300'}>
                            {message.text}
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-900/50 rounded-2xl p-6 glass text-center">
                            <div className="relative inline-block mb-4">
                                <img
                                    src={profileForm.profile_picture}
                                    alt={user.username}
                                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-700"
                                />
                                <button
                                    onClick={() => {
                                        const newUrl = prompt('Enter new profile picture URL:', profileForm.profile_picture);
                                        if (newUrl) {
                                            setProfileForm({ ...profileForm, profile_picture: newUrl });
                                        }
                                    }}
                                    className="absolute bottom-0 right-0 bg-primary p-2 rounded-full hover:scale-110 transition-transform"
                                >
                                    <FontAwesomeIcon icon={faCamera} className="text-white w-4 h-4" />
                                </button>
                            </div>

                            <h2 className="text-xl font-bold text-white">{profileForm.full_name || user.username}</h2>
                            <p className="text-gray-400">@{user.username}</p>

                            {user.is_premium && (
                                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
                                    <FontAwesomeIcon icon={faCrown} />
                                    <span className="font-bold">Premium Member</span>
                                </div>
                            )}

                            <div className="mt-6 space-y-3 text-left">
                                <div className="flex items-center gap-3">
                                    <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 w-4 h-4" />
                                    <span className="text-gray-300">{user.email}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FontAwesomeIcon icon={faCalendar} className="text-gray-400 w-4 h-4" />
                                    <span className="text-gray-300">
                                        Member since {new Date(user.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Forms */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Profile Update Form */}
                        <div className="bg-gray-900/50 rounded-2xl p-6 glass">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <FontAwesomeIcon icon={faUser} />
                                Update Profile
                            </h2>

                            <form onSubmit={handleProfileUpdate}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-gray-300 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            value={profileForm.full_name}
                                            onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })}
                                            className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            disabled={loading}
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-300 mb-2">Profile Picture URL</label>
                                        <input
                                            type="url"
                                            value={profileForm.profile_picture}
                                            onChange={(e) => setProfileForm({ ...profileForm, profile_picture: e.target.value })}
                                            className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="https://example.com/your-photo.jpg"
                                            disabled={loading}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-3 bg-gradient-primary text-white font-bold rounded-lg hover:scale-105 transition-transform disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        <FontAwesomeIcon icon={faSave} />
                                        {loading ? 'Updating...' : 'Update Profile'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Password Change Form */}
                        <div className="bg-gray-900/50 rounded-2xl p-6 glass">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <FontAwesomeIcon icon={faLock} />
                                Change Password
                            </h2>

                            <form onSubmit={handlePasswordChange}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-gray-300 mb-2">Current Password</label>
                                        <div className="relative">
                                            <input
                                                type="password"
                                                value={passwordForm.currentPassword}
                                                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                                className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent pr-10"
                                                required
                                                disabled={loading}
                                            />
                                            <FontAwesomeIcon
                                                icon={faKey}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-gray-300 mb-2">New Password</label>
                                        <div className="relative">
                                            <input
                                                type="password"
                                                value={passwordForm.newPassword}
                                                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                                className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent pr-10"
                                                required
                                                minLength={6}
                                                disabled={loading}
                                            />
                                            <FontAwesomeIcon
                                                icon={faKey}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-gray-300 mb-2">Confirm New Password</label>
                                        <div className="relative">
                                            <input
                                                type="password"
                                                value={passwordForm.confirmPassword}
                                                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                                className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent pr-10"
                                                required
                                                minLength={6}
                                                disabled={loading}
                                            />
                                            <FontAwesomeIcon
                                                icon={faKey}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-3 bg-gradient-primary text-white font-bold rounded-lg hover:scale-105 transition-transform disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        <FontAwesomeIcon icon={faSave} />
                                        {loading ? 'Changing Password...' : 'Change Password'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}