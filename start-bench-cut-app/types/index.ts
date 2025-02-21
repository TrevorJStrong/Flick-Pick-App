// Type for player statistics
type Stats = {
    interceptions: number;
    passingYards: number;
    touchdowns: number;
};

// Type for a player
type Player = {
    name: string;
    position: string;
    description: string;
    image: string;
    stats: Stats;
};

export { Player };