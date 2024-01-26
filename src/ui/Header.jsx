import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";
function Header() {
	return (
		<header className="flex items-center justify-between px-4 py-3 uppercase border font-p bg-yellow-500 border-b-2 sm:px-6 sm:py-5 border-stone-500">
			<Link to="/" className="tracking-widest">
				Fast react Pizza Co.
			</Link>
			<SearchOrder />
			<Username />
		</header>
	);
}

export default Header;
