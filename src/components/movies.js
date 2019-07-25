import React, { Component } from 'react';
import orderBy from 'lodash/orderBy';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getMovies, deleteMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import SearchBox from './common/searchBox';
import { paginate } from '../utils/paginate';

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		selectedGenre: null,
		sortColumn: {
			path: 'title',
			order: 'asc',
		},
		searchQuery: '',
		pageSize: 4,
		currentPage: 1,
	};

	async componentDidMount() {
		const { data } = await getGenres();
		const genres = [{ _id: '', name: 'All Genres' }, ...data];

		const { data: movies } = await getMovies();
		this.setState({ movies, genres });
	}

	handleDelete = async movieId => {
		const originalMovies = this.state.movies;
		const movies = originalMovies.filter(m => m._id !== movieId);

		this.setState({ movies });

		try {
			await deleteMovie(movieId);
		} catch (error) {
			if (error.response && error.response.status === 404) {
				toast.error('This movie has already been deleted');
			}

			this.setState({ movies: originalMovies });
		}
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
		this.setState({ selectedGenre: genre, searchQuery: '', currentPage: 1 });

		// const filterMovies = this.state.movies.filter(
		// 	movie => movie.genre._id !== genre._id
		// );
	};

	handleSort = sortColumn => {
		this.setState({ sortColumn });
	};

	handleSearch = query => {
		this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
	};

	getPageData = () => {
		const {
			pageSize,
			currentPage,
			movies,
			selectedGenre,
			sortColumn,
			searchQuery,
		} = this.state;

		let filteredMovies = movies;

		if (searchQuery) {
			filteredMovies = movies.filter(movie =>
				movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
			);
		} else if (selectedGenre && selectedGenre._id) {
			filteredMovies = movies.filter(
				movie => movie.genre._id === selectedGenre._id
			);
		}

		const sortedMovies = orderBy(
			filteredMovies,
			[sortColumn.path],
			[sortColumn.order]
		);

		const paginateMovies = paginate(sortedMovies, currentPage, pageSize);

		return {
			totalMovies: filteredMovies.length,
			data: paginateMovies,
		};
	};

	render() {
		const {
			pageSize,
			currentPage,
			genres,
			selectedGenre,
			sortColumn,
			searchQuery,
		} = this.state;

		const { totalMovies, data } = this.getPageData();

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
					<Link
						to="/movies/new"
						className="btn btn-primary"
						style={{ marginBottom: 20 }}
					>
						New Movie
					</Link>
					<p>Showing {totalMovies} movies in the database</p>
					<SearchBox value={searchQuery} onChange={this.handleSearch} />
					<MoviesTable
						movies={data}
						onLike={this.handleLike}
						onDelete={this.handleDelete}
						onSort={this.handleSort}
						sortColumn={sortColumn}
					/>
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
