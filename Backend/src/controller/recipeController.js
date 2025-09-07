const Recipe = require('../models/Recipe');

// Create a new recipe

const createRecipe = async (req, res) => {
  try {
    let recipes;

    if (Array.isArray(req.body)) {
      // If request body is an array -> insert many (ignore duplicates)
      const uniqueData = [];
      for (const item of req.body) {
        const exists = await Recipe.findOne({ name: item.name });
        if (!exists) {
          uniqueData.push(item);
        }
      }

      if (uniqueData.length > 0) {
        recipes = await Recipe.insertMany(uniqueData);
      } else {
        return res.status(400).json({ message: "All recipes already exist" });
      }
    } else {
      // If request body is a single object -> create one
      const exists = await Recipe.findOne({ name: req.body.name });
      if (exists) {
        return res.status(400).json({ message: "Recipe already exists" });
      }

      const recipe = new Recipe(req.body);
      await recipe.save();
      recipes = recipe;
    }

    res.status(201).json({ message: "Recipe(s) created successfully", recipes });
  } catch (error) {
    console.error("❌ Error creating recipe:", error);
    res.status(400).json({ message: error.message });
  }
};

// Get all recipes
const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).send(recipes);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Get a recipe by ID   
const getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({message: 'Recipe not found'});
        }
        res.status(200).send(recipe);
    } catch (error) {
        res.status(500).json({message: error.message});
    }

};

// const createRecipe = async (req, res) => {
//   try {
//     const { name, image, description, youtubeLink } = req.body;
    
//     // Check if recipe already exists
//     const existingRecipe = await Recipe.findOne({ name });
//     if (existingRecipe) {
//       return res.status(400).json({ message: "Recipe already exists" });
//     }
    
//     // Create new recipe with user ID
//     const recipe = new Recipe({
//       name,
//       image,
//       description,
//       youtubeLink,
//       createdBy: req.user._id
//     });
    
//     await recipe.save();
//     res.status(201).json({ message: "Recipe created successfully", recipe });
//   } catch (error) {
//     console.error("❌ Error creating recipe:", error);
//     res.status(400).json({ message: error.message });
//   }
// };

// // Get all recipes (with optional user filtering)
// const getAllRecipes = async (req, res) => {
//   try {
//     let filter = {};
//     if (req.query.userId) {
//       filter.createdBy = req.query.userId;
//     }
    
//     const recipes = await Recipe.find(filter).populate('createdBy', 'name email');
//     res.status(200).send(recipes);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



module.exports = {
    createRecipe,
    getAllRecipes,
    getRecipeById
};