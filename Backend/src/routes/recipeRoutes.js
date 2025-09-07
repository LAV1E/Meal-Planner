// const express = require('express');
// const router = express.Router();
// const { createRecipe, getAllRecipes, getRecipeById } = require('../controller/recipeController');


// //POST request to create a new recipe
// router.post("/create-recipe", createRecipe);
// // router.post("/create-recipe", async (req, res) => {
// //   try {
// //     console.log("📥 Raw body received:", req.body);
// //     const { name, image, description, youtubeLink } = req.body;

// //     // Debugging log 👇
// //     console.log("📥 Request body:", req.body);

// //     const recipe = new Recipe({
// //       name,
// //       image,
// //       description,
// //       youtubeLink,
// //     });

// //     await recipe.save();

// //     res.status(201).json({ message: "Recipe created successfully", recipe });
// //   } catch (error) {
// //     console.error("❌ Error creating recipe:", error);
// //     res.status(400).json({ message: error.message });
// //   }
// // });

// //GET request to fetch all recipes
// router.get("/get-all-recipes", getAllRecipes);


// router.get("/get-cardsDetails", (req, res) => {
//     res.send("Welcome to Planner Routes");
// });

// module.exports = router;
             

const express = require('express');
const { createRecipe, getAllRecipes, getRecipeById } = require('../controller/recipeController');
// const { protect } = require('../middleware/auth');

const router = express.Router();

router.post("/create-recipe", createRecipe);
router.get("/get-all-recipes", getAllRecipes);
router.get("/get-recipe/:id", getRecipeById);

module.exports = router;








