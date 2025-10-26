"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import { Heart, TrendingUp, Utensils, Settings, Menu, X, Search, ChevronRight, Phone } from "lucide-react"

export default function Home() {
  const [currentTab, setCurrentTab] = useState("dashboard")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [readings, setReadings] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("bloodSugarReadings")
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  const [userProfile, setUserProfile] = useState({
    name: "User",
    age: 0,
    diabetesType: "Type 2",
    targetBloodSugar: 100,
    medications: "",
  })

  const handleAddReading = (newReading) => {
    const updated = [...readings, newReading]
    setReadings(updated)
    localStorage.setItem("bloodSugarReadings", JSON.stringify(updated))
  }

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <TrendingUp size={20} /> },
    { id: "log", label: "Log Reading", icon: <Heart size={20} /> },
    { id: "food", label: "Food Database", icon: <Utensils size={20} /> },
    { id: "insights", label: "Insights", icon: <TrendingUp size={20} /> },
    { id: "analyzer", label: "AI Analyzer", icon: <Search size={20} /> },
    { id: "profile", label: "Profile", icon: <Settings size={20} /> },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Glimpse</h1>
              <p className="text-xs text-slate-400">Diabetes Management</p>
            </div>
          </div>

          <a
            href="tel:1800-121-2096"
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg font-medium transition-all hover:shadow-lg"
          >
            <Phone size={18} />
            <span className="text-sm">1800 121 2096</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-300 hover:text-white transition-colors p-2 hover:bg-slate-700/50 rounded-lg"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <nav
          className={`${mobileMenuOpen ? "block" : "hidden"} md:block w-full md:w-64 bg-slate-800/50 backdrop-blur border-r border-slate-700/50 p-6 space-y-2 fixed md:sticky top-20 md:top-0 h-screen md:h-auto overflow-y-auto transition-all duration-300`}
        >
          <div className="mb-6 md:hidden">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Navigation</p>
          </div>
          {navItems.map((item) => (
            <NavButton
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={currentTab === item.id}
              onClick={() => {
                setCurrentTab(item.id)
                setMobileMenuOpen(false)
              }}
            />
          ))}
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 md:ml-0 mt-20 md:mt-0 overflow-y-auto">
          <div className="mb-6 flex items-center gap-2 text-sm">
            <span className="text-slate-400">Glimpse</span>
            <ChevronRight size={16} className="text-slate-600" />
            <span className="text-cyan-400 font-medium capitalize">
              {navItems.find((item) => item.id === currentTab)?.label}
            </span>
          </div>

          {currentTab === "dashboard" && (
            <DashboardTab readings={readings} userProfile={userProfile} onAddReading={handleAddReading} />
          )}
          {currentTab === "log" && <LogTab onAddReading={handleAddReading} />}
          {currentTab === "food" && <FoodDatabaseTab />}
          {currentTab === "insights" && <InsightsTab readings={readings} />}
          {currentTab === "analyzer" && <AIAnalyzerTab />}
          {currentTab === "profile" && <ProfileTab userProfile={userProfile} setUserProfile={setUserProfile} />}
        </main>
      </div>
    </div>
  )
}

function NavButton({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
        active
          ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20 scale-105"
          : "text-slate-300 hover:bg-slate-700/50 hover:text-white hover:translate-x-1"
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  )
}

