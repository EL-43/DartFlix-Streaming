import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';

export default function MoviesPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
                <FontAwesomeIcon icon={faFilm} className="text-primary" />
                Movies
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                    <div key={i} className="content-card group">
                        <div className="card-image" />
                        <h3 className="text-lg font-bold mb-1">Movie Title {i}</h3>
                        <p className="text-gray-400 text-sm">Action • 2023 • 8.{i}/10</p>
                    </div>
                ))}
            </div>
        </div>
    );
}