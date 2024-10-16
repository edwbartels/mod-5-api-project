import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './ProfileButton.css';

function ProfileButton({ user }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();

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
			<button className="user-circle" onClick={toggleMenu}>
				<FaBars className="user-bars" />
				<FaUserCircle />
			</button>
			<div className={ulClassName} ref={ulRef}>
				{user ? (
					<>
						<li>Hello, {user.username}</li>
						<li>{user.email}</li>
						<hr className="dropdown-line"></hr>
						{/* <li className="dropddown-manage-list"> */}
						<button className="dropdown-manage" onClick={manageSpots}>
							Manage Spots
						</button>
						{/* </li> */}
						<hr className="dropdown-line"></hr>
						<li>
							<button className="logout-button" onClick={logout}>
								Log Out
							</button>
						</li>
					</>
				) : (
					<>
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
					</>
				)}
			</div>
		</>
	);
}

export default ProfileButton;
