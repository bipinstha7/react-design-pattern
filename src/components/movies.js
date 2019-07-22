import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import orderBy from 'lodash/orderBy';

import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import { paginate } from '../utils/paginate';

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		selectedGenre: '',
		sortColumn: {
			path: 'title',
			order: 'asc',
		},
		pageSize: 4,
		currentPage: 1,
	};

	componentDidMount() {
		const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()];

		// getMovies behaves like the database
		this.setState({ movies: getMovies(), genres });
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
		this.setState({ selectedGenre: genre, currentPage: 1 });

		// const filterMovies = this.state.movies.filter(
		// 	movie => movie.genre._id !== genre._id
		// );
	};

	handleSort = path => {
		const sortColumn = { ...this.state.sortColumn };

		if (sortColumn.path === path) {
			sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
		} else {
			sortColumn.path = path;
			sortColumn.order = 'asc';
		}
		this.setState({ sortColumn });
	};

	render() {
		const { length: totalMovies } = this.state.movies;
		const {
			pageSize,
			currentPage,
			movies,
			genres,
			selectedGenre,
			sortColumn,
		} = this.state;

		const filteredMovies =
			selectedGenre && selectedGenre._id
				? movies.filter(movie => movie.genre._id === selectedGenre._id)
				: movies;

		const sortedMovies = orderBy(
			filteredMovies,
			[sortColumn.path],
			[sortColumn.order]
		);

		const paginateMovies = paginate(sortedMovies, currentPage, pageSize);

		if (!totalMovies) return <p>There are no movies in the database</p>;
		return (
			<div className="row">
				<div className="col-3">
					<ListGroup
						items={genres}
						onItemSelect={this.handleGenreSelect}
						selectedItem={selectedGenre}
						// textProperty="name"
						// valueProperty="_id"
					/>
				</div>
				<div className="col">
					<p>Showing {filteredMovies.length} movies in the database</p>
					<MoviesTable
						movies={paginateMovies}
						onLike={this.handleLike}
						onDelete={this.handleDelete}
						onSort={this.handleSort}
					/>
					<Pagination
						totalMovies={filteredMovies.length}
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
