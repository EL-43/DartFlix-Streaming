import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';

export default function MoviesPage() {
    const { playVideo } = useOutletContext();

    const movies = [
        {
            id: 1,
            title: "F1: The Movie",
            image: "https://m.media-amazon.com/images/S/pv-target-images/c93330e8ea31247d565cb78ed20369d0bd0f8ac77cc3fdcb617dd67d63c362b4.jpg",
            year: "2025",
            rating: "7.7",
            genre: "Action, Drama, Sport",
            // ADDED: The specific video for this movie
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" 
        },
        {
            id: 2,
            title: "Five Nights at Freddy's",
            image: "https://m.media-amazon.com/images/M/MV5BNzFkMDE2ZmEtOWMwNy00MWM2LThlNjMtZWQzNWY5MTJjZjcxXkEyXkFqcGc@._V1_.jpg", 
            year: "2023",
            rating: "5.4",
            genre: "Horror, Mystery",
            // ADDED: A different video for this movie
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        },
        {
            id: 3,
            title: "The Dark Knight",
            image: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg", 
            year: "2008",
            rating: "9.0",
            genre: "Action",
            // ADDED: Another different video
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
                <FontAwesomeIcon icon={faFilm} className="text-primary" />
                Movies
            </h1>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {movies.map((movie) => (
                    <div 
                        key={movie.id} 
                        className="content-card group cursor-pointer" 
                        // CHANGED: We now pass the specific URL to the function
                        onClick={() => playVideo(movie.videoUrl)} 
                    >
                        <div className='w-full overflow-hidden rounded-lg bg-gray-800 mb-3'>
                            <img
                                src={movie.image}
                                alt={movie.title}
                                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        
                        <h3 className="text-lg font-bold mb-1 break-words">{movie.title}</h3>
                        
                        <div className="flex justify-between text-sm text-gray-400">
                            <span>{movie.year}</span>
                            <span>{movie.genre.split(',')[0]}</span>
                            <span className="text-yellow-500">{movie.rating}/10</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}