export interface PaginationProps {
	className?: string;
}

const Pagination: React.FunctionComponent<PaginationProps> = ({
	children,
	className = "",
}) => {
	return (
		<nav className={`image-gallery-pagination ${className}`.trim()}>
			{children}
		</nav>
	);
};

export default Pagination;
