//Perfectly working code 

import React, { useState, useEffect, useContext, useRef } from "react";
import { Plus, Minus } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const defaultMeals = {
  Monday: { breakfast: "", lunch: "", dinner: "" },
  Tuesday: { breakfast: "", lunch: "", dinner: "" },
  Wednesday: { breakfast: "", lunch: "", dinner: "" },
  Thursday: { breakfast: "", lunch: "", dinner: "" },
  Friday: { breakfast: "", lunch: "", dinner: "" },
  Saturday: { breakfast: "", lunch: "", dinner: "" },
  Sunday: { breakfast: "", lunch: "", dinner: "" },
};

const MealPlanner = () => {
  const { user, token } = useContext(AuthContext);
  const [meals, setMeals] = useState(defaultMeals);
  const [expandedDay, setExpandedDay] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ref to hold timeout id for debounce
  const saveTimeout = useRef(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


  useEffect(() => {
    if (!user || !token) {
      setLoading(false);
      return;
    }

    const fetchCurrentMealPlan = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/meal-plans/current`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        if (res.ok && data.data && data.data.mealPlan) {
          setMeals(data.data.mealPlan.meals);
        } else {
          setMeals(defaultMeals);
        }
      } catch (error) {
        console.error("Error fetching current meal plan:", error);
        setMeals(defaultMeals);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentMealPlan();
  }, [user, token]);

  // Function to save meal plan to backend
  const saveMealPlan = async (updatedMeals) => {
    if (!user || !token) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/meal-plans/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ meals: updatedMeals }),
      });

      if (!res.ok) {
        const data = await res.json();
        console.error("Failed to save meal plan:", data.message);
      }
    } catch (error) {
      console.error("Error saving meal plan:", error);
    }
  };

  const handleChange = (day, mealType, value) => {
    setMeals((prevMeals) => {
      const updatedMeals = {
        ...prevMeals,
        [day]: {
          ...prevMeals[day],
          [mealType]: value,
        },
      };

      // Clear previous timeout
      if (saveTimeout.current) clearTimeout(saveTimeout.current);

      // Debounce save: wait 1 second after last change before saving
      saveTimeout.current = setTimeout(() => {
        saveMealPlan(updatedMeals);
      }, 1000);

      return updatedMeals;
    });
  };

  const toggleDay = (day) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  if (loading) return <p className="text-center mt-8">Loading current meal plan...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2 text-indigo-800 animate-fade-in-down">
            Weekly Meal Planner
          </h2>
          <p className="text-center text-indigo-500 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Plan your meals for the week ahead
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.keys(meals).map((day, index) => (
            <div
              key={day}
              className={`bg-white rounded-2xl p-6 shadow-lg transition-all duration-500 overflow-hidden ${
                expandedDay === day ? "ring-2 ring-indigo-400" : "hover:shadow-xl"
              } animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-between items-center cursor-pointer mb-4" onClick={() => toggleDay(day)}>
                <h3 className="text-xl font-semibold text-indigo-600">{day}</h3>
                <button className="p-1 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors">
                  {expandedDay === day ? <Minus size={18} /> : <Plus size={18} />}
                </button>
              </div>

              <div
                className={`space-y-4 transition-all duration-500 ${
                  expandedDay === day ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                {["breakfast", "lunch", "dinner"].map((mealType) => (
                  <div key={mealType} className="group">
                    <label className="block text-sm font-medium text-gray-600 mb-1 capitalize transition-colors duration-300 group-hover:text-indigo-500">
                      {mealType}
                    </label>
                    <input
                      type="text"
                      value={meals[day][mealType]}
                      onChange={(e) => handleChange(day, mealType, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all duration-300 placeholder-gray-300 focus:outline-none focus:scale-[1.02]"
                      placeholder={`What's for ${mealType}?`}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealPlanner;

