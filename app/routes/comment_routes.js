const express = require('express');
const passport = require('passport');
const Comment = require('../models/comment');
const Recipe = require('../models/recipe');
const customErrors = require('../../lib/custom_errors');
const handle404 = customErrors.handle404;
const requireOwnership = customErrors.requireOwnership;
const removeBlanks = require('../../lib/remove_blank_fields');
const requireToken = passport.authenticate('bearer', { session: false });

const router = express.Router({ mergeParams: true });
//Routes go here


//Show for Comment
router.get('/', (req, res, next) => {
  Comment.find({ recipe: req.params.recipeId })
      .populate('author', 'username')
      .then(comments => res.status(200).json({ comments }))
      .catch(next);
});

//Show for single Comment
router.get('/:commentId', (req, res, next) => {
  Comment.findById(req.params.commentId)
      .populate('author', 'username')
      .then(handle404)
      .then(comment => res.status(200).json({ comment }))
      .catch(next);
});


// Create for Comment
//Post/recipeId/commentId
router.post('/recipeId/comment'), requireToken, (req, res, next) => {
  const commentData = req.body.comment;
  commentData.author = req.user.id;
  commentData.recipe = req.params.recipeId;

  Comment.findById(commentData)
      .then(handle404)
      .then(comment => {
        recipe.comments.push(comment)
        return comment.save()
      })
      .then(comment => res.status(201).json({ comment: comment }))
      .catch(next);
};

//UPDATE a comment
router.patch('/:commentId', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.comment.author;  
  Comment.findById(req.params.commentId)
      .then(handle404)
      .then(comment => {
          requireOwnership(req, comment);  
          return comment.updateOne(req.body.comment);
      })
      .then(() => res.sendStatus(204))
      .catch(next);
});

//DELETE a comment
router.delete('/:commentId', requireToken, (req, res, next) => {
  Comment.findById(req.params.commentId)
      .then(handle404)
      .then(comment => {
          requireOwnership(req, comment);  // Ensure the user owns the comment
          return comment.deleteOne();
      })
      .then(() => res.sendStatus(204))
      .catch(next);
});

/////////////////////////////
////End of routes


module.exports = router
