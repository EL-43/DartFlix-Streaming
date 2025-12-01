// packages/client/src/pages/HomePage.jsx
import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlay,
    faInfoCircle,
    faStar,
    faCrown,
    faDownload,
    faUsers,
    faGlobe,
    faSync
} from '@fortawesome/free-solid-svg-icons';

export default function HomePage() {
    const { playVideo } = useOutletContext();

    const contentSections = [
        {
            id: 'trending',
            title: 'Trending Now',
            items: [
                { title: 'Action Blockbuster', description: 'An intense action-packed adventure', category: 'action', rating: 8.5 },
                { title: 'Drama Series', description: 'A compelling drama unfolds', category: 'drama', rating: 8.2 },
                { title: 'Fantasy Epic', description: 'An epic fantasy journey', category: 'fantasy', rating: 8.8 },
                { title: 'Anime Collection', description: 'Best anime series compilation', category: 'anime', rating: 9.0 }
            ]
        },
        {
            id: 'movies',
            title: 'Popular Movies',
            items: [
                { title: 'Superhero Chronicles', description: 'Amazing superhero stories', category: 'action', rating: 8.6 },
                { title: 'Space Odyssey', description: 'Journey through space', category: 'sci-fi', rating: 8.7 },
                { title: 'Mystery Thriller', description: 'Suspenseful mystery awaits', category: 'thriller', rating: 8.4 },
                { title: 'Romantic Comedy', description: 'Laughs and love combined', category: 'comedy', rating: 8.1 }
            ]
        },
        {
            id: 'series',
            title: 'Binge-Worthy Series',
            items: [
                { title: 'Royal Dynasty', description: 'Power and politics unfold', category: 'drama', rating: 8.9 },
                { title: 'Science Fiction', description: 'Future technology explored', category: 'sci-fi', rating: 8.5 },
                { title: 'Medical Drama', description: 'Hospital stories revealed', category: 'drama', rating: 8.3 },
                { title: 'Crime Investigation', description: 'Solving criminal cases', category: 'thriller', rating: 8.6 }
            ]
        },
        {
            id: 'anime',
            title: 'Latest Anime',
            items: [
                { title: 'Power Academy', description: 'Superpowered students train', category: 'anime', rating: 8.7 },
                { title: 'Samurai Legend', description: 'Ancient samurai battles', category: 'anime', rating: 9.1 },
                { title: 'Romance Blossom', description: 'Love stories unfold', category: 'romance', rating: 8.2 },
                { title: 'Mecha Warriors', description: 'Giant robots in action', category: 'anime', rating: 8.8 }
            ]
        }
    ];

    const features = [
        { icon: faStar, title: '4K Ultra HD', description: 'Experience crystal-clear picture quality with support for 4K Ultra HD streaming on compatible devices.' },
        { icon: faPlay, title: 'Any Device', description: 'Watch on your TV, computer, tablet, or smartphone - seamlessly across all your devices.' },
        { icon: faDownload, title: 'Download & Go', description: 'Download your favorite content to watch offline, perfect for travel or when you\'re on the move.' },
        { icon: faUsers, title: 'Family Friendly', description: 'Create separate profiles for family members with personalized recommendations and parental controls.' },
        { icon: faGlobe, title: 'Global Content', description: 'Access content from around the world with subtitles and dubbing in multiple languages.' },
        { icon: faSync, title: 'Auto-Resume', description: 'Pick up exactly where you left off on any device with seamless cross-platform synchronization.' }
    ];

    return (
        <div className="text-white">
            {/* Hero Section */}
            <section
                className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-black/40 via-black/60 to-black/80"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), 
            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect fill="%23222" width="1200" height="800"/><circle cx="200" cy="200" r="100" fill="%23e50914" opacity="0.1"/><circle cx="800" cy="400" r="150" fill="%23ff6b35" opacity="0.1"/><circle cx="1000" cy="200" r="80" fill="%23ffa500" opacity="0.1"/></svg>')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="text-center max-w-3xl px-4 animate-fade-in-up">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 text-gradient-white">
                        Unlimited Entertainment
                    </h1>
                    <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed max-w-2xl mx-auto">
                        Stream thousands of movies, TV shows, and anime series in stunning
                        quality. Watch anywhere, anytime, on any device.
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <button
                            onClick={() => playVideo()}
                            className="px-8 py-4 bg-gradient-primary text-white font-bold rounded-lg hover:scale-105 transition-transform flex items-center gap-2"
                        >
                            <FontAwesomeIcon icon={faPlay} />
                            Start Watching
                        </button>
                        <a
                            href="#features"
                            className="px-8 py-4 bg-white/10 text-white font-bold rounded-lg border-2 border-white/30 hover:bg-white/20 hover:border-primary transition-colors flex items-center gap-2"
                        >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Learn More
                        </a>
                    </div>
                </div>
            </section>

            {/* Content Sections */}
            {contentSections.map((section) => (
                <section key={section.id} id={section.id} className="py-16 md:py-20 px-4 md:px-12 max-w-7xl mx-auto animate-fade-in-up">
                    <h2 className="text-3xl md:text-4xl mb-10 text-center relative">
                        {section.title}
                        <span className="absolute -bottom-2.5 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-primary rounded" />
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {section.items.map((item) => (
                            <div
                                key={item.title}
                                className="content-card group"
                                onClick={() => playVideo()}
                            >
                                <div className="card-image" />
                                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                <p className="text-gray-400 mb-2">{item.category} • {item.rating}/10</p>
                                <p className="opacity-80 text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            ))}

            {/* Features Section */}
            <section id="features" className="py-16 md:py-20 px-4 md:px-12 max-w-7xl mx-auto">
                <div className="bg-black/30 rounded-3xl p-8 md:p-16 animate-fade-in-up glass-dark">
                    <h2 className="text-3xl md:text-4xl mb-12 text-center relative">
                        Why Choose DartFlix
                        <span className="absolute -bottom-2.5 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-primary rounded" />
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {features.map((feature) => (
                            <div key={feature.title} className="text-center p-6 md:p-8 rounded-2xl transition-all duration-300 hover:bg-primary/10 hover:-translate-y-1">
                                <div className="text-4xl md:text-5xl mb-5 text-gradient-primary">
                                    <FontAwesomeIcon icon={feature.icon} />
                                </div>
                                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                                <p className="text-sm md:text-base opacity-80">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}