import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postSpot } from '../../../store/spots';
// import { getUser } from '../../../store/selectors';
import validations from './validations';

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
		<div>
			<h2>Create a New Spot</h2>
			<form onSubmit={handleSubmit}>
				<section>
					<h4>Where&apos; your place located?</h4>
					<div>
						Guests will only get your exact address once a reservation is
						booked.
					</div>
					<label>
						Country
						<input
							type="text"
							value={country}
							onChange={(e) => setCountry(e.target.value)}
							placeholder="United States of America"
							required
						/>
					</label>
					{hasSubmitted && errors.country && <p>{errors.country}</p>}
					<label>Street Address</label>
					<input
						type="text"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						placeholder="123 Disney Lane"
						required
					/>
					{hasSubmitted && errors.address && <p>{errors.address}</p>}

					<label>City</label>
					<input
						type="text"
						value={city}
						onChange={(e) => setCity(e.target.value)}
						placeholder="San Francisco"
						required
					/>
					{hasSubmitted && errors.city && <p>{errors.city}</p>}
					<label>State</label>
					<input
						type="text"
						value={state}
						onChange={(e) => setState(e.target.value)}
						placeholder="California"
						required
					/>
					{hasSubmitted && errors.state && <p>{errors.state}</p>}
				</section>
				<section>
					<h4>Describe your place to guests</h4>
					<div>
						Mention the best features of your space, any special amenities like
						fast wifi or parking, and what you love about the neighborhood.
					</div>
					<input
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Please write at least 30 characters"
						required
					/>
					{hasSubmitted && errors.description && <p>{errors.description}</p>}
				</section>
				<section>
					<h4>Create a title for your spot</h4>
					<div>
						Catch guests&apos; attention with a spot title that highlights what
						makes your place special.
					</div>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Name of your spot"
						required
					/>
					{hasSubmitted && errors.name && <p>{errors.name}</p>}
				</section>
				<section>
					<h4>Set a base price for your spot</h4>
					<div>
						Competitive pricing can help your listing stand out and rank higher
						in search results.
					</div>
					<input
						type="number"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						placeholder="Price per night (USD)"
						required
					/>
					{hasSubmitted && errors.price && <p>{errors.price}</p>}
				</section>
				<section>
					<h4>Liven up your spot with photos</h4>
					<div>Submit a link to at least one photo to publish your spot.</div>
					<input
						type="text"
						value={imageOne}
						onChange={(e) => setImageOne(e.target.value)}
						placeholder="Preview Image URL"
						required
					/>
					{hasSubmitted && errors.image && <p>{errors.image}</p>}

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
				<button type="submit">Create Spot</button>
			</form>
		</div>
	);
};

export default CreateSpot;
