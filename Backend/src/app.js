


// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const mealPlanRoutes = require('./routes/mealPlanRoutes');
// const PlannerRoutes = require('./routes/recipeRoutes');
// const authRoutes = require('./routes/authRoutes');

// dotenv.config();

// const app = express();
// app.use(express.json());


// app.use('/api/meal-plans', mealPlanRoutes);

// // Enable CORS for frontend (port 5173 for Vite)
// app.use(cors({
//   origin: "http://localhost:5173",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URL)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch(err => console.error(err));

// // Routes
// app.use("/api", PlannerRoutes);
// // Auth routes

// app.use('/api/auth', authRoutes);
// app.get('/', (req, res) => {
//   res.send('API is running!');
// });


// module.exports = app;

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const mealPlanRoutes = require('./routes/mealPlanRoutes');
const PlannerRoutes = require('./routes/recipeRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
app.use(express.json());

// ✅ Enable CORS before defining routes
app.use(cors({
  origin: "*", // allow all origins
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Routes
app.use('/api/meal-plans', mealPlanRoutes);
app.use("/api", PlannerRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API is running!');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

module.exports = app;
