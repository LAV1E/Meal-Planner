import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const MealPlanHistory = () => {
  const { user, token } = useContext(AuthContext);
  const [mealPlans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(true);


  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    if (!user || !token) return;

    const fetchHistory = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/meal-plans/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        console.log("Fetched meal plan history data:", data);

        if (res.ok) {
          // ✅ handle both array or nested object cases
          const plans =
            Array.isArray(data?.data)
              ? data.data
              : Array.isArray(data?.data?.mealPlans)
              ? data.data.mealPlans
              : [];

          setMealPlans(plans.slice(0, 10)); // only last 10 weeks
        } else {
          console.error(data.message || "Failed to fetch history");
        }
      } catch (error) {
        console.error("❌ Error fetching meal plan history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user, token]);

  if (loading)
    return <p className="text-center mt-8">Loading meal plan history...</p>;

  if (mealPlans.length === 0)
    return <p className="text-center mt-8">No meal plan history found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-8">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700">
        Meal Plan History (Last 10 Weeks)
      </h2>
     {mealPlans.map((plan) => {
    const weekStart = new Date(plan.weekStartDate).toLocaleDateString();
    return (
      <div key={plan._id} className="mb-8 border-b pb-4">
        <h3 className="text-xl font-semibold mb-2">
          Week Starting: {weekStart}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 text-sm">
          {plan.meals && Object.entries(plan.meals).map(([day, meals]) => (
            <div
              key={day}
              className="bg-indigo-50 p-3 rounded-lg shadow-inner"
            >
              <h4 className="font-semibold text-indigo-600 mb-1">{day}</h4>
              <p>
                <strong>Breakfast:</strong> {meals.breakfast || "—"}
              </p>
              <p>
                <strong>Lunch:</strong> {meals.lunch || "—"}
              </p>
              <p>
                <strong>Dinner:</strong> {meals.dinner || "—"}
              </p>
            </div>
          ))}
        {!plan.meals && <p>No meals data available for this week.</p>}
      </div>
    </div>
  );
})}

    </div>
  );
};

export default MealPlanHistory;
