const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  note: {
    type: String,
    // required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  rating: {
    type: Number,
    min: 1,
    max:5,
  },
})

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
  }, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);
module.exports = mongoose.model('Comment', commentSchema);

