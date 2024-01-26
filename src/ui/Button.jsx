function Button({
	children,
	isSubmitting,
	type = "primary",
	onClick,
	className,
}) {
	const base = ` font-bold uppercase bg-yellow-500 rounded hover:bg-yellow-400 hover:scale-[1.05] transition  focus:ring focus:ring-yellow-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:grayscale ${className} `;

	const styles = {
		primary: base + " text-sm px-4 py-3 md:px-6 md:py-4",
		small: base + " text-xs px-3 py-2 md:px-4 md:py-3",
		round: base + " rounded-full text-xs px-2 py-1.5 md:px-3 md:py-1.5",
	};
	return (
		<button disabled={isSubmitting} className={styles[type]} onClick={onClick}>
			{children}
		</button>
	);
}

export default Button;
