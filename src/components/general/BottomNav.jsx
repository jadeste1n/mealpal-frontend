import {
	House,
	Notebook,
	Plus,
	CookingPot,
	CircleUserRound,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

/*<meta name="viewport" content="viewport-fit=cover">is required for responsivness of the dock in iOS.*/

const BottomNav = () => {
	const location = useLocation();
	const path = location.pathname;

	return (
		<div className="dock dock-sm z-40">
			<button className={path === "/" ? "dock-active" : ""}>
				<NavLink to="/">
					<House />
				</NavLink>
			</button>

			<button className={path === "/diary" ? "dock-active" : ""}>
				<NavLink to="/diary">
					<Notebook />
				</NavLink>
			</button>

			<button className={path === "/search" ? "dock-active" : ""}>
				<NavLink to="/search">
					<Plus />
				</NavLink>
			</button>

			<button className={path === "/recipes" ? "dock-active" : ""}>
				<NavLink to="/recipes">
					<CookingPot />
				</NavLink>
			</button>

			<button className={path === "/account" ? "dock-active" : ""}>
				<NavLink to="/account">
					<CircleUserRound />
				</NavLink>
			</button>
		</div>
	);
};

export default BottomNav;
