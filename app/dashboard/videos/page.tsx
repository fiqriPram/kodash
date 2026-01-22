import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Search,
  Filter,
  TrendingUp,
  Clock,
} from "lucide-react";

export default function VideosPage() {
  const videos = [
    {
      id: 1,
      title: "Summer vibes 🌊",
      thumbnail: "from-blue-400 to-cyan-400",
      views: "245K",
      likes: "18.2K",
      comments: "892",
      shares: "1.2K",
      duration: "0:24",
      uploaded: "2 days ago",
      trending: true,
    },
    {
      id: 2,
      title: "Behind the scenes 🎬",
      thumbnail: "from-purple-400 to-pink-400",
      views: "189K",
      likes: "12.5K",
      comments: "654",
      shares: "890",
      duration: "0:31",
      uploaded: "4 days ago",
      trending: true,
    },
    {
      id: 3,
      title: "Quick tutorial ✨",
      thumbnail: "from-green-400 to-emerald-400",
      views: "156K",
      likes: "9.8K",
      comments: "432",
      shares: "567",
      duration: "0:18",
      uploaded: "6 days ago",
      trending: false,
    },
    {
      id: 4,
      title: "Day in my life vlog 📹",
      thumbnail: "from-orange-400 to-red-400",
      views: "654K",
      likes: "45.2K",
      comments: "1.8K",
      shares: "5.4K",
      duration: "0:58",
      uploaded: "1 week ago",
      trending: false,
    },
    {
      id: 5,
      title: "Cooking made easy 🍳",
      thumbnail: "from-yellow-400 to-orange-400",
      views: "328K",
      likes: "23.1K",
      comments: "1.1K",
      shares: "2.8K",
      duration: "0:42",
      uploaded: "1 week ago",
      trending: false,
    },
    {
      id: 6,
      title: "Fitness motivation 💪",
      thumbnail: "from-red-400 to-pink-400",
      views: "412K",
      likes: "31.5K",
      comments: "1.4K",
      shares: "3.7K",
      duration: "0:35",
      uploaded: "2 weeks ago",
      trending: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Videos</h2>
          <p className="text-muted-foreground">
            Manage and analyze your TikTok videos
          </p>
        </div>
        <Button>Upload New Video</Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search videos..."
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="sm:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Video Stats Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Videos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground mt-1">
              4 uploaded this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4M</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all videos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6.8%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Per video average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Trending Videos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently trending
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Videos Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <Card key={video.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
            <div className="relative">
              <div
                className={`aspect-[9/16] bg-gradient-to-br ${video.thumbnail} flex items-center justify-center relative`}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  <Clock className="h-3 w-3 inline mr-1" />
                  {video.duration}
                </div>
                {video.trending && (
                  <Badge className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Trending
                  </Badge>
                )}
              </div>
            </div>
            <CardContent className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold line-clamp-1">{video.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {video.uploaded}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Eye className="h-3 w-3" />
                  <span>{video.views}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Heart className="h-3 w-3" />
                  <span>{video.likes}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MessageCircle className="h-3 w-3" />
                  <span>{video.comments}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Share2 className="h-3 w-3" />
                  <span>{video.shares}</span>
                </div>
              </div>
              <Button variant="outline" className="w-full" size="sm">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
