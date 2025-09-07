// const express = require('express');
// const { 
//   getCurrentMealPlan, 
//   saveMealPlan, 
//   getMealPlanHistory 
// } = require('../controller/mealPlanController');
// const { protect } = require('../middleware/auth');

// const router = express.Router();

// router.use(protect); // All routes protected

// router.get('/current', getCurrentMealPlan);
// router.post('/save', saveMealPlan);
// router.get('/history', getMealPlanHistory);

// module.exports = router;


const express = require('express');
const router = express.Router();
const { getCurrentMealPlan, saveMealPlan, getMealPlanHistory } = require('../controller/mealPlanController');
const { protect } = require('../middleware/auth');

// All routes protected (user must be logged in)
router.get('/current', protect, getCurrentMealPlan);
router.post('/save', protect, saveMealPlan);
router.get('/history', protect, getMealPlanHistory);


module.exports = router;
