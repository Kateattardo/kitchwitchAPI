const mongoose = require('mongoose');
//comment is subdocument
//each comment with belong to 1 recipe
//1 to many

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
}, { timestamps: true})


module.exports = mongoose.model('Comment', commentSchema)
