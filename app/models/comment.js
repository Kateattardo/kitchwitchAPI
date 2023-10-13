const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  recipeId: {
    type: Number,
    ref: 'Recipe',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },

}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
