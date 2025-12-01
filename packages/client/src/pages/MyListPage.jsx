// packages/client/src/pages/MyListPage.jsx
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faPlay, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function MyListPage() {
    const { playVideo } = useOutletContext();
    const { user } = useAuth();

    const watchlist = [
        { title: 'Action Blockbuster', added: '2 days ago' },
        { title: 'Drama Series', added: '1 week ago' },
        { title: 'Fantasy Epic', added: '3 days ago' },
        { title: 'Superhero Chronicles', added: '1 month ago' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
                <FontAwesomeIcon icon={faBookmark} className="text-primary" />
                My Watchlist
            </h1>
            <p className="text-gray-400 mb-8">
                Welcome back, {user?.username}! Here are the movies and shows you've saved.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {watchlist.map((item) => (
                    <div key={item.title} className="content-card group relative">
                        <div className="card-image" />
                        <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                        <p className="text-gray-400 text-sm mb-4">Added {item.added}</p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => playVideo()}
                                className="flex-1 py-2 bg-gradient-primary text-white rounded-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
                            >
                                <FontAwesomeIcon icon={faPlay} />
                                Play
                            </button>
                            <button className="p-2 bg-gray-800 text-gray-400 rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-colors">
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}