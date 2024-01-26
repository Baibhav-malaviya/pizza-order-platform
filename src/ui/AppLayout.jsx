import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

function AppLayout() {
	const navigation = useNavigation();
	const isLoading = navigation.state === "loading";
	return (
		<div className="grid grid-rows-[auto_1fr_auto] h-screen bg-stone-200">
			{isLoading && <Loader />}
			<Header />
			{/* {isLoading ? <Loader /> : <Outlet />} */}
			<div className="overflow-y-scroll md:mx-auto">
				<main className="md:min-w-[600px]">
					<Outlet />
				</main>
			</div>
			<CartOverview />
		</div>
	);
}

export default AppLayout;
