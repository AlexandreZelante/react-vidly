import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Movie from "./movie";

class Movies extends Component {
    state = {
        movies: []
    };

    componentDidMount() {
        this.setState({ movies: getMovies() });
    }

    handleDelete = movie => {
        const movies = [...this.state.movies];
        const newMovies = movies.filter(nmovie => nmovie._id !== movie);
        this.setState({ movies: newMovies });
    };

    handleLike = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    };

    render() {
        const { movies } = this.state;

        if (movies.length === 0) {
            return <h1>No movies available</h1>;
        } else {
            return (
                <div>
                    <h1>Showing {movies.length} movies in the database</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Genre</th>
                                <th>Stock</th>
                                <th>Rate</th>
                                <th />
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {movies.map(movie => {
                                return (
                                    <Movie
                                        key={movie._id}
                                        _id={movie._id}
                                        title={movie.title}
                                        genre={movie.genre.name}
                                        stock={movie.numberInStock}
                                        rate={movie.dailyRentalRate}
                                        onDelete={this.handleDelete}
                                        liked={movie.liked}
                                        handleLike={() =>
                                            this.handleLike(movie)
                                        }
                                    />
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

export default Movies;
