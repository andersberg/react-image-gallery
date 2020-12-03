export interface NavigationProps {
	className?: string;
}

const Navigation: React.FunctionComponent<NavigationProps> = ({
	children,
	className,
}) => {
	return (
		<nav className={`image-gallery-navigation ${className}`.trim()}>
			{children}
		</nav>
	);
};

export default Navigation;
