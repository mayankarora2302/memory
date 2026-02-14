import { RELATIONSHIP_START_DATE } from './dateUtils';

export interface Episode {
    id: number;
    title: string;
    subtitle: string;
    theme: string;
    releaseDate: Date;
    coverImage: string;
    description: string;
    duration: string;
    color: string;
    soundtrack?: string;
    songName?: string;
}


export const episodes: Episode[] = [
    {
        id: 1,
        title: "Season 1: Love By Chance",
        subtitle: "The First Bloom",
        theme: "Soft, romantic, hopeful",
        releaseDate: new Date(2026, 1, 7),
        coverImage: '/assets/images/one.JPG',
        description: "Where it all began - the first petals of our love story unfold with tender moments and sweet beginnings.",
        duration: "12 min",
        color: "#FF6B9D",
        soundtrack: '/assets/audio/John_Legend_-_All_of_Me__Official_Video_(256k).mp3',
        songName: 'All of Me - John Legend',
    },
    {
        id: 2,
        title: "Season 2: The Bhawra Story",
        subtitle: "The Almost Proposal",
        theme: "Emotional, dramatic",
        releaseDate: new Date(2026, 1, 8),
        coverImage: '/assets/images/two.JPG',
        description: "A cinematic moment of vulnerability and courage - when words became promises and dreams took shape.",
        duration: "15 min",
        color: "#C41E3A",
        soundtrack: '/assets/audio/Elvis_Presley_-_Can_t_Help_Falling_In_Love__Official_Audio_(256k).mp3',
        songName: "Can't Help Falling in Love - Elvis Presley",
    },
    {
        id: 3,
        title: "Season 3: The Nashik Date",
        subtitle: "Sweet Like Us",
        theme: "Warm, cozy, indulgent",
        releaseDate: new Date(2026, 1, 9),
        coverImage: '/assets/images/three.JPG',
        description: "Indulge in the sweetness of our memories - every moment as delightful as the finest chocolate.",
        duration: "10 min",
        color: "#7B3F00",
        soundtrack: '/assets/audio/Alex_Warren_-_Carry_You_Home__Official_Video_(256k).mp3',
        songName: 'Carry You Home - Alex Warren',
    },
    {
        id: 4,
        title: "Season 4: Lonavala",
        subtitle: "Comfort Episode",
        theme: "Cute, comforting, wholesome",
        releaseDate: new Date(2026, 1, 10),
        coverImage: '/assets/images/four.JPG',
        description: "Wrapped in warmth and laughter - the cozy moments that make our love feel like home.",
        duration: "11 min",
        color: "#D4A574",
        soundtrack: '/assets/audio/FINNEAS_-_Let_s_Fall_in_Love_for_the_Night__Official_Video_(256k).mp3',
        songName: "Let's Fall in Love for the Night - FINNEAS",
    },
    {
        id: 5,
        title: "Season 5: Mumbai & Meri Jaan",
        subtitle: "After a leap of six months, they meet again. Mumbai becomes their backdrop",
        theme: "Emotional, deep, sincere",
        releaseDate: new Date(2026, 1, 11),
        coverImage: '/assets/images/five.JPG',
        description: "After a leap of six months, they meet again. Mumbai becomes their backdrop",
        duration: "14 min",
        color: "#4A5568",
        soundtrack: '/assets/audio/I_love_you__Full_song__Bodyguard_feat._Salman_khan,_Kareena_Kapoor(256k).mp3',
        songName: 'I Love You - Bodyguard',
    },
];

export function isEpisodeUnlocked(episode: Episode): boolean {
    const now = new Date();
    // Set 'now' to start of day for cleaner comparison if needed, 
    // but the current logic handles it well as releaseDate is also a Date object.
    return now >= episode.releaseDate;
}

export function getNextEpisode(currentId: number): Episode | null {
    return episodes.find(ep => ep.id === currentId + 1) || null;
}

export function getUnlockedEpisodes(): Episode[] {
    return episodes.filter(isEpisodeUnlocked);
}

export function getLockedEpisodes(): Episode[] {
    return episodes.filter(ep => !isEpisodeUnlocked(ep));
}

export function getCurrentEpisode(): Episode | null {
    const unlocked = getUnlockedEpisodes();
    return unlocked.length > 0 ? unlocked[unlocked.length - 1] : null;
}
