import { NavLink, Outlet } from "react-router";

function Nav() {
	return (
		<>
			<nav>
				<NavLink to="/">Home</NavLink>
				<NavLink to="/spinner">Spinner</NavLink>
			</nav>

			<Outlet />
		</>
	);
}

export default Nav;
