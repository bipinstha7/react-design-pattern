import React from 'react';
import Like from './common/like';

const moviesTable = ({ movies, onLike, onDelete }) => {
	return (
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
				{movies.map(movie => (
					<tr key={movie._id}>
						<td>{movie.title}</td>
						<td>{movie.genre.name}</td>
						<td>{movie.numberInStock}</td>
						<td>{movie.dailyRentalRate}</td>
						<td>
							<Like liked={movie.liked} onClick={() => onLike(movie)} />
						</td>
						<td>
							<button
								onClick={() => onDelete(movie._id)}
								className="btn btn-danger btn-sm"
							>
								Delete
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default moviesTable;
