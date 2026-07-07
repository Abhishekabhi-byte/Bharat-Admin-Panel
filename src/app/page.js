// app/page.js
'use client';

import React, { useState } from 'react';
import { 
  Package, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownRight, 
  RefreshCw, 
  BarChart3,
  Users,
  DollarSign,
  Clock,
  TrendingUp,
  TrendingDown,
  Eye,
  ShoppingCart,
  Calendar,
  FileText
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');

  // Sample data for charts
  const revenueData = [
    { name: 'Jan', revenue: 4000, target: 3500 },
    { name: 'Feb', revenue: 3000, target: 3200 },
    { name: 'Mar', revenue: 5000, target: 4800 },
    { name: 'Apr', revenue: 4500, target: 4200 },
    { name: 'May', revenue: 6000, target: 5500 },
    { name: 'Jun', revenue: 5500, target: 5800 },
    { name: 'Jul', revenue: 7000, target: 6500 },
  ];

  const salesData = [
    { name: 'Mon', sales: 400 },
    { name: 'Tue', sales: 300 },
    { name: 'Wed', sales: 500 },
    { name: 'Thu', sales: 450 },
    { name: 'Fri', sales: 600 },
    { name: 'Sat', sales: 550 },
    { name: 'Sun', sales: 350 },
  ];

  const categoryData = [
    { name: 'Electronics', value: 35 },
    { name: 'Clothing', value: 25 },
    { name: 'Books', value: 20 },
    { name: 'Home & Living', value: 15 },
    { name: 'Others', value: 5 },
  ];

  const COLORS = ['#7d3431', '#a55d5b', '#cb8c89', '#d9a5a2', '#e8c4c2'];

  const activityData = [
    { time: '00:00', users: 50 },
    { time: '04:00', users: 30 },
    { time: '08:00', users: 150 },
    { time: '12:00', users: 300 },
    { time: '16:00', users: 280 },
    { time: '20:00', users: 200 },
  ];

  const recentActivities = [
    { id: 1, user: 'John Doe', action: 'Added new product', time: '2 minutes ago', type: 'product' },
    { id: 2, user: 'Jane Smith', action: 'Processed order #1234', time: '15 minutes ago', type: 'order' },
    { id: 3, user: 'Mike Johnson', action: 'Updated banner image', time: '1 hour ago', type: 'banner' },
    { id: 4, user: 'Sarah Wilson', action: 'Created new project', time: '3 hours ago', type: 'project' },
    { id: 5, user: 'Tom Brown', action: 'Added new client', time: '5 hours ago', type: 'client' },
  ];

  const topProducts = [
    { name: 'Product A', sales: 1200, growth: 15 },
    { name: 'Product B', sales: 980, growth: 8 },
    { name: 'Product C', sales: 850, growth: -5 },
    { name: 'Product D', sales: 720, growth: 22 },
    { name: 'Product E', sales: 650, growth: 12 },
  ];

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-[#f5f0ef] min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="space-y-6 max-w-7xl mx-auto">
        
        {/* Page Header */}
        {/* <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white py-4 px-5 rounded-xl shadow-sm border border-red-200/50">
          <div>
            <h1 className="text-2xl font-bold text-black">Dashboard Overview</h1>
            <p className="text-sm text-black/70">Welcome back! Here's what's happening with your business today.</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-red-200 rounded-lg text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#7d3431]/20"
            >
              <option value="daily">Today</option>
              <option value="weekly">This Week</option>
              <option value="monthly">This Month</option>
              <option value="yearly">This Year</option>
            </select>
            <button 
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#7d3431] to-[#cb8c89] text-white font-medium text-sm rounded-xl hover:shadow-lg hover:shadow-[#7d3431]/20 transition-all duration-300 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div> */}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-red-200/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-black/60">Total Revenue</p>
                <h3 className="text-2xl font-bold text-black mt-1">$54,280</h3>
                <p className="text-xs text-emerald-600 font-medium flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-3 h-3" /> +12.5% from last month
                </p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl">
                <DollarSign className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-red-200/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-black/60">Total Orders</p>
                <h3 className="text-2xl font-bold text-black mt-1">1,248</h3>
                <p className="text-xs text-emerald-600 font-medium flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-3 h-3" /> +8.2% from last month
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-red-200/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-black/60">Total Users</p>
                <h3 className="text-2xl font-bold text-black mt-1">3,456</h3>
                <p className="text-xs text-emerald-600 font-medium flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-3 h-3" /> +5.7% from last month
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-red-200/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-black/60">Conversion Rate</p>
                <h3 className="text-2xl font-bold text-black mt-1">3.8%</h3>
                <p className="text-xs text-amber-600 font-medium flex items-center gap-1 mt-1">
                  <ArrowDownRight className="w-3 h-3" /> -0.5% from last month
                </p>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl">
                <TrendingUp className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <div className="bg-white p-5 rounded-xl border border-red-200/50 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-black">Revenue Overview</h3>
                <p className="text-xs text-black/60">Monthly revenue vs targets</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-[#7d3431]"></div>
                  <span className="text-black/70">Revenue</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-[#cb8c89]"></div>
                  <span className="text-black/70">Target</span>
                </div>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7d3431" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#7d3431" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#999" fontSize={12} />
                  <YAxis stroke="#999" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      color: '#000'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#7d3431" 
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#cb8c89" 
                    fill="none" 
                    strokeDasharray="5 5"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sales Chart */}
          <div className="bg-white p-5 rounded-xl border border-red-200/50 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-black">Sales Overview</h3>
                <p className="text-xs text-black/60">Weekly sales performance</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-black/60">
                <Clock className="w-4 h-4" />
                <span>Last 7 days</span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#999" fontSize={12} />
                  <YAxis stroke="#999" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      color: '#000'
                    }}
                  />
                  <Bar dataKey="sales" fill="#7d3431" radius={[4, 4, 0, 0]}>
                    {salesData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill={entry.sales > 500 ? '#7d3431' : '#cb8c89'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Second Row Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Activity Chart */}
          <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-red-200/50 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-black">User Activity</h3>
                <p className="text-xs text-black/60">24-hour user engagement</p>
              </div>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" stroke="#999" fontSize={12} />
                  <YAxis stroke="#999" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      color: '#000'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#7d3431" 
                    strokeWidth={2}
                    dot={{ fill: '#7d3431', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-white p-5 rounded-xl border border-red-200/50 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-black">Categories</h3>
                <p className="text-xs text-black/60">Product distribution</p>
              </div>
            </div>
            <div className="h-48 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      color: '#000'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-red-200/50 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-black">Recent Activities</h3>
                <p className="text-xs text-black/60">Latest actions from team members</p>
              </div>
              <button className="text-sm text-[#7d3431] font-medium hover:underline">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-red-100 last:border-0">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'product' ? 'bg-blue-50' :
                    activity.type === 'order' ? 'bg-emerald-50' :
                    activity.type === 'banner' ? 'bg-purple-50' :
                    activity.type === 'project' ? 'bg-amber-50' :
                    'bg-rose-50'
                  }`}>
                    {activity.type === 'product' && <Package className="w-4 h-4 text-blue-600" />}
                    {activity.type === 'order' && <ShoppingCart className="w-4 h-4 text-emerald-600" />}
                    {activity.type === 'banner' && <Eye className="w-4 h-4 text-purple-600" />}
                    {activity.type === 'project' && <FileText className="w-4 h-4 text-amber-600" />}
                    {activity.type === 'client' && <Users className="w-4 h-4 text-rose-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-black">
                      <span className="font-semibold">{activity.user}</span>
                      <span className="text-black/70"> {activity.action}</span>
                    </p>
                    <p className="text-xs text-black/50">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white p-5 rounded-xl border border-red-200/50 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-black">Top Products</h3>
                <p className="text-xs text-black/60">Best performing items</p>
              </div>
            </div>
            <div className="space-y-3">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-black/40">#{index + 1}</span>
                      <span className="text-sm font-medium text-black">{product.name}</span>
                    </div>
                    <div className="w-full bg-red-100 rounded-full h-1.5 mt-1">
                      <div 
                        className="bg-gradient-to-r from-[#7d3431] to-[#cb8c89] h-1.5 rounded-full"
                        style={{ width: `${(product.sales / 1200) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right ml-3">
                    <p className="text-sm font-semibold text-black">{product.sales}</p>
                    <p className={`text-xs font-medium flex items-center justify-end gap-0.5 ${
                      product.growth > 0 ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {product.growth > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {Math.abs(product.growth)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          <div className="bg-white p-3 rounded-xl border border-red-200/50 text-center shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs text-black/60">Total Views</p>
            <p className="text-lg font-bold text-black">12.4K</p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-red-200/50 text-center shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs text-black/60">Bounce Rate</p>
            <p className="text-lg font-bold text-black">34.2%</p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-red-200/50 text-center shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs text-black/60">Avg. Session</p>
            <p className="text-lg font-bold text-black">2m 34s</p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-red-200/50 text-center shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs text-black/60">New Users</p>
            <p className="text-lg font-bold text-black">456</p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-red-200/50 text-center shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs text-black/60">Returning</p>
            <p className="text-lg font-bold text-black">2.1K</p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-red-200/50 text-center shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs text-black/60">Page Views</p>
            <p className="text-lg font-bold text-black">8.7K</p>
          </div>
        </div>

      </div>
    </div>
  );
}