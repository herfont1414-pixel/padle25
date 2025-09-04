
export interface Player {
    id: string;
    name: string;
}

export interface Match {
    id: string;
    location: string;
    date: Date;
    organizer: Player;
    organizerPhone: string;
    players: Player[];
    playersNeeded: number; // Total players for the match, typically 4
}
