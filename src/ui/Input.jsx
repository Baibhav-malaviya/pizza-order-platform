import { useId } from "react";

function Input({
	children,
	children2,
	name,
	type,
	placeholder = "",
	label = "",
	className = "",
	bgColor = "#FFFFFF",
	width = "w-full",
	focus = true,
	onChange,
	value,
	...props
}) {
	const id = useId();
	return (
		<div
			className={` bg-inherit h-auto flex flex-col md:flex-row md:items-center md:justify-between space-y-2 ${width}`}
		>
			<div className="flex justify-between w-40 ">
				<label
					htmlFor={id}
					className={`h-auto font-medium text-base  cursor-pointer`}
				>
					{label}
				</label>
				{children2}
			</div>
			<input
				id={id}
				type={type}
				placeholder={placeholder}
				onChange={onChange}
				value={value}
				name={name}
				{...props}
				className={`h-10 rounded grow px-2 ${
					focus
						? " focus:shadow-md focus:outline-none focus:ring-1 focus:ring-primary-200 focus:ring-offset-1  "
						: " "
				} ${className}  ${bgColor} `}
			>
				{children}
			</input>
		</div>
	);
}

export default Input;
