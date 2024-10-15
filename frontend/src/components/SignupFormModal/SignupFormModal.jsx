import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			setErrors({});
			return dispatch(
				sessionActions.signup({
					email,
					username,
					firstName,
					lastName,
					password,
				})
			)
				.then(closeModal)
				.catch(async (res) => {
					const data = await res.json();
					if (data?.errors) {
						setErrors(data.errors);
					}
				});
		}
		return setErrors({
			confirmPassword:
				'Confirm Password field must be the same as the Password field',
		});
	};

	const isDisabled =
		email.length < 1 ||
		username.length < 4 ||
		firstName.length < 1 ||
		lastName.length < 1 ||
		password.length < 6 ||
		confirmPassword.length < 6;

	return (
		<div className="modal-box">
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					required
					placeholder="First Name"
				/>
				{errors.firstName && <p>{errors.firstName}</p>}
				<input
					type="text"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					required
					placeholder="Last Name"
				/>
				{errors.lastName && <p>{errors.lastName}</p>}
				<input
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					placeholder="Email"
				/>
				{errors.email && <p>{errors.email}</p>}
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
					placeholder="Username"
				/>
				{errors.username && <p>{errors.username}</p>}
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					placeholder="Password"
				/>
				{errors.password && <p>{errors.password}</p>}
				<input
					type="password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
					placeholder="Confirm Password"
				/>
				{errors.confirmPassword && <p>{errors.confirmPassword}</p>}
				<button type="submit" disabled={isDisabled}>
					Sign Up
				</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
