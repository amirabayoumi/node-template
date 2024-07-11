import query from '../config/db.js';

const recipeControllers = {
    getAllRecipes: async (req, res) => {
        try {
            const recipes = await query('SELECT * FROM recipes');
            res.status(200).json(recipes);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getOneRecipe: async (req, res) => {
        const { id } = req.params;
        try {
            const recipe = await query('SELECT * FROM recipes WHERE id = ?', [
                id
            ]);
            if (recipe.length === 0) {
                res.status(404).json({ message: 'Recipe not found' });
            } else {
                res.status(200).json(recipe[0]);
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    postRecipe: async (req, res) => {
        const { title, ingredients, instructions } = req.body;
        try {
            const result = await query(
                'INSERT INTO recipes (title, ingredients, instructions) VALUES (?, ?, ?)',
                [title, ingredients, instructions]
            );
            const newRecipe = {
                id: result.insertId,
                title,
                ingredients,
                instructions
            };
            res.status(201).json(newRecipe);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updateRecipe: async (req, res) => {
        const { id } = req.params;
        const { title, ingredients, instructions } = req.body;
        try {
            const result = await query(
                'UPDATE recipes SET title = ?, ingredients = ?, instructions = ? WHERE id = ?',
                [title, ingredients, instructions, id]
            );
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Recipe not found' });
            } else {
                res.status(200).json({ id, title, ingredients, instructions });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deleteRecipe: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await query('DELETE FROM recipes WHERE id = ?', [
                id
            ]);
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Recipe not found' });
            } else {
                res.status(200).json({
                    message: 'Recipe deleted successfully'
                });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};
    

export default recipeControllers;
