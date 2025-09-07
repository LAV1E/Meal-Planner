import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext.jsx";

const RecipeCards = ({ query , refreshTrigger}) => {
  const scrollRef = useRef(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
   //const { darkMode } = useDarkMode();



  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  // fetch recipes from backend
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/get-all-recipes`);
        const data = await response.json();
        console.log("Fetched recipes:", data);

        if (Array.isArray(data) && data.length > 0) {
          setRecipes(data);
        } else {
          setRecipes([]);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [refreshTrigger]);

  // filter logic
  const filteredRecipes = recipes.filter((recipe) =>
    query.length >= 2
      ? recipe.name.toLowerCase().includes(query.toLowerCase())
      : true
  );

  // ✅ scroll function
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth - 100;

      if (direction === "left") {
        scrollRef.current.scrollTo({
          left: scrollLeft - scrollAmount,
          behavior: "smooth",
        });
      } else if (direction === "right") {
        scrollRef.current.scrollTo({
          left: scrollLeft + scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };
  
  return (
      <div className="bg-white dark:bg-gray-900 text-black dark:text-white">
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-blue-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-5xl font-extrabold text-center mb-4 text-indigo-700 tracking-tight">
          Delicious Recipes
        </h2>
        <p className="text-center text-indigo-500 mb-12 text-lg">
          Discover and plan your meals with our curated recipes
        </p>

        {/* Cards Wrapper */}
        {loading ? (
          <p className="text-center text-indigo-500 font-semibold">Loading...</p>
        ) : (
          <div ref={scrollRef} className="flex gap-6 overflow-hidden scroll-smooth">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe) => (
               <div
  key={recipe._id}
  className="min-w-[250px] bg-white rounded-2xl p-6 shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-200 flex flex-col min-h-[420px]"
>
  <img
    src={recipe.image}
    alt={recipe.name}
    className="h-44 w-full object-cover rounded-xl mb-5"
  />

  <h3 className="font-bold text-xl text-gray-800 mb-2">{recipe.name}</h3>

  <p className="text-gray-600 mb-3 flex-grow">{recipe.description}</p>

  <a
    href={recipe.youtubeLink}
    target="_blank"
    rel="noopener noreferrer"
    className="mt-auto w-full block text-center bg-gradient-to-r from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
  >
    🎥 Watch Recipe
  </a>
</div>

              ))
            ) : (
              <p className="text-center text-red-500 font-semibold w-full">
                No recipes found 🍽️
              </p>
            )}
          </div>
        )}

         {/* Navigation Arrows - Only show if there are recipes */}
        {filteredRecipes.length > 4 && (
          <div className="flex justify-center mt-12 space-x-6">
            <button
              onClick={() => scroll("left")}
              className="p-4 bg-white rounded-full shadow-lg hover:shadow-xl hover:bg-indigo-50 transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              aria-label="Scroll left"
            >
              <ChevronLeft size={26} className="text-indigo-600" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-4 bg-white rounded-full shadow-lg hover:shadow-xl hover:bg-indigo-50 transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              aria-label="Scroll right"
            >
              <ChevronRight size={26} className="text-indigo-600" />
            </button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default RecipeCards;
