const address = (address) => {
	return address ? '' : 'Address is required';
};

const city = (city) => {
	return city ? '' : 'City is required';
};

const country = (country) => {
	return country ? '' : 'Country is required';
};

const description = (description) => {
	return description.length >= 30
		? ''
		: 'Description needs 30 or more characters';
};
const image = (image) => {
	return image ? '' : 'Preview image is required.';
};
const name = (name) => {
	return name ? '' : 'Name is required';
};

const price = (price) => {
	return price > 0 ? '' : 'Price is required';
};

const state = (state) => {
	return state ? '' : 'State is required';
};

const validations = {
	address,
	city,
	country,
	description,
	image,
	name,
	price,
	state,
};

export default validations;
