import axios from "axios";
import type { Movie } from "../types/movie";
const API_KEY = import.meta.env.VITE_TMDB_TOKEN;
interface HttpResponse {
    results: Movie[];
}

export async function fetchMovies(query: string): Promise<Movie[]> {

    const response = await axios.get<HttpResponse>("https://api.themoviedb.org/3/search/movie", {
        params: {
            query
        },
        headers: {
            Authorization: `Bearer ${API_KEY}`,
        }
    });
    return response.data.results;
}