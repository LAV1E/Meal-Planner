// import React, { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// const AddRecipe = ({ onRecipeAdded }) => {
//   const { user, token, } = useContext(AuthContext);
//   const [formData, setFormData] = useState({
//     name: "",
//     image: "",
//     description: "",
//     youtubeLink: "",
//   });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);

//   const maxChars = 65; // ✅ Character limit

//   if (!user) return <p className="text-center mt-8">Please login to add a recipe.</p>;

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "description") {
//       if (value.length > maxChars) {
//         setError(`Description cannot exceed ${maxChars} characters.`);
//         return; // 🚫 prevent updating state if beyond limit
//       } else {
//         setError("");
//       }
//     }

//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     // Final validation before submit
//     if (formData.description.length > maxChars) {
//       setError(`Description cannot exceed ${maxChars} characters.`);
//       return;
//     }

//     setLoading(true);

//     try {
//       const body = {
//         ...formData,
//         createdBy: user.id, // send user id for createdBy
//       };

//       const res = await fetch("http://localhost:3000/api/create-recipe", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(body),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Failed to add recipe");
//       }

//       setSuccess("Recipe added successfully!");
//       setFormData({ name: "", image: "", description: "", youtubeLink: "" });
//       if (onRecipeAdded) onRecipeAdded();
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-8">
//       <h2 className="text-3xl font-bold mb-6 text-indigo-700">Add New Recipe</h2>

//       {error && <p className="text-red-600 mb-4">{error}</p>}
//       {success && <p className="text-green-600 mb-4">{success}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Recipe Name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//           className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
//         />
//         <input
//           type="url"
//           name="image"
//           placeholder="Image URL"
//           value={formData.image}
//           onChange={handleChange}
//           required
//           className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
//         />
//         <div>
//           <textarea
//             name="description"
//             placeholder={`Description (max ${maxChars} characters)`}
//             value={formData.description}
//             onChange={handleChange}
//             required
//             rows={3}
//             className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           />
//           <p className="text-sm text-gray-500 mt-1">
//             {formData.description.length}/{maxChars} characters
//           </p>
//         </div>
//         <input
//           type="url"
//           name="youtubeLink"
//           placeholder="YouTube Video Link"
//           value={formData.youtubeLink}
//           onChange={handleChange}
//           required
//           className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50"
//         >
//           {loading ? "Adding..." : "Add Recipe"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddRecipe;




import React, { useState } from "react";

const AddRecipe = ({ onRecipeAdded, user, token }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    youtubeLink: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const maxChars = 65;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


  if (!user || !token)
    return <p className="text-center mt-8">Please login to add a recipe.</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "description" && value.length > maxChars) {
      setError(`Description cannot exceed ${maxChars} characters.`);
      return;
    } else setError("");

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.description.length > maxChars) {
      setError(`Description cannot exceed ${maxChars} characters.`);
      return;
    }

    setLoading(true);

    try {
      const body = { ...formData, createdBy: user.id };

      const res = await fetch(`${API_BASE_URL}/api/create-recipe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to add recipe");

      setSuccess("Recipe added successfully!");
      setFormData({ name: "", image: "", description: "", youtubeLink: "" });

      if (onRecipeAdded) onRecipeAdded();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-8">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700">Add New Recipe</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Recipe Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="url"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <div>
          <textarea
            name="description"
            placeholder={`Description (max ${maxChars} characters)`}
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <p className="text-sm text-gray-500 mt-1">
            {formData.description.length}/{maxChars} characters
          </p>
        </div>
        <input
          type="url"
          name="youtubeLink"
          placeholder="YouTube Video Link"
          value={formData.youtubeLink}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Recipe"}
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
