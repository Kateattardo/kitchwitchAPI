const mongoose = require('mongoose')

const ingredientSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true
		},
		amount: {
			type: String,
			required: true,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			// required: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Ingredient', ingredientSchema)
