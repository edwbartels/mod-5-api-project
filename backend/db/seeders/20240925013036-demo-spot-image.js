'use strict';
const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
	async up(queryInterface, Sequelize) {
		await SpotImage.bulkCreate(
			[
				{
					spotId: 1,
					url: 'https://via.placeholder.com/600x400?text=Image+1',
					preview: true,
				},
				{
					spotId: 1,
					url: 'https://via.placeholder.com/600x400?text=Image+2',
					preview: false,
				},
				{
					spotId: 1,
					url: 'https://via.placeholder.com/600x400?text=Image+3',
					preview: false,
				},
				{
					spotId: 1,
					url: 'https://via.placeholder.com/600x400?text=Image+4',
					preview: false,
				},
				{
					spotId: 1,
					url: 'https://via.placeholder.com/600x400?text=Image+5',
					preview: false,
				},
				{
					spotId: 2,
					url: 'https://via.placeholder.com/600x400?text=Image+6',
					preview: true,
				},
				{
					spotId: 2,
					url: 'https://via.placeholder.com/600x400?text=Image+7',
					preview: false,
				},
				{
					spotId: 2,
					url: 'https://via.placeholder.com/600x400?text=Image+8',
					preview: false,
				},
				{
					spotId: 2,
					url: 'https://via.placeholder.com/600x400?text=Image+9',
					preview: false,
				},
				{
					spotId: 2,
					url: 'https://via.placeholder.com/600x400?text=Image+10',
					preview: false,
				},
				{
					spotId: 3,
					url: 'https://via.placeholder.com/600x400?text=Image+11',
					preview: true,
				},
				{
					spotId: 3,
					url: 'https://via.placeholder.com/600x400?text=Image+12',
					preview: false,
				},
				{
					spotId: 3,
					url: 'https://via.placeholder.com/600x400?text=Image+13',
					preview: true,
				},
				{
					spotId: 3,
					url: 'https://via.placeholder.com/600x400?text=Image+14',
					preview: true,
				},
				{
					spotId: 3,
					url: 'https://via.placeholder.com/600x400?text=Image+15',
					preview: true,
				},
				{
					spotId: 4,
					url: 'https://via.placeholder.com/600x400?text=Image+16',
					preview: true,
				},
				{
					spotId: 4,
					url: 'https://via.placeholder.com/600x400?text=Image+17',
					preview: false,
				},
				{
					spotId: 4,
					url: 'https://via.placeholder.com/600x400?text=Image+18',
					preview: false,
				},
				{
					spotId: 4,
					url: 'https://via.placeholder.com/600x400?text=Image+19',
					preview: false,
				},
				{
					spotId: 4,
					url: 'https://via.placeholder.com/600x400?text=Image+20',
					preview: false,
				},
				{
					spotId: 5,
					url: 'https://via.placeholder.com/600x400?text=Image+21',
					preview: true,
				},
				{
					spotId: 5,
					url: 'https://via.placeholder.com/600x400?text=Image+22',
					preview: false,
				},
				{
					spotId: 5,
					url: 'https://via.placeholder.com/600x400?text=Image+23',
					preview: false,
				},
				{
					spotId: 5,
					url: 'https://via.placeholder.com/600x400?text=Image+24',
					preview: false,
				},
				{
					spotId: 5,
					url: 'https://via.placeholder.com/600x400?text=Image+25',
					preview: false,
				},
			],
			options
		);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = 'SpotImages';
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				url: {
					[Op.in]: [
						'https://example.com/spot1_image1.jpg',
						'https://example.com/spot1_image2.jpg',
						'https://example.com/spot2_image1.jpg',
						'https://example.com/spot3_image1.jpg',
					],
				},
			},
			{}
		);
	},
};
