import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { getUserSpots } from '../../store/selectors';
import './ProfileButton.css';

function ProfileButton({ user }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();
	const userSpots = useSelector(getUserSpots);

	const toggleMenu = (e) => {
		e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
		setShowMenu(!showMenu);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = (e) => {
			if (!ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};

		document.addEventListener('click', closeMenu);

		return () => document.removeEventListener('click', closeMenu);
	}, [showMenu]);

	const closeMenu = () => setShowMenu(false);
	const manageSpots = (e) => {
		e.preventDefault();
		closeMenu();
		navigate(`user/manage/spots`);
	};
	const logout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logout(navigate));
		closeMenu();
	};

	const ulClassName = 'profile-dropdown' + (showMenu ? '' : ' hidden');

	return (
		<>
			<button
				data-testid="user-menu-button"
				className="user-circle"
				onClick={toggleMenu}
			>
				<FaBars className="user-bars" />
				<FaUserCircle />
			</button>
			<div className={ulClassName} ref={ulRef}>
				{user ? (
					<div data-testid="user-dropdown-menu">
						<li>Hello, {user.username}</li>
						<li>{user.email}</li>
						<hr className="dropdown-line"></hr>
						{userSpots?.length > 0 ? (
							<button className="dropdown-manage" onClick={manageSpots}>
								Manage Spots
							</button>
						) : (
							<button className="dropdown-manage" onClick={manageSpots}>
								Create a New Spot
							</button>
						)}
						<hr className="dropdown-line"></hr>
						<li>
							<button className="logout-button" onClick={logout}>
								Log Out
							</button>
						</li>
					</div>
				) : (
					<div data-testid="user-dropdown-menu">
						<li className="user-action">
							<OpenModalButton
								buttonText="Sign Up"
								onButtonClick={closeMenu}
								modalComponent={<SignupFormModal />}
							/>
						</li>
						<li className="user-action">
							<OpenModalButton
								buttonText="Log In"
								onButtonClick={closeMenu}
								modalComponent={<LoginFormModal />}
							/>
						</li>
					</div>
				)}
			</div>
		</>
	);
}

export default ProfileButton;
