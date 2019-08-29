import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
	const Logout = (event) => {
		localStorage.clear();
	};

	return (
		<nav>
			<NavLink to="/" onClick={Logout}>
				Log Out
			</NavLink>
		</nav>
	);
};

export default Nav;
