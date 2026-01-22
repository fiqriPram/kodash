import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Eye,
  Heart,
  TrendingUp,
  Calendar,
  Clock,
  Globe,
  UserCheck,
} from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">
          Deep dive into your TikTok performance metrics
        </p>
      </div>

      {/* Time Period Selector */}
      <Tabs defaultValue="7days" className="space-y-4">
        <TabsList>
          <TabsTrigger value="7days">Last 7 Days</TabsTrigger>
          <TabsTrigger value="30days">Last 30 Days</TabsTrigger>
          <TabsTrigger value="90days">Last 90 Days</TabsTrigger>
          <TabsTrigger value="year">This Year</TabsTrigger>
        </TabsList>

        <TabsContent value="7days" className="space-y-6">
          {/* Engagement Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Likes
                </CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">187.5K</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +15.2% from previous period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Comments</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.8K</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +8.3% from previous period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Shares</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">9.4K</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +22.1% from previous period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Avg. Watch Time
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45.2s</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +5.7% from previous period
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Performance Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Views Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-lg">
                <div className="text-center space-y-2">
                  <Eye className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Chart visualization would go here
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Showing 2.4M total views in the last 7 days
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Audience Demographics */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Top Locations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { country: "United States", percentage: 35, views: "840K" },
                  { country: "United Kingdom", percentage: 18, views: "432K" },
                  { country: "Canada", percentage: 12, views: "288K" },
                  { country: "Australia", percentage: 10, views: "240K" },
                  { country: "Germany", percentage: 8, views: "192K" },
                ].map((location, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{location.country}</span>
                      <span className="text-muted-foreground">
                        {location.views}
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${location.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  Audience Age Groups
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { age: "18-24", percentage: 42, count: "19.0K" },
                  { age: "25-34", percentage: 28, count: "12.7K" },
                  { age: "35-44", percentage: 15, count: "6.8K" },
                  { age: "45-54", percentage: 10, count: "4.5K" },
                  { age: "55+", percentage: 5, count: "2.3K" },
                ].map((group, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{group.age} years</span>
                      <span className="text-muted-foreground">
                        {group.count}
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500"
                        style={{ width: `${group.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Best Posting Times */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Best Times to Post
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day, i) => (
                    <div key={i} className="text-center space-y-2">
                      <div className="text-xs font-medium text-muted-foreground">
                        {day}
                      </div>
                      <div className="space-y-1">
                        {[
                          { time: "9am", activity: 60 },
                          { time: "12pm", activity: 80 },
                          { time: "3pm", activity: 90 },
                          { time: "6pm", activity: 100 },
                          { time: "9pm", activity: 85 },
                        ].map((slot, j) => (
                          <div
                            key={j}
                            className="h-6 rounded bg-secondary relative group"
                            style={{
                              opacity: slot.activity / 100,
                            }}
                          >
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="text-xs font-medium">
                                {slot.time}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Peak engagement: Weekdays 3-6 PM
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="30days">
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">30-Day Analytics</h3>
              <p className="text-muted-foreground">
                View your performance over the last 30 days
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="90days">
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">90-Day Analytics</h3>
              <p className="text-muted-foreground">
                View your performance over the last 90 days
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="year">
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Yearly Analytics</h3>
              <p className="text-muted-foreground">
                View your performance for this year
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
