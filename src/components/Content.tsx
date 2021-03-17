import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { api } from '../services/api';
import { MovieCard } from './MovieCard';

interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}
interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function Content(props: MovieProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState([]);

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenre}`)
      .then((response) => {
        setMovies(response.data);
      });

    api.get<GenreResponseProps>(`genres/${selectedGenre}`).then((response) => {
      return setSelectedGenre(response.data);
    });
  }, [selectedGenre]);
  return (
    <div className="container">
      <header>
        <span className="category">
          Categoria:<span> {props.title}</span>
        </span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
  // Complete aqui
}
