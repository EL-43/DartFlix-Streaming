import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGhost } from '@fortawesome/free-solid-svg-icons';

export default function AnimePage() {
    const { playVideo } = useOutletContext();

    const anime = [
        { title: 'Anime Collection', episodes: 50, rating: 9.0, status: 'Ongoing' },
        { title: 'Power Academy', episodes: 24, rating: 8.7, status: 'Complete' },
        { title: 'Samurai Legend', episodes: 36, rating: 9.1, status: 'Complete' },
        { title: 'Romance Blossom', episodes: 12, rating: 8.2, status: 'Complete' },
        { title: 'Mecha Warriors', episodes: 26, rating: 8.8, status: 'Ongoing' },
        { title: 'Fantasy Epic', episodes: 48, rating: 8.8, status: 'Complete' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
                <FontAwesomeIcon icon={faGhost} className="text-primary" />
                Anime
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {anime.map((item) => (
                    <div key={item.title} className="content-card group" onClick={() => playVideo()}>
                        <div className="card-image" />
                        <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                        <div className="flex justify-between text-sm text-gray-400">
                            <span>{item.episodes} eps</span>
                            <span className={item.status === 'Ongoing' ? 'text-green-500' : 'text-blue-500'}>
                                {item.status}
                            </span>
                            <span className="text-yellow-500">{item.rating}/10</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}