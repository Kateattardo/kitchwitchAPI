const express = require('express');
const passport = require('passport');
const axios = require('axios');
// const Recipe = require('../models/recipe'); 

const customErrors = require('../../lib/custom_errors');
const handle404 = customErrors.handle404;
const requireOwnership = customErrors.requireOwnership;
const removeBlanks = require('../../lib/remove_blank_fields');
const requireToken = passport.authenticate('bearer', { session: false });

const router = express.Router();


router.get('/complex-search', async (req, res) => {
    const ingredients = req.query.ingredients;
    try {
        const response = await axios.get(
            'https://api.spoonacular.com/recipes/complexSearch',
            {
                params: {
                    apiKey: process.env.SPOONACULAR_API_KEY,
                    includeIngredients: ingredients
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to fetch recipes from Spoonacular' });
    }
});

router.get('/recipe/:id', async (req, res) => {
    const recipeId = req.params.id;
    const url = `https://api.spoonacular.com/recipes/${recipeId}/information`
    try {
        const response = await axios.get(
            url,
            {
                params: {
                    apiKey: process.env.SPOONACULAR_API_KEY,
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to fetch recipes from Spoonacular' });
    }
});

module.exports = router;