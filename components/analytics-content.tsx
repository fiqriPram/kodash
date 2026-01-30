"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, Users, FileText, Download, Calendar } from "lucide-react"
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
} from "recharts"
import { useUser } from "@/components/user-provider"

interface UserData {
  id: string
  email: string
  createdAt: string
}

// Sample data - in real app this would come from API
const userGrowthData = [
  { name: "Jan", users: 120, newUsers: 20 },
  { name: "Feb", users: 145, newUsers: 25 },
  { name: "Mar", users: 180, newUsers: 35 },
  { name: "Apr", users: 220, newUsers: 40 },
  { name: "May", users: 268, newUsers: 48 },
  { name: "Jun", users: 320, newUsers: 52 },
]

const documentActivityData = [
  { name: "Mon", created: 12, viewed: 45 },
  { name: "Tue", created: 8, viewed: 38 },
  { name: "Wed", created: 15, viewed: 52 },
  { name: "Thu", created: 10, viewed: 41 },
  { name: "Fri", created: 18, viewed: 61 },
  { name: "Sat", created: 6, viewed: 28 },
  { name: "Sun", created: 4, viewed: 22 },
]

const deviceData = [
  { name: "Desktop", value: 58, color: "#3b82f6" },
  { name: "Mobile", value: 32, color: "#10b981" },
  { name: "Tablet", value: 10, color: "#f59e0b" },
]

export function AnalyticsContent() {
  const { user } = useUser()
  const [timeRange, setTimeRange] = useState("7d")

  return (
    <div className="p-6">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Analytics</h1>
              <p className="text-muted-foreground">
                Track your application performance and user engagement
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center border rounded-lg">
                <Button
                  variant={timeRange === "7d" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTimeRange("7d")}
                >
                  7 Days
                </Button>
                <Button
                  variant={timeRange === "30d" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTimeRange("30d")}
                >
                  30 Days
                </Button>
                <Button
                  variant={timeRange === "90d" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTimeRange("90d")}
                >
                  90 Days
                </Button>
              </div>
              
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="ml-auto h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">320</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
                  +18% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                <BarChart3 className="ml-auto h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,287</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
                  +24% from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Documents</CardTitle>
                <FileText className="ml-auto h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">847</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
                <Calendar className="ml-auto h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24m</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
                  +3m from last week
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* User Growth Chart */}
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>
                  Total users and new user signups over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="users" 
                      stackId="1" 
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.6}
                      name="Total Users"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="newUsers" 
                      stackId="2" 
                      stroke="#10b981" 
                      fill="#10b981" 
                      fillOpacity={0.6}
                      name="New Users"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Document Activity Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Document Activity</CardTitle>
                <CardDescription>
                  Daily document creation and views
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={documentActivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="created" fill="#8b5cf6" name="Created" />
                    <Bar dataKey="viewed" fill="#06b6d4" name="Viewed" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Device Usage and Quick Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Device Usage Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Device Usage</CardTitle>
                <CardDescription>
                  User distribution by device type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center space-x-4 mt-4">
                  {deviceData.map((item) => (
                    <div key={item.name} className="flex items-center">
                      <div 
                        className="h-3 w-3 rounded-full mr-2" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Page Load Time</span>
                    <span className="text-sm text-green-600">1.2s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Bounce Rate</span>
                    <span className="text-sm text-green-600">32%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Conversion Rate</span>
                    <span className="text-sm text-green-600">4.8%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Error Rate</span>
                    <span className="text-sm text-green-600">0.1%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Pages</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">/dashboard</span>
                    <span className="text-sm text-muted-foreground">45% visits</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">/documents</span>
                    <span className="text-sm text-muted-foreground">28% visits</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">/analytics</span>
                    <span className="text-sm text-muted-foreground">18% visits</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">/settings</span>
                    <span className="text-sm text-muted-foreground">9% visits</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
    </div>
  )
}