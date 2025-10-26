"use client"

import { useState } from "react"
import { Search, Phone } from "lucide-react"

export default function FoodDatabasePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedFood, setSelectedFood] = useState(null)

  const foods = [
    // Indian Grains & Breads
    {
      name: "Basmati Rice",
      category: "Grains",
      gi: 68,
      sugar: "0.3g",
      calories: 130,
      protein: "2.7g",
      carbs: "28g",
      fiber: "0.4g",
      icon: "🍚",
      portion: "1 cup cooked",
    },
    {
      name: "Brown Rice",
      category: "Grains",
      gi: 68,
      sugar: "0.2g",
      calories: 111,
      protein: "2.6g",
      carbs: "23g",
      fiber: "1.8g",
      icon: "🍚",
      portion: "1 cup cooked",
    },
    {
      name: "Roti (Whole Wheat)",
      category: "Grains",
      gi: 52,
      sugar: "0.5g",
      calories: 104,
      protein: "3.4g",
      carbs: "20g",
      fiber: "3.4g",
      icon: "🫓",
      portion: "1 roti",
    },
    {
      name: "Naan Bread",
      category: "Grains",
      gi: 71,
      sugar: "1.2g",
      calories: 262,
      protein: "8.5g",
      carbs: "42g",
      fiber: "1.5g",
      icon: "🍞",
      portion: "1 naan",
    },
    {
      name: "Idli",
      category: "Grains",
      gi: 42,
      sugar: "0.8g",
      calories: 39,
      protein: "1.4g",
      carbs: "8g",
      fiber: "0.3g",
      icon: "🍚",
      portion: "1 idli",
    },
    {
      name: "Dosa",
      category: "Grains",
      gi: 55,
      sugar: "1.2g",
      calories: 133,
      protein: "2.6g",
      carbs: "26g",
      fiber: "0.5g",
      icon: "🥞",
      portion: "1 dosa",
    },
    {
      name: "Quinoa",
      category: "Grains",
      gi: 53,
      sugar: "1.6g",
      calories: 120,
      protein: "4.4g",
      carbs: "21g",
      fiber: "2.8g",
      icon: "🌾",
      portion: "1 cup cooked",
    },
    {
      name: "Millet (Bajra)",
      category: "Grains",
      gi: 71,
      sugar: "0.3g",
      calories: 119,
      protein: "3.6g",
      carbs: "23g",
      fiber: "1.3g",
      icon: "🌾",
      portion: "1 cup cooked",
    },

    // Indian Proteins & Legumes
    {
      name: "Chickpea Curry",
      category: "Proteins",
      gi: 28,
      sugar: "2.1g",
      calories: 269,
      protein: "15g",
      carbs: "45g",
      fiber: "12g",
      icon: "🍲",
      portion: "1 cup",
    },
    {
      name: "Lentil Dal",
      category: "Proteins",
      gi: 32,
      sugar: "1.8g",
      calories: 230,
      protein: "18g",
      carbs: "40g",
      fiber: "15.6g",
      icon: "🍲",
      portion: "1 cup",
    },
    {
      name: "Moong Dal",
      category: "Proteins",
      gi: 31,
      sugar: "2g",
      calories: 212,
      protein: "14.5g",
      carbs: "39g",
      fiber: "8.3g",
      icon: "🍲",
      portion: "1 cup cooked",
    },
    {
      name: "Kidney Beans",
      category: "Proteins",
      gi: 24,
      sugar: "0.3g",
      calories: 127,
      protein: "8.7g",
      carbs: "23g",
      fiber: "6.4g",
      icon: "🫘",
      portion: "1 cup cooked",
    },
    {
      name: "Black Chickpeas",
      category: "Proteins",
      gi: 28,
      sugar: "2.4g",
      calories: 269,
      protein: "19g",
      carbs: "48g",
      fiber: "12.5g",
      icon: "🫘",
      portion: "1 cup cooked",
    },
    {
      name: "Paneer (Cottage Cheese)",
      category: "Dairy",
      gi: 0,
      sugar: "1.2g",
      calories: 265,
      protein: "28g",
      carbs: "3.6g",
      fiber: "0g",
      icon: "🧀",
      portion: "100g",
    },
    {
      name: "Tofu",
      category: "Proteins",
      gi: 15,
      sugar: "0.4g",
      calories: 76,
      protein: "8.1g",
      carbs: "1.9g",
      fiber: "1.2g",
      icon: "🟫",
      portion: "100g",
    },
    {
      name: "Chicken Breast",
      category: "Proteins",
      gi: 0,
      sugar: "0g",
      calories: 165,
      protein: "31g",
      carbs: "0g",
      fiber: "0g",
      icon: "🍗",
      portion: "100g",
    },
    {
      name: "Fish (Salmon)",
      category: "Proteins",
      gi: 0,
      sugar: "0g",
      calories: 208,
      protein: "20g",
      carbs: "0g",
      fiber: "0g",
      icon: "🐟",
      portion: "100g",
    },

    // Indian Vegetables
    {
      name: "Spinach",
      category: "Vegetables",
      gi: 15,
      sugar: "0.4g",
      calories: 23,
      protein: "2.9g",
      carbs: "3.6g",
      fiber: "2.2g",
      icon: "🥬",
      portion: "1 cup raw",
    },
    {
      name: "Bitter Gourd",
      category: "Vegetables",
      gi: 15,
      sugar: "2.4g",
      calories: 34,
      protein: "2.4g",
      carbs: "8g",
      fiber: "2.8g",
      icon: "🥒",
      portion: "1 cup",
    },
    {
      name: "Okra (Bhindi)",
      category: "Vegetables",
      gi: 20,
      sugar: "1.5g",
      calories: 33,
      protein: "2g",
      carbs: "7g",
      fiber: "2g",
      icon: "🫑",
      portion: "1 cup",
    },
    {
      name: "Bottle Gourd",
      category: "Vegetables",
      gi: 15,
      sugar: "1.2g",
      calories: 12,
      protein: "0.6g",
      carbs: "2.2g",
      fiber: "0.4g",
      icon: "🥒",
      portion: "1 cup",
    },
    {
      name: "Broccoli",
      category: "Vegetables",
      gi: 15,
      sugar: "2.2g",
      calories: 34,
      protein: "2.8g",
      carbs: "7g",
      fiber: "2.4g",
      icon: "🥦",
      portion: "1 cup",
    },
    {
      name: "Cauliflower",
      category: "Vegetables",
      gi: 15,
      sugar: "2.2g",
      calories: 25,
      protein: "1.9g",
      carbs: "5g",
      fiber: "2.4g",
      icon: "🥦",
      portion: "1 cup",
    },
    {
      name: "Tomato",
      category: "Vegetables",
      gi: 15,
      sugar: "2.6g",
      calories: 18,
      protein: "0.9g",
      carbs: "3.9g",
      fiber: "1.2g",
      icon: "🍅",
      portion: "1 medium",
    },
    {
      name: "Cucumber",
      category: "Vegetables",
      gi: 15,
      sugar: "1.5g",
      calories: 16,
      protein: "0.7g",
      carbs: "3.6g",
      fiber: "0.5g",
      icon: "🥒",
      portion: "1 cup",
    },
    {
      name: "Carrot",
      category: "Vegetables",
      gi: 35,
      sugar: "4.7g",
      calories: 41,
      protein: "0.9g",
      carbs: "10g",
      fiber: "2.8g",
      icon: "🥕",
      portion: "1 medium",
    },
    {
      name: "Bell Pepper",
      category: "Vegetables",
      gi: 15,
      sugar: "2.3g",
      calories: 30,
      protein: "1g",
      carbs: "7g",
      fiber: "1.7g",
      icon: "🫑",
      portion: "1 cup",
    },

    // Indian Fruits
    {
      name: "Mango",
      category: "Fruits",
      gi: 51,
      sugar: "14.8g",
      calories: 60,
      protein: "0.8g",
      carbs: "15g",
      fiber: "1.6g",
      icon: "🥭",
      portion: "1 medium",
    },
    {
      name: "Papaya",
      category: "Fruits",
      gi: 60,
      sugar: "7.8g",
      calories: 43,
      protein: "0.5g",
      carbs: "11g",
      fiber: "1.8g",
      icon: "🧡",
      portion: "1 cup",
    },
    {
      name: "Guava",
      category: "Fruits",
      gi: 12,
      sugar: "9g",
      calories: 68,
      protein: "2.6g",
      carbs: "14g",
      fiber: "5.4g",
      icon: "🟢",
      portion: "1 medium",
    },
    {
      name: "Pomegranate",
      category: "Fruits",
      gi: 35,
      sugar: "16.6g",
      calories: 83,
      protein: "1.7g",
      carbs: "19g",
      fiber: "4g",
      icon: "🍎",
      portion: "1 cup",
    },
    {
      name: "Coconut",
      category: "Fruits",
      gi: 45,
      sugar: "9g",
      calories: 354,
      protein: "3.3g",
      carbs: "15g",
      fiber: "9g",
      icon: "🥥",
      portion: "100g",
    },
    {
      name: "Banana",
      category: "Fruits",
      gi: 51,
      sugar: "27g",
      calories: 89,
      protein: "1.1g",
      carbs: "23g",
      fiber: "2.6g",
      icon: "🍌",
      portion: "1 medium",
    },
    {
      name: "Apple",
      category: "Fruits",
      gi: 36,
      sugar: "19g",
      calories: 52,
      protein: "0.3g",
      carbs: "14g",
      fiber: "2.4g",
      icon: "🍎",
      portion: "1 medium",
    },
    {
      name: "Orange",
      category: "Fruits",
      gi: 42,
      sugar: "12g",
      calories: 47,
      protein: "0.9g",
      carbs: "12g",
      fiber: "2.4g",
      icon: "🍊",
      portion: "1 medium",
    },

    // Indian Spices & Condiments
    {
      name: "Turmeric",
      category: "Spices",
      gi: 0,
      sugar: "0g",
      calories: 312,
      protein: "9.7g",
      carbs: "68g",
      fiber: "21g",
      icon: "🟡",
      portion: "1 tsp",
    },
    {
      name: "Cumin",
      category: "Spices",
      gi: 0,
      sugar: "0.1g",
      calories: 375,
      protein: "17.5g",
      carbs: "55g",
      fiber: "10.5g",
      icon: "🟤",
      portion: "1 tsp",
    },
    {
      name: "Coriander",
      category: "Spices",
      gi: 0,
      sugar: "0.1g",
      calories: 298,
      protein: "12.4g",
      carbs: "55g",
      fiber: "41.9g",
      icon: "🟢",
      portion: "1 tsp",
    },
    {
      name: "Ginger",
      category: "Spices",
      gi: 15,
      sugar: "1.7g",
      calories: 80,
      protein: "1.8g",
      carbs: "18g",
      fiber: "2.4g",
      icon: "🟤",
      portion: "1 tbsp",
    },
    {
      name: "Garlic",
      category: "Spices",
      gi: 30,
      sugar: "0.1g",
      calories: 149,
      protein: "6.4g",
      carbs: "33g",
      fiber: "2.1g",
      icon: "🟤",
      portion: "3 cloves",
    },

    // Indian Dairy
    {
      name: "Yogurt (Plain)",
      category: "Dairy",
      gi: 35,
      sugar: "4.7g",
      calories: 59,
      protein: "3.5g",
      carbs: "4.7g",
      fiber: "0g",
      icon: "🥛",
      portion: "1 cup",
    },
    {
      name: "Milk (Low-fat)",
      category: "Dairy",
      gi: 27,
      sugar: "12g",
      calories: 102,
      protein: "8.2g",
      carbs: "12g",
      fiber: "0g",
      icon: "🥛",
      portion: "1 cup",
    },
    {
      name: "Ghee",
      category: "Dairy",
      gi: 0,
      sugar: "0g",
      calories: 892,
      protein: "0g",
      carbs: "0g",
      fiber: "0g",
      icon: "🟡",
      portion: "1 tbsp",
    },

    // Indian Nuts & Seeds
    {
      name: "Almonds",
      category: "Nuts",
      gi: 15,
      sugar: "4.4g",
      calories: 579,
      protein: "21.2g",
      carbs: "22g",
      fiber: "12.5g",
      icon: "🌰",
      portion: "1 oz (23 nuts)",
    },
    {
      name: "Peanuts",
      category: "Nuts",
      gi: 13,
      sugar: "2.5g",
      calories: 567,
      protein: "25.8g",
      carbs: "16g",
      fiber: "9g",
      icon: "🥜",
      portion: "1 oz",
    },
    {
      name: "Sesame Seeds",
      category: "Nuts",
      gi: 35,
      sugar: "0.3g",
      calories: 563,
      protein: "17.7g",
      carbs: "23g",
      fiber: "11.8g",
      icon: "🟤",
      portion: "1 tbsp",
    },
    {
      name: "Flax Seeds",
      category: "Nuts",
      gi: 35,
      sugar: "0.3g",
      calories: 534,
      protein: "18.3g",
      carbs: "29g",
      fiber: "27.3g",
      icon: "🟤",
      portion: "1 tbsp",
    },
  ]

  const categories = ["All", "Grains", "Fruits", "Vegetables", "Proteins", "Dairy", "Nuts", "Spices"]

  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || food.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getGILabel = (gi) => {
    if (gi <= 55) return "Low GI"
    if (gi <= 70) return "Medium GI"
    return "High GI"
  }

  const getGIColor = (gi) => {
    if (gi <= 55) return "text-emerald-400"
    if (gi <= 70) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Food Database</h1>
            <p className="text-slate-400">Check glycemic index and nutritional content of Indian and other foods</p>
          </div>
          <a
            href="tel:1800121096"
            className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all hover:scale-105 whitespace-nowrap"
          >
            <Phone size={20} />
            <span className="hidden sm:inline">1800 121 2096</span>
            <span className="sm:hidden">Call Help</span>
          </a>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search foods..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Food Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFoods.map((food, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedFood(selectedFood?.name === food.name ? null : food)}
              className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-cyan-500 transition-all hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{food.icon}</div>
                <span className="text-xs font-semibold text-slate-400 bg-slate-700 px-2 py-1 rounded">
                  {food.category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{food.name}</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Glycemic Index</span>
                  <div className="text-right">
                    <span className={`font-bold ${getGIColor(food.gi)}`}>{food.gi}</span>
                    <p className="text-xs text-slate-400">{getGILabel(food.gi)}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Sugar Content</span>
                  <span className="text-slate-200 font-semibold">{food.sugar}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Calories</span>
                  <span className="text-slate-200 font-semibold">{food.calories}</span>
                </div>
              </div>

              {selectedFood?.name === food.name && (
                <div className="mt-4 pt-4 border-t border-slate-700 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Protein</span>
                    <span className="text-slate-200">{food.protein}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Carbs</span>
                    <span className="text-slate-200">{food.carbs}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Fiber</span>
                    <span className="text-slate-200">{food.fiber}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-slate-700">
                    <span className="text-slate-400">Portion</span>
                    <span className="text-slate-200 font-semibold">{food.portion}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFoods.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No foods found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
