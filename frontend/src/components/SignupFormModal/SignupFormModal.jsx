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
			).then(closeModal);
			// .catch(async (res) => {
			// 	const data = await res.json();
			// 	if (data?.errors) {
			// 		setErrors(data.errors);
			// 	}
			// });
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
		confirmPassword.length < 1;

	return (
		<div data-testid="sign-up-form" className="modal-box">
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				{errors.firstName && (
					<p data-testid="first-name-error-message">{errors.firstName}</p>
				)}
				{errors.lastName && (
					<p data-testid="last-name-error-message">{errors.lastName}</p>
				)}
				{errors.email && (
					<p data-testid="email-error-message">{errors.email}</p>
				)}
				{errors.username && (
					<p data-testid="username-error-message">{errors.username}</p>
				)}
				{errors.password && (
					<p data-testid="password-error-message">{errors.password}</p>
				)}
				{errors.confirmPassword && (
					<p data-testid="confirm-password-error-message">
						{errors.confirmPassword}
					</p>
				)}
				<input
					data-testid="first-name-input"
					type="text"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					required
					placeholder="First Name"
				/>
				<input
					data-testid="last-name-input"
					type="text"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					required
					placeholder="Last Name"
				/>
				<input
					data-testid="email-input"
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					placeholder="Email"
				/>
				<input
					data-testid="username-input"
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
					placeholder="Username"
				/>
				<input
					data-testid="password-input"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					placeholder="Password"
				/>
				<input
					data-testid="confirm-password-input"
					type="password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
					placeholder="Confirm Password"
				/>
				<button
					data-testid="form-sign-up-button"
					type="submit"
					disabled={isDisabled}
				>
					Sign Up
				</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
