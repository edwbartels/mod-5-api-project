import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);
	const navigate = useNavigate();

	return (
		<div>
			<div className="nav-bar">
				<NavLink to="/">
					<img src="/lodgr-trans.png" alt="App Logo" className="logo" />
				</NavLink>
				<div className="nav-items">
					{sessionUser && (
						<NavLink to="/spots/create">
							<button>Create a New Spot</button>
						</NavLink>
					)}
					{isLoaded && <ProfileButton user={sessionUser} />}
				</div>
			</div>
			<hr className="nav-line"></hr>
		</div>
	);
}

export default Navigation;
