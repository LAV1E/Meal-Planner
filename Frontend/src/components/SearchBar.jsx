

import React, { useState } from "react";
import { Search, X, Filter, Sparkles } from "lucide-react";

const SearchBar = ({ query, setQuery }) => {
  const [isFocused, setIsFocused] = useState(false);

  const clearSearch = () => {
    setQuery("");
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-blue-200/20"></div>
        <div className="absolute top-1/4 -right-20 w-32 h-32 rounded-full bg-indigo-200/30"></div>
        <div className="absolute bottom-0 left-1/4 w-24 h-24 rounded-full bg-purple-200/20"></div>
      </div>
      
      <div className="max-w-4xl mx-auto relative">
        {/* Section title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 flex items-center justify-center">
            Discover Amazing Recipes
            <Sparkles size={24} className="ml-2 text-yellow-500" />
          </h2>
          <p className="text-gray-600">Search through our collection of delicious recipes</p>
        </div>
        
        {/* Search container */}
        <div className="relative flex justify-center">
          <div className="relative flex items-center w-full max-w-2xl">
            {/* Search Icon */}
            <div className="absolute left-4 z-10">
              <Search 
                size={22} 
                className={`${isFocused ? 'text-indigo-600' : 'text-indigo-400'} transition-colors duration-300`} 
              />
            </div>
            
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search recipes by name, ingredients, or category..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full pl-12 pr-16 py-4 rounded-2xl border-2 border-indigo-100 shadow-lg focus:ring-4 focus:ring-indigo-200 focus:border-indigo-300 focus:outline-none text-gray-700 transition-all duration-500 bg-white/90 backdrop-blur-sm"
            />
            
            {/* Clear Button */}
            {query && (
              <button
                onClick={clearSearch}
                className="absolute right-12 p-1 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-all duration-300"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
            
            {/* Filter Button */}
            <button className="absolute right-4 p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center">
              <Filter size={18} className="text-white" />
              <span className="text-white text-sm font-medium ml-1">Filters</span>
            </button>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className={`absolute -top-8 -left-8 w-16 h-16 rounded-full bg-indigo-200/30 ${isFocused ? 'animate-ping' : ''}`}></div>
          <div className={`absolute -top-4 -right-4 w-8 h-8 rounded-full bg-blue-200/30 ${isFocused ? 'animate-ping' : ''}`} style={{ animationDelay: '0.2s' }}></div>
          <div className={`absolute -bottom-6 -left-4 w-12 h-12 rounded-full bg-purple-200/30 ${isFocused ? 'animate-ping' : ''}`} style={{ animationDelay: '0.4s' }}></div>
        </div>
   
      </div>
    </div>
  );
};

export default SearchBar;