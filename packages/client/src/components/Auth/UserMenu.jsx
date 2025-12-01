// packages/client/src/components/Auth/UserMenu.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faUser, faBookmark, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

export default function UserMenu() {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    if (!user) return null;

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
                <img
                    src={user.profile_picture || 'https://via.placeholder.com/150'}
                    alt={user.username}
                    className="w-8 h-8 rounded-full"
                />
                <span className="hidden md:inline">{user.username}</span>
                <FontAwesomeIcon
                    icon={faCaretDown}
                    className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-lg rounded-lg shadow-xl z-50 border border-gray-700">
                        <div className="p-4 border-b border-gray-700">
                            <p className="font-bold text-white">{user.full_name || user.username}</p>
                            <p className="text-sm text-gray-400">{user.email}</p>
                            {user.is_premium && (
                                <span className="inline-block mt-2 px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-xs rounded text-white">
                                    PREMIUM
                                </span>
                            )}
                        </div>

                        <div className="p-2">
                            <Link
                                to="/profile"
                                className="flex items-center gap-2 px-4 py-2 rounded hover:bg-white/10 transition-colors text-white"
                                onClick={() => setIsOpen(false)}
                            >
                                <FontAwesomeIcon icon={faUser} />
                                Profile
                            </Link>
                            <Link
                                to="/my-list"
                                className="flex items-center gap-2 px-4 py-2 rounded hover:bg-white/10 transition-colors text-white"
                                onClick={() => setIsOpen(false)}
                            >
                                <FontAwesomeIcon icon={faBookmark} />
                                My List
                            </Link>
                            <Link
                                to="/settings"
                                className="flex items-center gap-2 px-4 py-2 rounded hover:bg-white/10 transition-colors text-white"
                                onClick={() => setIsOpen(false)}
                            >
                                <FontAwesomeIcon icon={faCog} />
                                Settings
                            </Link>

                            <div className="border-t border-gray-700 mt-2 pt-2">
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsOpen(false);
                                    }}
                                    className="flex items-center gap-2 w-full text-left px-4 py-2 rounded hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                                >
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}