function DashboardTab({ readings, userProfile, onAddReading }) {
  const [showTrendAnalysis, setShowTrendAnalysis] = useState(false)
  const [logValue, setLogValue] = useState("")
  const [logContext, setLogContext] = useState("Fasting")
  const [logTime, setLogTime] = useState(new Date().toISOString().slice(0, 16))

  const handleLogReading = (e) => {
    e.preventDefault()
    if (logValue) {
      onAddReading({
        value: Number.parseInt(logValue),
        context: logContext,
        time: new Date(logTime).toISOString(),
      })
      setLogValue("")
      setLogContext("Fasting")
      setLogTime(new Date().toISOString().slice(0, 16))
    }
  }

  const calculateChartData = () => {
    if (readings.length === 0) return []
    const today = new Date().toDateString()
    return readings
      .filter((r) => new Date(r.time).toDateString() === today)
      .sort((a, b) => new Date(a.time) - new Date(b.time))
      .map((r) => ({
        time: new Date(r.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        value: r.value,
      }))
  }

  const calculateWeeklyData = () => {
    if (readings.length === 0) return []
    const weekData = {}
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    readings.forEach((r) => {
      const date = new Date(r.time)
      const dayName = days[date.getDay()]
      if (!weekData[dayName]) weekData[dayName] = []
      weekData[dayName].push(r.value)
    })

    return days.map((day) => ({
      day,
      avg: weekData[day] ? Math.round(weekData[day].reduce((a, b) => a + b) / weekData[day].length) : 0,
    }))
  }

  const calculateMonthlyData = () => {
    if (readings.length === 0) return []
    const weeks = [
      { week: "Week 1", start: 1, end: 7 },
      { week: "Week 2", start: 8, end: 14 },
      { week: "Week 3", start: 15, end: 21 },
      { week: "Week 4", start: 22, end: 31 },
    ]

    return weeks.map((w) => {
      const weekReadings = readings.filter((r) => {
        const day = new Date(r.time).getDate()
        return day >= w.start && day <= w.end
      })
      if (weekReadings.length === 0) return { ...w, avg: 0, min: 0, max: 0 }
      const values = weekReadings.map((r) => r.value)
      return {
        ...w,
        avg: Math.round(values.reduce((a, b) => a + b) / values.length),
        min: Math.min(...values),
        max: Math.max(...values),
      }
    })
  }

  const calculateHealthInsights = () => {
    if (readings.length === 0) {
      return [
        {
          title: "Fasting Levels",
          value: "No data",
          status: "neutral",
          icon: "—",
          description: "Log readings to see data",
        },
        {
          title: "Post-Meal Spike",
          value: "No data",
          status: "neutral",
          icon: "—",
          description: "Log readings to see data",
        },
        {
          title: "Variability",
          value: "No data",
          status: "neutral",
          icon: "—",
          description: "Log readings to see data",
        },
        {
          title: "Time in Range",
          value: "No data",
          status: "neutral",
          icon: "—",
          description: "Log readings to see data",
        },
      ]
    }

    const values = readings.map((r) => r.value)
    const avg = values.reduce((a, b) => a + b) / values.length
    const variance = values.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / values.length
    const stdDev = Math.sqrt(variance)
    const inRange = readings.filter((r) => r.value >= 70 && r.value <= 180).length
    const timeInRange = Math.round((inRange / readings.length) * 100)

    const fastingReadings = readings.filter((r) => r.context === "Fasting")
    const postMealReadings = readings.filter((r) => r.context === "After Meal")

    const fastingAvg =
      fastingReadings.length > 0
        ? Math.round(fastingReadings.reduce((a, b) => a + b.value, 0) / fastingReadings.length)
        : 0
    const postMealAvg =
      postMealReadings.length > 0
        ? Math.round(postMealReadings.reduce((a, b) => a + b.value, 0) / postMealReadings.length)
        : 0
    const spike = postMealAvg - fastingAvg

    return [
      {
        title: "Fasting Levels",
        value: `${fastingAvg} mg/dL`,
        status: fastingAvg < 100 ? "good" : fastingAvg < 126 ? "warning" : "bad",
        icon: fastingAvg < 100 ? "✓" : fastingAvg < 126 ? "!" : "✕",
        description: fastingAvg < 100 ? "Within target range" : "Slightly elevated",
      },
      {
        title: "Post-Meal Spike",
        value: `${spike} mg/dL`,
        status: spike < 50 ? "good" : spike < 80 ? "warning" : "bad",
        icon: spike < 50 ? "✓" : spike < 80 ? "!" : "✕",
        description: spike < 50 ? "Well controlled" : "Elevated spikes",
      },
      {
        title: "Variability",
        value: `${Math.round(stdDev)}%`,
        status: stdDev < 30 ? "good" : stdDev < 50 ? "warning" : "bad",
        icon: stdDev < 30 ? "✓" : stdDev < 50 ? "!" : "✕",
        description: stdDev < 30 ? "Stable readings" : "Variable readings",
      },
      {
        title: "Time in Range",
        value: `${timeInRange}%`,
        status: timeInRange > 70 ? "good" : timeInRange > 50 ? "warning" : "bad",
        icon: timeInRange > 70 ? "✓" : timeInRange > 50 ? "!" : "✕",
        description: timeInRange > 70 ? "Excellent control" : "Needs improvement",
      },
    ]
  }

  const calculateStats = () => {
    if (readings.length === 0) return { today: 0, weekly: 0, target: userProfile.targetBloodSugar || 100 }

    const today = new Date().toDateString()
    const todayReadings = readings.filter((r) => new Date(r.time).toDateString() === today)
    const todayAvg =
      todayReadings.length > 0 ? Math.round(todayReadings.reduce((a, b) => a + b.value, 0) / todayReadings.length) : 0

    const weeklyAvg = Math.round(readings.reduce((a, b) => a + b.value, 0) / readings.length)

    return { today: todayAvg, weekly: weeklyAvg, target: userProfile.targetBloodSugar || 100 }
  }

  const chartData = calculateChartData()
  const weeklyData = calculateWeeklyData()
  const monthlyData = calculateMonthlyData()
  const healthInsights = calculateHealthInsights()
  const stats = calculateStats()

  const handleGenerateTrendAnalysis = () => {
    setShowTrendAnalysis(true)
    setTimeout(() => {
      setShowTrendAnalysis(false)
    }, 3000)
  }

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Your Health Dashboard</h2>
        <p className="text-slate-400">Track your blood sugar trends and insights</p>
      </div>

      <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500/50 rounded-2xl p-8 shadow-lg shadow-cyan-500/10">
        <h3 className="text-2xl font-bold text-white mb-2">Log Your Blood Sugar</h3>
        <p className="text-slate-300 mb-6">Quick and easy reading entry</p>
        <form onSubmit={handleLogReading} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-3">Blood Sugar Level (mg/dL)</label>
            <input
              type="number"
              value={logValue}
              onChange={(e) => setLogValue(e.target.value)}
              placeholder="Enter your reading"
              className="w-full px-6 py-4 text-lg bg-slate-700 border-2 border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-3">When did you measure?</label>
              <select
                value={logContext}
                onChange={(e) => setLogContext(e.target.value)}
                className="w-full px-6 py-4 text-lg bg-slate-700 border-2 border-slate-600 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all"
              >
                <option>Fasting</option>
                <option>Before Meal</option>
                <option>After Meal</option>
                <option>Bedtime</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-3">Time</label>
              <input
                type="datetime-local"
                value={logTime}
                onChange={(e) => setLogTime(e.target.value)}
                className="w-full px-6 py-4 text-lg bg-slate-700 border-2 border-slate-600 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-4 text-lg rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          >
            Log Reading
          </button>
        </form>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label="Today's Average"
          value={stats.today}
          unit="mg/dL"
          trend={stats.today > 0 ? "Logged" : "No data"}
          color="from-cyan-500 to-blue-500"
        />
        <StatCard
          label="Weekly Average"
          value={stats.weekly}
          unit="mg/dL"
          trend={stats.weekly > 0 ? "Tracked" : "No data"}
          color="from-emerald-500 to-teal-500"
        />
        <StatCard
          label="Target Range"
          value={stats.target}
          unit="mg/dL"
          trend="Your goal"
          color="from-purple-500 to-pink-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {healthInsights.map((insight, idx) => (
          <div key={idx} className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-slate-400 text-sm font-medium">{insight.title}</p>
                <p className="text-2xl font-bold text-white mt-1">{insight.value}</p>
              </div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  insight.status === "good"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : insight.status === "warning"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : insight.status === "bad"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-slate-600/20 text-slate-400"
                }`}
              >
                {insight.icon}
              </div>
            </div>
            <p className="text-slate-400 text-xs">{insight.description}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      {chartData.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Today's Readings" subtitle="Hourly blood sugar levels">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="time" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }} />
                <Line type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={3} dot={{ fill: "#06b6d4" }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Weekly Trend" subtitle="Average daily readings">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }} />
                <Bar dataKey="avg" fill="#06b6d4" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      )}

      {monthlyData.some((d) => d.avg > 0) && (
        <ChartCard title="Monthly Trend" subtitle="Average readings with min/max range">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="week" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }} />
              <Area type="monotone" dataKey="max" fill="#ef4444" stroke="#ef4444" opacity={0.1} />
              <Area type="monotone" dataKey="avg" fill="#06b6d4" stroke="#06b6d4" opacity={0.3} />
              <Area type="monotone" dataKey="min" fill="#10b981" stroke="#10b981" opacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      )}

      <div className="grid grid-cols-1 gap-6">
        <ChartCard title="Health Recommendations" subtitle="Personalized insights for better control">
          <div className="space-y-3">
            {readings.length === 0 ? (
              <p className="text-slate-400 text-sm">
                Start logging your blood sugar readings to get personalized recommendations.
              </p>
            ) : (
              <>
                <div className="p-3 rounded-lg border-l-4 bg-blue-500/10 border-blue-500">
                  <p className="text-slate-200 text-sm">
                    Continue logging regularly - consistency is key to managing diabetes
                  </p>
                </div>
                <div className="p-3 rounded-lg border-l-4 bg-emerald-500/10 border-emerald-500">
                  <p className="text-slate-200 text-sm">Monitor your readings after meals to identify food triggers</p>
                </div>
                <div className="p-3 rounded-lg border-l-4 bg-yellow-500/10 border-yellow-500">
                  <p className="text-slate-200 text-sm">Stay hydrated and maintain regular physical activity</p>
                </div>
              </>
            )}
          </div>
        </ChartCard>
      </div>
    </div>
  )
}

function LogTab({ onAddReading }) {
  const [value, setValue] = useState("")
  const [notes, setNotes] = useState("Fasting")
  const [time, setTime] = useState(new Date().toISOString().slice(0, 16))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value) {
      onAddReading({
        value: Number.parseInt(value),
        context: notes,
        time: new Date(time).toISOString(),
      })
      setValue("")
      setNotes("Fasting")
      setTime(new Date().toISOString().slice(0, 16))
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Log Blood Sugar Reading</h2>
        <p className="text-slate-400">Record your glucose measurement</p>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2">Blood Sugar Value (mg/dL)</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value"
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">Context</label>
              <select
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
              >
                <option>Fasting</option>
                <option>Before Meal</option>
                <option>After Meal</option>
                <option>Bedtime</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">Time</label>
              <input
                type="datetime-local"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            Log Reading
          </button>
        </form>
      </div>
    </div>
  )
}

function FoodDatabaseTab() {
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
    <div className="space-y-6 max-w-6xl">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Food Database</h2>
        <p className="text-slate-400">Check glycemic index and nutritional content of Indian and other foods</p>
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
  )
}

function AIAnalyzerTab() {
  const [foodQuery, setFoodQuery] = useState("")
  const [foodAnalysis, setFoodAnalysis] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyzeFood = async () => {
    if (!foodQuery.trim()) return
    setIsAnalyzing(true)
    setTimeout(() => {
      setFoodAnalysis({
        query: foodQuery,
        result: `Based on your query about "${foodQuery}": This food has moderate glycemic impact. Consider portion control and pair with protein or fiber for better blood sugar management.`,
      })
      setIsAnalyzing(false)
      setFoodQuery("")
    }, 1500)
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">AI Food Glycemic Analyzer</h2>
        <p className="text-slate-400">Ask about the glycemic index (GI) or nutritional details of any food</p>
      </div>

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-8">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="e.g., Glycemic index of white rice, Sugar content of an apple"
            value={foodQuery}
            onChange={(e) => setFoodQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAnalyzeFood()}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
          />
          <button
            onClick={handleAnalyzeFood}
            disabled={isAnalyzing}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Search size={20} />
            {isAnalyzing ? "Analyzing..." : "Analyze Food"}
          </button>
          {foodAnalysis && (
            <div className="p-4 bg-slate-700/50 rounded-lg border border-blue-500/30">
              <p className="text-slate-300 text-sm font-medium mb-2">Analysis for: {foodAnalysis.query}</p>
              <p className="text-slate-200 text-sm">{foodAnalysis.result}</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-white">Quick Tips</h3>
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
            <p className="text-slate-200 text-sm">
              <strong>Low GI Foods:</strong> Vegetables, legumes, whole grains - these have minimal impact on blood
              sugar
            </p>
          </div>
          <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
            <p className="text-slate-200 text-sm">
              <strong>Medium GI Foods:</strong> Some fruits, brown rice, oats - eat in moderation
            </p>
          </div>
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
            <p className="text-slate-200 text-sm">
              <strong>High GI Foods:</strong> White bread, sugary drinks, processed foods - limit consumption
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfileTab({ userProfile, setUserProfile }) {
  const handleChange = (field, value) => {
    setUserProfile((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Your Profile</h2>
        <p className="text-slate-400">Manage your health information and preferences</p>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-200 mb-2">Full Name</label>
          <input
            type="text"
            value={userProfile.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2">Age</label>
            <input
              type="number"
              value={userProfile.age}
              onChange={(e) => handleChange("age", Number.parseInt(e.target.value))}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2">Diabetes Type</label>
            <select
              value={userProfile.diabetesType}
              onChange={(e) => handleChange("diabetesType", e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            >
              <option>Type 1</option>
              <option>Type 2</option>
              <option>Gestational</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-200 mb-2">Target Blood Sugar (mg/dL)</label>
          <input
            type="number"
            value={userProfile.targetBloodSugar}
            onChange={(e) => handleChange("targetBloodSugar", Number.parseInt(e.target.value))}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-200 mb-2">Current Medications</label>
          <textarea
            value={userProfile.medications}
            onChange={(e) => handleChange("medications", e.target.value)}
            placeholder="e.g., Metformin, Insulin"
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 resize-none"
            rows={4}
          />
        </div>

        <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl">
          Save Profile
        </button>
      </div>
    </div>
  )
}

function StatCard({ label, value, unit, trend, color }) {
  return (
    <div
      className={`bg-gradient-to-br ${color} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
    >
      <p className="text-sm font-medium opacity-90">{label}</p>
      <div className="flex items-baseline gap-2 mt-2">
        <span className="text-3xl font-bold">{value}</span>
        <span className="text-sm opacity-75">{unit}</span>
      </div>
      <p className="text-sm mt-3 opacity-90">{trend}</p>
    </div>
  )
}

