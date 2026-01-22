import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Eye,
  Heart,
  TrendingUp,
  Video,
  MessageCircle,
  Share2,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
        <p className="text-muted-foreground">
          Your TikTok analytics at a glance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Followers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.2K</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <ArrowUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4M</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <ArrowUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">8.1%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Engagement Rate
            </CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6.8%</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <ArrowDown className="h-3 w-3 text-red-500" />
              <span className="text-red-500">2.3%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <ArrowUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">4</span> new this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recent">Recent Videos</TabsTrigger>
          <TabsTrigger value="top">Top Performing</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Videos Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  title: "Summer vibes 🌊",
                  views: "245K",
                  likes: "18.2K",
                  comments: "892",
                  shares: "1.2K",
                  trend: "up",
                },
                {
                  title: "Behind the scenes 🎬",
                  views: "189K",
                  likes: "12.5K",
                  comments: "654",
                  shares: "890",
                  trend: "up",
                },
                {
                  title: "Quick tutorial ✨",
                  views: "156K",
                  likes: "9.8K",
                  comments: "432",
                  shares: "567",
                  trend: "down",
                },
              ].map((video, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg" />
                    <div>
                      <h4 className="font-semibold">{video.title}</h4>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {video.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {video.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          {video.comments}
                        </span>
                        <span className="flex items-center gap-1">
                          <Share2 className="h-3 w-3" />
                          {video.shares}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge variant={video.trend === "up" ? "default" : "secondary"}>
                    {video.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDown className="h-3 w-3 mr-1" />
                    )}
                    Trending
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="top" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Videos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  title: "Viral dance challenge 💃",
                  views: "1.2M",
                  likes: "89.5K",
                  comments: "3.2K",
                  shares: "12.5K",
                },
                {
                  title: "Life hack everyone needs 🔥",
                  views: "890K",
                  likes: "67.8K",
                  comments: "2.1K",
                  shares: "8.9K",
                },
                {
                  title: "Day in my life vlog 📹",
                  views: "654K",
                  likes: "45.2K",
                  comments: "1.8K",
                  shares: "5.4K",
                },
              ].map((video, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-red-400 rounded-lg" />
                    <div>
                      <h4 className="font-semibold">{video.title}</h4>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {video.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {video.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          {video.comments}
                        </span>
                        <span className="flex items-center gap-1">
                          <Share2 className="h-3 w-3" />
                          {video.shares}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                    🏆 Top
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
