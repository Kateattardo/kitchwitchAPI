//import dependencies
const express = require('express')
const passport = require('passport')

// pull in Mongoose model for ingredients
const Recipe = require('../models/recipe');


const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields');
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()
///////////////////////////////////
//routes go here

//create a recipe
//POST/recipe/recipe_id
router.post('/recipe', requireToken, removeBlanks, (req, res, next) => {
  const recipeData = req.body.recipe
  recipeData.owner = req.user.id;

  Recipe.create(recipeData)
    .then(recipe => res.status(201).json({ recipe }))
    .catch(next);
})

module.exports = router

