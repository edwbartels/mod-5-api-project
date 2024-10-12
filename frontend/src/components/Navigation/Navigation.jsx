import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	return (
		<ul>
			<li>
				<NavLink to="/">
					<img src="/favicon.ico" alt="App Logo" className="logo" />
				</NavLink>
			</li>
			{sessionUser && (
				<NavLink to="/spots/create">
					<button>Create a New Spot</button>
				</NavLink>
			)}
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;
