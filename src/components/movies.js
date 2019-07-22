import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Like from './common/like';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import { paginate } from '../utils/paginate';

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 4,
		currentPage: 1,
	};

	componentDidMount() {
		// getMovies behaves like the database
		this.setState({ movies: getMovies(), genres: getGenres() });
	}

	handleDelete = movieId => {
		const movies = this.state.movies.filter(m => m._id !== movieId);

		this.setState({ movies });
	};

	handleLike = movie => {
		// const likeMovie = this.state.movies.map(movie => {
		// 	if (movie._id === movieId) {
		// 		movie.liked = true;
		// 	}
		// 	return movie;
		// });
		// this.setState({ movies: likeMovie });

		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;

		this.setState({ movies });
	};

	handlePageChange = page => {
		this.setState({ currentPage: page });
	};

	handleGenreSelect = genre => {
		console.log('genre', genre);
	};

	render() {
		const { length: totalMovies } = this.state.movies;
		const { pageSize, currentPage, movies, genres } = this.state;

		const paginateMovies = paginate(movies, currentPage, pageSize);

		if (!totalMovies) return <p>There are no movies in the database</p>;
		return (
			<div className="row">
				<div className="col-3">
					<ListGroup
						items={genres}
						onItemSelect={this.handleGenreSelect}
						textProperty="name"
						valueProperty="_id"
					/>
				</div>
				<div className="col">
					<p>Showing {totalMovies} movies in the database</p>
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
							{paginateMovies.map(movie => (
								<tr key={movie._id}>
									<td>{movie.title}</td>
									<td>{movie.genre.name}</td>
									<td>{movie.numberInStock}</td>
									<td>{movie.dailyRentalRate}</td>
									<td>
										<Like
											liked={movie.liked}
											onClick={() => this.handleLike(movie)}
										/>
									</td>
									<td>
										<button
											onClick={() => this.handleDelete(movie._id)}
											className="btn btn-danger btn-sm"
										>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<Pagination
						totalMovies={totalMovies}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={this.handlePageChange}
					/>
				</div>
			</div>
		);
	}
}

export default Movies;
