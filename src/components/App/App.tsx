
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";
import toast, { Toaster } from 'react-hot-toast';
import type { Movie } from "../../types/movie";
import { useState } from "react";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);


  async function handleSearch(query: string) {
    setMovies([]);
    setLoading(true);
    setError(false);

    try {
      const movies = await fetchMovies(query);

      if (movies.length === 0) {
        toast.error("No movies found for your request.");
        return;

      }
      setMovies(movies);
    } catch {
      toast.error("There was an error, please try again...");
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  function handleSelect(movie: Movie) {
    setSelectedMovie(movie);
  }

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {movies.length > 0 && <MovieGrid movies={movies} onSelect={handleSelect} />}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  )
}
