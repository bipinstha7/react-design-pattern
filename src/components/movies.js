import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/like';
import Pagination from './common/pagination';

class Movies extends Component {
	state = {
		movies: [],
		pageSize: 4,
		currentPage: 1,
	};

	componentDidMount() {
		// getMovies behaves like the database
		const movies = getMovies();
		this.setState({ movies });
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

	render() {
		const { length: totalMovies } = this.state.movies;
		const { pageSize, currentPage } = this.state;

		if (!totalMovies) return <p>There are no movies in the database</p>;
		return (
			<React.Fragment>
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
						{this.state.movies.map(movie => (
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
			</React.Fragment>
		);
	}
}

export default Movies;
