import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Bell,
  Shield,
  Link as LinkIcon,
  Trash2,
  CheckCircle,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <CardTitle>Profile Settings</CardTitle>
          </div>
          <CardDescription>
            Update your profile information and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-2xl font-bold">
              JD
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold">John Doe</h3>
              <p className="text-sm text-muted-foreground">@johndoe</p>
              <Button variant="outline" size="sm">
                Change Avatar
              </Button>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue="john.doe@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Input
                id="bio"
                defaultValue="Content creator & TikTok enthusiast"
              />
            </div>
          </div>

          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      {/* Connected Accounts */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <LinkIcon className="h-5 w-5" />
            <CardTitle>Connected Accounts</CardTitle>
          </div>
          <CardDescription>
            Manage your connected social media accounts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-black rounded-lg flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold flex items-center gap-2">
                  TikTok
                  <Badge variant="default" className="bg-green-500">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Connected
                  </Badge>
                </h4>
                <p className="text-sm text-muted-foreground">
                  @johndoe • 45.2K followers
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Disconnect
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg border-dashed">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center text-white">
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold">Instagram</h4>
                <p className="text-sm text-muted-foreground">Not connected</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Connect
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <CardTitle>Notifications</CardTitle>
          </div>
          <CardDescription>
            Choose what notifications you want to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            {
              title: "New Followers",
              description: "Get notified when someone follows you",
            },
            {
              title: "Comments",
              description: "Get notified when someone comments on your videos",
            },
            {
              title: "Likes",
              description: "Get notified when someone likes your content",
            },
            {
              title: "Weekly Reports",
              description: "Receive weekly performance summaries",
            },
          ].map((notification, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <h4 className="font-semibold">{notification.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <CardTitle>Privacy & Security</CardTitle>
          </div>
          <CardDescription>
            Manage your security settings and privacy preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Change Password</Label>
            <Input id="password" type="password" placeholder="Enter new password" />
          </div>
          <Button>Update Password</Button>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-semibold text-destructive flex items-center gap-2">
              <Trash2 className="h-4 w-4" />
              Danger Zone
            </h4>
            <div className="p-4 border border-destructive rounded-lg space-y-3">
              <div>
                <h5 className="font-medium">Delete Account</h5>
                <p className="text-sm text-muted-foreground">
                  Once you delete your account, there is no going back. Please be
                  certain.
                </p>
              </div>
              <Button variant="destructive" size="sm">
                Delete Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
