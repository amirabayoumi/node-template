import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import recipeControllers from '../controllers/recipe.js';

const router = express.Router();

// GET all
router.get('/recipes', recipeControllers.getAllRecipes);

// GET one
router.get('/recipes/:id', recipeControllers.getOneRecipe);

// create
router.post('/recipes', verifyToken, recipeControllers.postRecipe);

// update
router.put('/recipes/:id', verifyToken, recipeControllers.updateRecipe);

// DELETE
router.delete('/recipes/:id', verifyToken, recipeControllers.deleteRecipe);

export default router;
