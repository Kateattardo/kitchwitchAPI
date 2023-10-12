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
router.post('/recipeId/comment'), requireToken, removeBlanks, (req, res, next) => {
  const comment = req.body.comment;
  const comment.recipe = req.params.recipeId;
  comment.author = req.user.id;
  

  Comment.findById(commentId)
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
  const recipeId = req.params.recipeIdId
  const commentId = req.params.commentId

  Recipe.findById(commentId)
      .then(handle404)
      .then(comment => {
          const theComment = recipe.comment.id(commentId)
          requireOwnership(req, comment); 
          theComment.set(req.body.comment) 
          return comment.save();
      })
      .then(() => res.sendStatus(204))
      .catch(next);
});

//DELETE a comment
router.delete('/comment/:recipeId/:commentId', requireToken, removeBlanks, (req, res, next) => {
  const recipeId = req.params.recipeId
  const commentId = req.params.commentId
  Recipe.findById(recipeId)
      .then(handle404)
      .then(comment => {
        const theComment = recipe.comments.id(commentId)
        requireOwnership(req, comment);
        theComment.deleteOne()  
          return comment.save();
      })
      .then(() => res.sendStatus(204))
      .catch(next);
});

/////////////////////////////
////End of routes


module.exports = router
