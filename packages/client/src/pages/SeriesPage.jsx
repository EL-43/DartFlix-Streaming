import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv } from '@fortawesome/free-solid-svg-icons';

export default function SeriesPage() {
    const { playVideo } = useOutletContext();

    const series = [
        { title: 'Drama Series', seasons: 3, episodes: 36, rating: 8.2 },
        { title: 'Medical Drama', seasons: 5, episodes: 110, rating: 8.3 },
        { title: 'Crime Investigation', seasons: 4, episodes: 52, rating: 8.6 },
        { title: 'Royal Dynasty', seasons: 2, episodes: 20, rating: 8.9 },
        { title: 'Science Fiction', seasons: 6, episodes: 72, rating: 8.5 },
        { title: 'Mystery Thriller', seasons: 3, episodes: 30, rating: 8.4 },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
                <FontAwesomeIcon icon={faTv} className="text-primary" />
                TV Series
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {series.map((show) => (
                    <div key={show.title} className="content-card group" onClick={() => playVideo()}>
                        <div className="card-image" />
                        <h3 className="text-lg font-bold mb-2">{show.title}</h3>
                        <div className="flex justify-between text-sm text-gray-400">
                            <span>S{show.seasons}</span>
                            <span>E{show.episodes}</span>
                            <span className="text-yellow-500">{show.rating}/10</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}