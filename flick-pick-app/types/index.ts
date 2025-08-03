type Movie = {
    title: string;
    year: string;
    genre: string;
    poster: string;
};

type MovieAction = 'own' | 'stream' | 'skip';

export type { Movie, MovieAction };
