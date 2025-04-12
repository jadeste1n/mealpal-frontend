import { Outlet } from "react-router-dom";
import BottomNav from "../components/general/BottomNav";

const MainLayout = () => {
	return (
		<>
			<div className="container mx-auto">
				<Outlet />
                <BottomNav />
			</div>
		</>
	);
};

export default MainLayout;
