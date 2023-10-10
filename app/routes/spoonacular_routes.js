const express = require('express');
const passport = require('passport');
// const axios = require('axios');
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
        const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
            params: {
                apiKey: 'YOUR_SPOONACULAR_API_KEY',
                includeIngredients: ingredients
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch recipes from Spoonacular' });
    }
});

module.exports = router;