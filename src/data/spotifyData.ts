export type Language = 'english' | 'hindi' | 'telugu';

export const SPOTIFY_PLAYLISTS: Record<Language, Record<string, string>> = {
    english: {
        angry: '37i9dQZF1DWZqd5JICZI0u', // Peaceful Piano
        default: '37i9dQZF1DXcBWIGoYBM5M', // Today's Top Hits
    },
    hindi: {
        angry: '37i9dQZF1DWTbX3R4Lh9zJ', // Hindi Chill
        default: '37i9dQZF1DX0XUZAe4Hr2V', // Bollywood Butter
    },
    telugu: {
        angry: '37i9dQZF1DX5cO1uP1j4q2', // Telugu Chill
        default: '37i9dQZF1DWWylE7aaeade', // Telugu Top 50
    },
};
