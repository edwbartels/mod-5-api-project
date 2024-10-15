import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postSpot } from '../../../store/spots';
// import { getUser } from '../../../store/selectors';
import validations from './validations';
import './CreateSpot.css';

const CreateSpot = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// const currentUser = getUser();

	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [country, setCountry] = useState('');
	const [description, setDescription] = useState('');
	const [name, setName] = useState('');
	const [imageOne, setImageOne] = useState('');
	const [price, setPrice] = useState('');
	const [state, setState] = useState('');
	const [imageTwo, setImageTwo] = useState('');
	const [imageThree, setImageThree] = useState('');
	const [imageFour, setImageFour] = useState('');
	const [imageFive, setImageFive] = useState('');
	const [errors, setErrors] = useState({});
	const [hasSubmitted, setHasSubmitted] = useState(false);

	useEffect(() => {
		const newErrors = {
			address: validations.address(address),
			city: validations.city(city),
			country: validations.country(country),
			description: validations.description(description),
			image: validations.image(imageOne),
			name: validations.name(name),
			price: validations.price(price),
			state: validations.state(state),
		};

		Object.keys(newErrors).forEach((key) => {
			if (!newErrors[key]) delete newErrors[key];
		});

		setErrors(newErrors);
	}, [address, city, country, description, imageOne, name, price, state]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setHasSubmitted(true);

		if (Object.values(errors).length > 0) {
			return alert(`The following errors were found:
                
                ${errors.address ? '*' + errors.address : ''}
                ${errors.city ? '*' + errors.city : ''}
                ${errors.country ? '*' + errors.country : ''}
                ${errors.description ? '*' + errors.description : ''}
                ${errors.image ? '*' + errors.image : ''}
                ${errors.name ? '*' + errors.name : ''}
                ${errors.price ? '*' + errors.price : ''}
                ${errors.state ? '*' + errors.state : ''}`);
		}

		const spotInfo = {
			address,
			city,
			country,
			description,
			name,
			price,
			state,
			lat: null,
			lng: null,
		};

		const imageInfo = {
			imageOne: {
				url: imageOne,
				preview: true,
			},
			imageTwo: {
				url: imageTwo,
				preview: false,
			},
			imageThree: {
				url: imageThree,
				preview: false,
			},
			imageFour: {
				url: imageFour,
				preview: false,
			},
			imageFive: {
				url: imageFive,
				preview: false,
			},
		};
		Object.keys(imageInfo).forEach((key) => {
			if (!imageInfo[key].url) delete imageInfo[key];
		});

		dispatch(postSpot(spotInfo, imageInfo, navigate)).then(() => {
			setAddress('');
			setCity('');
			setCountry('');
			setDescription('');
			setImageOne('');
			setName('');
			setPrice('');
			setState('');
			setImageTwo('');
			setImageThree('');
			setImageFour('');
			setImageFive('');
			setErrors({});
			setHasSubmitted(false);
		});

		setAddress('');
		setCity('');
		setCountry('');
		setDescription('');
		setImageOne('');
		setName('');
		setPrice('');
		setState('');
		setImageTwo('');
		setImageThree('');
		setImageFour('');
		setImageFive('');
		setErrors({});
		setHasSubmitted(false);
	};

	return (
		<div className="create-spot-page">
			<div className="create-spot-container">
				<div className="create-spot-header">
					<h2>Create a New Spot</h2>
					<h4>Where&apos;s your place located?</h4>
					<p className="header-desc">
						Guests will only get your exact address once they book a
						reservation.
					</p>
				</div>
				<form onSubmit={handleSubmit}>
					<section className="create-location">
						<label>
							Country
							{hasSubmitted && errors.country && (
								<p className="error">{errors.country}</p>
							)}
						</label>
						<input
							type="text"
							value={country}
							onChange={(e) => setCountry(e.target.value)}
							placeholder="Country"
							// required
						/>
						<label>
							Street Address
							{hasSubmitted && errors.address && (
								<p className="error">{errors.address}</p>
							)}
						</label>
						<input
							type="text"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							placeholder="Address"
							// required
						/>
						<div className="create-city-state">
							<div className="create-city">
								<label>
									City
									{hasSubmitted && errors.city && (
										<p className="error">{errors.city}</p>
									)}
								</label>
								<input
									type="text"
									value={city}
									onChange={(e) => setCity(e.target.value)}
									placeholder="City"
									// required
								/>
							</div>
							<div className="comma">,</div>
							<div className="create-state">
								<label>
									State
									{hasSubmitted && errors.state && (
										<p className="error">{errors.state}</p>
									)}
								</label>
								<input
									type="text"
									value={state}
									onChange={(e) => setState(e.target.value)}
									placeholder="State"
									// required
								/>
							</div>
						</div>
					</section>
					<hr></hr>
					<section>
						<h4>Describe your place to guests</h4>
						<p>
							Mention the best features of your space, any special amenities
							like fast wifi or parking, and what you love about the
							neighborhood.
						</p>
						<textarea
							name="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Please write at least 30 characters"
							// required
						/>
						{hasSubmitted && errors.description && (
							<p className="error">{errors.description}</p>
						)}
						<hr></hr>
					</section>
					<section>
						<h4>Create a title for your spot</h4>
						<p>
							Catch guests&apos; attention with a spot title that highlights
							what makes your place special.
						</p>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Name of your spot"
							// required
						/>
						{hasSubmitted && errors.name && (
							<p className="error">{errors.name}</p>
						)}
					</section>
					<hr></hr>
					<section>
						<h4>Set a base price for your spot</h4>
						<p>
							Competitive pricing can help your listing stand out and rank
							higher in search results.
						</p>
						<input
							type="number"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							placeholder="Price per night (USD)"
							// required
						/>
						{hasSubmitted && errors.price && (
							<p className="error">{errors.price}</p>
						)}
					</section>
					<hr></hr>
					<section>
						<h4>Liven up your spot with photos</h4>
						<p>Submit a link to at least one photo to publish your spot.</p>
						<input
							type="text"
							value={imageOne}
							onChange={(e) => setImageOne(e.target.value)}
							placeholder="Preview Image URL"
							// required
						/>
						{hasSubmitted && errors.image && (
							<p className="error">{errors.image}</p>
						)}

						<input
							type="text"
							value={imageTwo}
							onChange={(e) => setImageTwo(e.target.value)}
							placeholder="Image URL"
						/>
						<input
							type="text"
							value={imageThree}
							onChange={(e) => setImageThree(e.target.value)}
							placeholder="Image URL"
						/>
						<input
							type="text"
							value={imageFour}
							onChange={(e) => setImageFour(e.target.value)}
							placeholder="Image URL"
						/>
						<input
							type="text"
							value={imageFive}
							onChange={(e) => setImageFive(e.target.value)}
							placeholder="Image URL"
						/>
					</section>
					<hr></hr>
					<div className="submit">
						<button type="submit">Create Spot</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateSpot;
