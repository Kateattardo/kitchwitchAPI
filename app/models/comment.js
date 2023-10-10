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
