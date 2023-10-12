const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  sponnacularId: {
    type: Number,
    // required: true,
    unique: true,
  },
  title: {
    type: String,
    // required: true,
  },
  image: {
    type: String,
    // required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    // required: true
  },
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);


