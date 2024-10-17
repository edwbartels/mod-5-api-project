import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
	const dispatch = useDispatch();
	const [credential, setCredential] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors({});
		return dispatch(sessionActions.login({ credential, password }))
			.then(closeModal)
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) {
					setErrors(data.errors);
				}
			});
	};

	const isDisabled = credential.length < 4 || password.length < 6;

	const handleDemoUser = (e) => {
		e.preventDefault();
		setErrors({});
		return dispatch(
			sessionActions.login({ credential: 'Demo-lition', password: 'password' })
		)
			.then(closeModal)
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) {
					setErrors(data.errors);
				}
			});
	};

	return (
		// <div className="modal-background">
		<div data-testid="login-modal" className="modal-box">
			<h1>Log In</h1>
			<form onSubmit={handleSubmit}>
				{errors.credential && <p>{errors.credential}</p>}
				<input
					data-testid="credential-input"
					type="text"
					value={credential}
					onChange={(e) => setCredential(e.target.value)}
					placeholder="Username or email"
					// required
				/>
				<input
					data-testid="password-input"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
					// required
				/>
				<button data-testid="login-button" type="submit" disabled={isDisabled}>
					Log In
				</button>
			</form>
			<a onClick={handleDemoUser}>Demo User</a>
		</div>
		// </div>
	);
}

export default LoginFormModal;
