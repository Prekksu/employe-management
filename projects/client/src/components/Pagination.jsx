const Pagination = ({ currentPage, totalPage, onPageChange }) => {
	const pageNumbers = Array.from(
		{ length: totalPage },
		(_, index) => index + 1
	);

	return (
		<ul className="uk-pagination uk-flex-center" uk-margin="true">
			{pageNumbers.map((number) => (
				<li key={number} className={number === currentPage ? "uk-active" : ""}>
					<a href="#" onClick={() => onPageChange(number)}>
						{number}
					</a>
				</li>
			))}
		</ul>
	);
};
export default Pagination;
