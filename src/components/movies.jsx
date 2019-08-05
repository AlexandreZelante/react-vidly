import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Movie from "./movie";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class Movies extends Component {
    state = {
        movies: [],
        pageSize: 4,
        currentPage: 1
    };

    componentDidMount() {
        this.setState({ movies: getMovies() });
    }

    handleDelete = movie => {
        const movies = [...this.state.movies];
        const newMovies = movies.filter(nmovie => nmovie._id !== movie);
        this.setState({ movies: newMovies });
    };

    handlePageChange = page => {
        this.setState({ currentPage: page });
    };

    handleLike = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    };

    render() {
        const { movies: allMovies, pageSize, currentPage } = this.state;

        if (allMovies.length === 0) {
            return <h1>No movies available</h1>;
        } else {
            const movies = paginate(allMovies, currentPage, pageSize);
            return (
                <div>
                    <h1>Showing {allMovies.length} movies in the database</h1>
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
                    <Pagination
                        itemsCount={allMovies.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    />
                </div>
            );
        }
    }
}

export default Movies;
