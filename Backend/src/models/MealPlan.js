const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  weekStartDate: { type: Date, required: true },
  meals: {
    Monday: { breakfast: String, lunch: String, dinner: String },
    Tuesday: { breakfast: String, lunch: String, dinner: String },
    Wednesday: { breakfast: String, lunch: String, dinner: String },
    Thursday: { breakfast: String, lunch: String, dinner: String },
    Friday: { breakfast: String, lunch: String, dinner: String },
    Saturday: { breakfast: String, lunch: String, dinner: String },
    Sunday: { breakfast: String, lunch: String, dinner: String }
  },
  createdAt: { type: Date, default: Date.now }
});

// Create index for efficient querying
mealPlanSchema.index({ user: 1, weekStartDate: 1 }, { unique: true });

module.exports = mongoose.model('MealPlan', mealPlanSchema);