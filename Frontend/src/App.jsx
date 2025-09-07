

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx";
import SearchBar from "./components/SearchBar.jsx";
import RecipeCards from "./components/RecipeCards.jsx";
import MealPlanner from "./components/MealPlanner.jsx"; // fixed typo from MeelPlanner.jsx
import Footer from "./components/Footer.jsx"; 
import About from "./components/About.jsx";
import MealPlanHistory from "./components/MealPlanHistory.jsx";
import "./App.css";
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import AddRecipe from "./components/AddRecipe.jsx";

function App() {
  const [query, setQuery] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRecipeAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <Router>
      <Navbar  onRecipeAdded={handleRecipeAdded}/>
      <Routes>
        <Route path="/" element={
          <>
            <SearchBar query={query} setQuery={setQuery} />
            <RecipeCards query={query} refreshTrigger={refreshTrigger} />
            <MealPlanner />
           
            <About />
            <Footer />
          </>
        } />
        <Route path="/planner" element={<MealPlanner />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/recipes" element={
          <>
            
            <RecipeCards refreshTrigger={refreshTrigger} />
          </>
        } />
        <Route path="/meal-plan-history" element={<MealPlanHistory />} />
      </Routes>
    </Router>
  );
}

export default App;