function ChartCard({ title, subtitle, children }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6 hover:border-slate-600/50 transition-all duration-300">
      <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
      <p className="text-slate-400 text-sm mb-6">{subtitle}</p>
      {children}
    </div>
  )
}

function InsightsTab({ readings }) {
  const [showTrendAnalysis, setShowTrendAnalysis] = useState(false)

  const calculateStats = () => {
    if (readings.length === 0) return { weekly: 0, total: 0 }
    const weeklyAvg = Math.round(readings.reduce((a, b) => a + b.value, 0) / readings.length)
    return { weekly: weeklyAvg, total: readings.length }
  }

  const handleGenerateTrendAnalysis = () => {
    setShowTrendAnalysis(true)
    setTimeout(() => {
      setShowTrendAnalysis(false)
    }, 3000)
  }

  const stats = calculateStats()

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Personalized Insights</h2>
        <p className="text-slate-400">Get AI-powered analysis of your blood sugar trends</p>
      </div>

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-8">
        <div className="flex items-center gap-3 mb-3">
          <h3 className="text-2xl font-bold text-white">Trend Analysis</h3>
          <span className="text-2xl">✨</span>
        </div>
        <p className="text-slate-400 mb-6">
          Get an AI-powered summary and analysis of your recent blood sugar trends to help you make better decisions.
        </p>
        <button
          onClick={handleGenerateTrendAnalysis}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <TrendingUp size={20} />
          Generate Trend Analysis
        </button>
        {showTrendAnalysis && (
          <div className="mt-4 p-4 bg-slate-700/50 rounded-lg border border-cyan-500/30">
            <p className="text-slate-200 text-sm">
              {readings.length === 0
                ? "Start logging your blood sugar readings to get personalized insights and trend analysis."
                : `Your blood sugar levels show a trend with an average of ${stats.weekly} mg/dL. You have ${stats.total} readings logged. Continue monitoring and maintain your current routine for optimal results.`}
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Key Metrics</h3>
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-slate-700/50">
              <p className="text-slate-400 text-sm">Total Readings</p>
              <p className="text-2xl font-bold text-cyan-400">{stats.total}</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-700/50">
              <p className="text-slate-400 text-sm">Average Level</p>
              <p className="text-2xl font-bold text-cyan-400">{stats.weekly} mg/dL</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Recommendations</h3>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-slate-200 text-sm">Log readings consistently for better insights</p>
            </div>
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <p className="text-slate-200 text-sm">Track patterns after meals to identify triggers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
