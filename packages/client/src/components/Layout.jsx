import React, { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch,
    faUser,
    faBars,
    faHome,
    faFilm,
    faTv,
    faGhost,
    faBookmark,
    faTimes,
    faCaretDown,
    faPlayCircle,
    faSignOutAlt,
    faCog,
    faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';
import UserMenu from './Auth/UserMenu';

export default function Layout() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [videoOpen, setVideoOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const mainVideoRef = useRef(null);

    useEffect(() => {
        const titles = [
            'Action Blockbuster', 'Drama Series', 'Fantasy Epic', 'Anime Collection',
            'Superhero Chronicles', 'Space Odyssey', 'Mystery Thriller', 'Romantic Comedy',
            'Royal Dynasty', 'Science Fiction', 'Medical Drama', 'Crime Investigation',
            'Power Academy', 'Samurai Legend', 'Romance Blossom', 'Mecha Warriors'
        ];
        if (!searchQuery.trim()) return setSearchResults([]);
        const q = searchQuery.toLowerCase();
        setSearchResults(titles.filter(t => t.toLowerCase().includes(q)));
    }, [searchQuery]);

    function playVideo(src) {
        setVideoOpen(true);
        if (mainVideoRef.current && src) {
            mainVideoRef.current.src = src;
        }
        setTimeout(() => mainVideoRef.current?.play?.(), 50);
    }

    function closeVideo() {
        mainVideoRef.current?.pause?.();
        setVideoOpen(false);
    }

    const navItems = [
        { path: '/', name: 'Home', icon: faHome },
        { path: '/movies', name: 'Movies', icon: faFilm },
        { path: '/series', name: 'TV Series', icon: faTv },
        { path: '/anime', name: 'Anime', icon: faGhost },
        { path: '/my-list', name: 'My List', icon: faBookmark },
    ];

    const sidebarItems = [
        ...navItems,
        { path: '/profile', name: 'Profile', icon: faUser },
        { path: '/settings', name: 'Settings', icon: faCog },
        { path: '/help', name: 'Help', icon: faQuestionCircle },
    ];

    return (
        <div className="min-h-screen relative">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-lg py-4 px-4 md:px-12 z-50 transition-all duration-300">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-gradient-primary">
                        DartFlix
                    </Link>

                    {/* Desktop Navigation */}
                    <ul className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 gap-8 list-none">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className="text-white font-medium no-underline transition-colors duration-300 relative hover:text-primary group flex items-center gap-2"
                                >
                                    <FontAwesomeIcon icon={item.icon} className="w-4 h-4" />
                                    {item.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full" />
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-4">
                        <button
                            className="bg-transparent border-none text-white text-lg cursor-pointer p-2 rounded-full transition-all duration-300 hover:bg-primary/20 hover:scale-110"
                            onClick={() => setSearchOpen(true)}
                            aria-label="Search"
                        >
                            <FontAwesomeIcon icon={faSearch} />
                        </button>

                        {/* User Profile or Login */}
                        {user ? (
                            <UserMenu />
                        ) : (
                            <Link
                                to="/login"
                                className="bg-transparent border-none text-white text-lg cursor-pointer p-2 rounded-full transition-all duration-300 hover:bg-primary/20 hover:scale-110"
                                aria-label="Login"
                            >
                                <FontAwesomeIcon icon={faUser} />
                            </Link>
                        )}

                        <button
                            className="lg:hidden text-white text-2xl"
                            onClick={() => setSidebarOpen(true)}
                            aria-label="Menu"
                        >
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Sidebar Menu (Mobile) */}
            <div className={`fixed left-0 top-0 w-64 md:w-80 h-screen bg-black/95 backdrop-blur-xl transition-all duration-300 z-40 pt-20 px-5 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <button
                    className="absolute top-4 right-4 text-white text-2xl"
                    onClick={() => setSidebarOpen(false)}
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>

                <ul className="list-none">
                    {sidebarItems.map((item) => (
                        <li key={item.path} className="mb-4">
                            <Link
                                to={item.path}
                                className="text-white no-underline text-lg p-4 rounded-xl transition-all duration-300 hover:bg-primary/20 hover:text-primary flex items-center gap-3"
                                onClick={() => setSidebarOpen(false)}
                            >
                                <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                                {item.name}
                            </Link>
                        </li>
                    ))}
                    {user && (
                        <li className="mb-4">
                            <button
                                onClick={() => {
                                    // Handle logout
                                    setSidebarOpen(false);
                                }}
                                className="text-white no-underline text-lg p-4 rounded-xl transition-all duration-300 hover:bg-red-500/20 hover:text-red-300 flex items-center gap-3 w-full text-left"
                            >
                                <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5" />
                                Sign Out
                            </button>
                        </li>
                    )}
                </ul>
            </div>

            {/* Search Overlay */}
            {searchOpen && (
                <div
                    className="fixed inset-0 bg-black/80 flex justify-center items-start pt-24 z-[999]"
                    onClick={() => setSearchOpen(false)}
                >
                    <div
                        className="w-11/12 max-w-2xl relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full p-4 md:p-5 text-lg border-none rounded-full bg-white/10 text-white backdrop-blur-lg placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-primary pl-12"
                                placeholder="Search movies, TV shows, anime..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                            />
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5"
                            />
                            <button
                                onClick={() => setSearchOpen(false)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                        <div className="mt-5 bg-black/90 rounded-2xl p-5 max-h-[400px] overflow-y-auto glass-dark">
                            {searchResults.length === 0 && searchQuery && (
                                <div className="text-white/70 p-3">No results found</div>
                            )}
                            {searchResults.map(r => (
                                <div
                                    key={r}
                                    className="text-white p-3 cursor-pointer hover:bg-white/10 rounded transition-colors"
                                    onClick={() => {
                                        playVideo();
                                        setSearchOpen(false);
                                        navigate('/');
                                    }}
                                >
                                    {r}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Video Player Overlay */}
            {videoOpen && (
                <div
                    className="fixed inset-0 bg-black/90 flex justify-center items-center z-[2000]"
                    onClick={(e) => { if (e.target === e.currentTarget) closeVideo(); }}
                >
                    <div className="w-11/12 max-w-5xl aspect-video bg-black rounded-2xl relative">
                        <button
                            className="absolute -top-10 right-0 bg-transparent border-none text-white text-2xl cursor-pointer p-2 hover:text-primary transition-colors"
                            onClick={closeVideo}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        <video ref={mainVideoRef} controls className="w-full h-full rounded-2xl">
                            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="pt-16">
                <Outlet context={{ playVideo }} />
            </main>

            {/* Footer */}
            <footer className="bg-black/90 py-12 mt-20 px-4 text-center">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8">
                        {['About Us', 'Help Center', 'Terms of Service', 'Privacy Policy', 'Contact Support', 'Careers', 'Press'].map((link) => (
                            <a
                                key={link}
                                href={`#${link.toLowerCase().replace(' ', '-')}`}
                                className="text-gray-300 no-underline transition-colors duration-300 hover:text-primary"
                            >
                                {link}
                            </a>
                        ))}
                    </div>
                    <p className="text-gray-400 text-sm md:text-base">
                        &copy; 2025 Dart Enterprises. All rights reserved. Made with ❤️ for entertainment lovers.
                    </p>
                </div>
            </footer>
        </div>
    );
}