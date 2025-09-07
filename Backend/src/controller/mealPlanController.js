const MealPlan = require('../models/MealPlan');

// Get current week's meal plan for user
exports.getCurrentMealPlan = async (req, res) => {
  try {
    const startOfWeek = getStartOfWeek(new Date());
    
    let mealPlan = await MealPlan.findOne({
      user: req.user._id,
      weekStartDate: startOfWeek
    });
    
    // If no plan exists for this week, create an empty one
    if (!mealPlan) {
      mealPlan = await MealPlan.create({
        user: req.user._id,
        weekStartDate: startOfWeek,
        meals: {
          Monday: { breakfast: '', lunch: '', dinner: '' },
          Tuesday: { breakfast: '', lunch: '', dinner: '' },
          Wednesday: { breakfast: '', lunch: '', dinner: '' },
          Thursday: { breakfast: '', lunch: '', dinner: '' },
          Friday: { breakfast: '', lunch: '', dinner: '' },
          Saturday: { breakfast: '', lunch: '', dinner: '' },
          Sunday: { breakfast: '', lunch: '', dinner: '' }
        }
      });
    }
    
    res.status(200).json({ status: 'success', data: { mealPlan } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Save or update meal plan for current week
exports.saveMealPlan = async (req, res) => {
  try {
    const { meals } = req.body;
    const startOfWeek = getStartOfWeek(new Date());
   console.log("Start of week:", startOfWeek);
    let mealPlan = await MealPlan.findOne({
      user: req.user._id,
      weekStartDate: startOfWeek,
    });

    if (mealPlan) {
      // Merge existing meals with incoming meals
      for (const day in meals) {
        if (!mealPlan.meals[day]) {
          mealPlan.meals[day] = { breakfast: '', lunch: '', dinner: '' };
        }
        for (const mealType in meals[day]) {
          if (meals[day][mealType] !== undefined) {
            mealPlan.meals[day][mealType] = meals[day][mealType];
          }
        }
      }
      await mealPlan.save();
    } else {
      mealPlan = await MealPlan.create({
        user: req.user._id,
        weekStartDate: startOfWeek,
        meals,
      });
    }

    res.status(200).json({ status: "success", data: { mealPlan } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get meal plan history for user
exports.getMealPlanHistory = async (req, res) => {
  try {
    const mealPlans = await MealPlan.find({ user: req.user._id })
      .sort({ weekStartDate: -1 })
      .limit(10); // Get last 10 weeks
    
    res.status(200).json({ status: 'success', data: { mealPlans } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper function to get start of week (Monday)
function getStartOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday as start of week
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

