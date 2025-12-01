// packages/client/src/pages/SettingsPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBell,
    faMoon,
    faLanguage,
    faClosedCaptioning,
    faChild,
    faSave,
    faVideo,
    faWifi
} from '@fortawesome/free-solid-svg-icons';

export default function SettingsPage() {
    const { user } = useAuth();
    const [settings, setSettings] = useState({
        notifications: true,
        darkMode: true,
        language: 'English',
        subtitles: true,
        parentalControl: false,
        autoPlay: true,
        videoQuality: '1080p',
        downloadQuality: '720p'
    });
    const [saved, setSaved] = useState(false);

    const handleChange = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
        setSaved(false);
    };

    const saveSettings = () => {
        // In a real app, save to backend
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const settingGroups = [
        {
            title: 'General',
            icon: faBell,
            settings: [
                { key: 'notifications', label: 'Notifications', type: 'toggle', icon: faBell },
                { key: 'darkMode', label: 'Dark Mode', type: 'toggle', icon: faMoon },
                { key: 'language', label: 'Language', type: 'select', options: ['English', 'Spanish', 'French', 'German'], icon: faLanguage },
            ]
        },
        {
            title: 'Playback',
            icon: faVideo,
            settings: [
                { key: 'autoPlay', label: 'Auto-play next episode', type: 'toggle', icon: faPlay },
                { key: 'videoQuality', label: 'Video Quality', type: 'select', options: ['Auto', '1080p', '720p', '480p'], icon: faVideo },
                { key: 'subtitles', label: 'Always show subtitles', type: 'toggle', icon: faClosedCaptioning },
            ]
        },
        {
            title: 'Downloads',
            icon: faDownload,
            settings: [
                { key: 'downloadQuality', label: 'Download Quality', type: 'select', options: ['720p', '480p', '360p'], icon: faWifi },
            ]
        },
        {
            title: 'Parental Controls',
            icon: faChild,
            settings: [
                { key: 'parentalControl', label: 'Enable Parental Controls', type: 'toggle', icon: faChild },
            ]
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8 text-white">Settings</h1>

            {saved && (
                <div className="mb-6 p-4 bg-green-900/30 border border-green-700 rounded-lg">
                    <p className="text-green-300">Settings saved successfully!</p>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {settingGroups.map((group) => (
                    <div key={group.title} className="bg-gray-900/50 rounded-2xl p-6 glass">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <FontAwesomeIcon icon={group.icon} />
                            {group.title}
                        </h2>

                        <div className="space-y-6">
                            {group.settings.map((setting) => (
                                <div key={setting.key} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <FontAwesomeIcon icon={setting.icon} className="text-gray-400 w-5 h-5" />
                                        <span className="text-white">{setting.label}</span>
                                    </div>

                                    {setting.type === 'toggle' ? (
                                        <button
                                            onClick={() => handleChange(setting.key, !settings[setting.key])}
                                            className={`w-12 h-6 rounded-full transition-colors ${settings[setting.key] ? 'bg-primary' : 'bg-gray-700'}`}
                                        >
                                            <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${settings[setting.key] ? 'translate-x-7' : 'translate-x-1'}`} />
                                        </button>
                                    ) : (
                                        <select
                                            value={settings[setting.key]}
                                            onChange={(e) => handleChange(setting.key, e.target.value)}
                                            className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-1"
                                        >
                                            {setting.options.map(option => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex justify-end">
                <button
                    onClick={saveSettings}
                    className="px-6 py-3 bg-gradient-primary text-white font-bold rounded-lg hover:scale-105 transition-transform flex items-center gap-2"
                >
                    <FontAwesomeIcon icon={faSave} />
                    Save Settings
                </button>
            </div>
        </div>
    );
}