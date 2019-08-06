import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Movie from "./movie";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";

class Movies extends Component {
    state = {
        movies: [],
        pageSize: 4,
        currentPage: 1,
        genres: []
    };

    componentDidMount() {
        const genres = [{ name: "All genres" }, ...getGenres()];
        this.setState({ movies: getMovies(), genres });
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

    handleGenreSelect = genre => {
        this.setState({ selectedGenre: genre, currentPage: 1 });
    };

    render() {
        const {
            movies: allMovies,
            pageSize,
            currentPage,
            selectedGenre
        } = this.state;

        if (allMovies.length === 0) {
            return <h1>No movies available</h1>;
        } else {
            const filtered =
                selectedGenre && selectedGenre._id
                    ? allMovies.filter(m => m.genre._id === selectedGenre._id)
                    : allMovies;
            const movies = paginate(filtered, currentPage, pageSize);

            return (
                <div className="row">
                    <div className="col-2">
                        <ListGroup
                            items={this.state.genres}
                            selectedItem={this.state.selectedGenre}
                            onItemSelect={this.handleGenreSelect}
                        />
                    </div>
                    <div className="col">
                        <h1>
                            Showing {filtered.length} movies in the database
                        </h1>
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
                            itemsCount={filtered.length}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange}
                        />
                    </div>
                </div>
            );
        }
    }
}

export default Movies;
