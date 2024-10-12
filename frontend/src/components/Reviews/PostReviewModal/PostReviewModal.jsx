import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../../context/Modal';
import * as reviewActions from '../../../store/reviews';
import './PostReviewModal.css';

const PostReviewModal = () => {
	const dispatch = useDispatch();
	const [comment, setComment] = useState('');
	const [stars, setStars] = useState('');
};
