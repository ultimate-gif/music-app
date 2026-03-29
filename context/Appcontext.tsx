import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

/* ---------------- TYPES ---------------- */

export type Song = {
    id: string;
    title: string;
    artist: string;
    imageUrl?: string;
    duration?: number;
};

type AppContextType = {
    likedSongs: Song[];
    likeSong: (song: Song) => void;
    unlikeSong: (id: string) => void;

    currentSong: Song | null;
    setCurrentSong: (song: Song | null) => void;

    isPlaying: boolean;
    togglePlay: () => void;

    currentTime: number;
    setCurrentTime: (t: number) => void;

    duration: number;
    progress: number;

    playQueue: Song[];
    setPlayQueue: (queue: Song[]) => void;
    playNext: () => void;
    playPrev: () => void;
};

/* ---------------- CONTEXT ---------------- */

const AppContext = createContext<AppContextType | null>(null);

/* ---------------- PROVIDER ---------------- */

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [likedSongs, setLikedSongs] = useState<Song[]>([]);
    const [currentSong, setCurrentSongState] = useState<Song | null>(null);
    const [playQueue, setPlayQueue] = useState<Song[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    // ✅ FIXED HERE
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const duration = currentSong?.duration || 180;
    const progress = Math.min(currentTime / duration, 1);

    const setCurrentSong = (song: Song | null) => {
        setCurrentSongState(song);
        setCurrentTime(0);
        setIsPlaying(true);
    };

    const togglePlay = () => setIsPlaying(prev => !prev);

    useEffect(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);

        if (isPlaying && currentSong) {
            intervalRef.current = setInterval(() => {
                setCurrentTime(prev => {
                    if (prev >= duration) {
                        playNext();
                        return 0;
                    }
                    return prev + 1;
                });
            }, 1000);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isPlaying, currentSong?.id, duration]);

    /* ---------------- QUEUE ---------------- */

    const likeSong = (song: Song) => {
        setLikedSongs(prev => {
            if (prev.find(s => s.id === song.id)) return prev;
            return [...prev, song];
        });
    };

    const unlikeSong = (id: string) => {
        setLikedSongs(prev => prev.filter(s => s.id !== id));
    };

    const playNext = () => {
        setCurrentSongState(prev => {
            if (!prev || playQueue.length === 0) return prev;
            const index = playQueue.findIndex(s => s.id === prev.id);
            if (index === -1) return prev;
            const next = playQueue[(index + 1) % playQueue.length];
            setCurrentTime(0);
            setIsPlaying(true);
            return next;
        });
    };

    const playPrev = () => {
        setCurrentSongState(prev => {
            if (!prev || playQueue.length === 0) return prev;
            const index = playQueue.findIndex(s => s.id === prev.id);
            if (index === -1) return prev;
            const prevSong = playQueue[index === 0 ? playQueue.length - 1 : index - 1];
            setCurrentTime(0);
            setIsPlaying(true);
            return prevSong;
        });
    };

    return (
        <AppContext.Provider
            value={{
                likedSongs, likeSong, unlikeSong,
                currentSong, setCurrentSong,
                isPlaying, togglePlay,
                currentTime, setCurrentTime,
                duration, progress,
                playQueue, setPlayQueue,
                playNext, playPrev,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

/* ---------------- HOOK ---------------- */

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error('useApp must be used inside AppProvider');
    return context;
};