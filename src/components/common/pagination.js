import React from 'react';
import range from 'lodash/range';
import PropTypes from 'prop-types';

const Pagination = props => {
	const { totalMovies, pageSize, currentPage, onPageChange } = props;
	const pagesCount = Math.ceil(totalMovies / pageSize);

	// Don't show pagination for just 1 page
	if (pagesCount === 1) return null;
	const pages = range(1, pagesCount + 1);

	return (
		<nav>
			<ul className="pagination">
				{pages.map(page => (
					<li
						className={page === currentPage ? 'page-item active' : 'page-item'}
						key={page}
					>
						<a className="page-link" onClick={() => onPageChange(page)}>
							{page}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};

Pagination.propTypes = {
	totalMovies: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
