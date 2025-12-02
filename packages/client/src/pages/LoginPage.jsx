import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (isLogin) {
            const result = await login(email, password);
            if (result.success) {
                navigate('/');
            } else {
                setError('Login failed');
            }
        } else {
            const result = await register({ email, password, username: email.split('@')[0] });
            if (result.success) {
                navigate('/');
            } else {
                setError('Registration failed');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-dark p-4">
            <div className="max-w-md w-full">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">
                        {isLogin ? 'Sign In' : 'Create Account'}
                    </h2>

                    {error && (
                        <div className="bg-red-500/20 border border-red-500 rounded p-3 mb-4">
                            <p className="text-red-300">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-300 mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 bg-white/10 border border-white/20 rounded text-white"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 bg-white/10 border border-white/20 rounded text-white"
                                required
                                minLength={6}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded transition-colors"
                        >
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-white/20">
                        <p className="text-gray-400 text-center">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-red-400 hover:text-red-300 font-medium"
                            >
                                {isLogin ? 'Sign up' : 'Sign in'}
                            </button>
                        </p>
                    </div>

                    <div className="mt-4">
                        <Link to="/" className="text-gray-400 hover:text-white text-sm block text-center">
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}