"use client"

import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { useTheme } from "next-themes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { 
  User,
  Mail,
  Shield,
  Bell,
  Palette,
  Globe,
  Key,
  Save,
  Loader2,
  Camera,
  Moon,
  Sun
} from "lucide-react"
import { useUser } from "@/components/user-provider"

interface UserData {
  id: string
  email: string
  createdAt: string
}

export function SettingsContent() {
  const { user: currentUser } = useUser()
  const [loading, setLoading] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)
  const { setTheme: setAppTheme } = useTheme()

  // Profile settings
  const [displayName, setDisplayName] = useState(currentUser.email.split('@')[0])
  const [email, setEmail] = useState(currentUser.email)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)

  // Security settings
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)
  const [weeklyReports, setWeeklyReports] = useState(true)
  const [securityAlerts, setSecurityAlerts] = useState(true)

  // Appearance settings
  const [theme, setThemeState] = useState("system")
  const [language, setLanguage] = useState("en")

  useEffect(() => {
    // Load user settings from API
    fetchUserSettings()
  }, [])

  // Log theme changes for debugging
  useEffect(() => {
    console.log("Current theme state:", theme)
  }, [theme])

  const fetchUserSettings = async () => {
    try {
      const response = await fetch("/api/user/settings")
      if (response.ok) {
        const data = await response.json()
        // Set the form fields with actual data
        if (data.displayName) setDisplayName(data.displayName)
        if (data.email) setEmail(data.email)
        if (data.avatarUrl) setAvatarUrl(data.avatarUrl)
        if (data.emailNotifications !== undefined) setEmailNotifications(data.emailNotifications)
        if (data.pushNotifications !== undefined) setPushNotifications(data.pushNotifications)
        if (data.weeklyReports !== undefined) setWeeklyReports(data.weeklyReports)
        if (data.securityAlerts !== undefined) setSecurityAlerts(data.securityAlerts)
        if (data.theme) setThemeState(data.theme)
        if (data.language) setLanguage(data.language)
        if (data.twoFactorEnabled !== undefined) setTwoFactorEnabled(data.twoFactorEnabled)
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error)
    }
  }

  const handleSaveSettings = async (section: string) => {
    setSaveLoading(true)
    try {
      // Basic client-side validation
      if (!displayName.trim()) {
        toast.error("Display name is required")
        setSaveLoading(false)
        return
      }

      if (displayName.length > 50) {
        toast.error("Display name must be 50 characters or less")
        setSaveLoading(false)
        return
      }

      if (!email.trim()) {
        toast.error("Email is required")
        setSaveLoading(false)
        return
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address")
        setSaveLoading(false)
        return
      }

      const settingsData = {
        displayName,
        email,
        emailNotifications,
        pushNotifications,
        weeklyReports,
        securityAlerts,
        theme,
        language,
        twoFactorEnabled
      }

      console.log("Sending settings data:", settingsData)

      const response = await fetch("/api/user/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settingsData),
      })

      if (response.ok) {
        // Apply theme change if appearance settings were saved
        if (section === "appearance") {
          setAppTheme(theme)
          console.log("Theme applied:", theme)
        }
        toast.success(`${section} settings saved successfully!`)
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || "Failed to save settings")
      }
    } catch (error) {
      console.error("Settings save error:", error)
      toast.error("Failed to save settings")
    } finally {
      setSaveLoading(false)
    }
  }

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file
    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file")
      return
    }

    if (file.size > 2 * 1024 * 1024) { // 2MB
      toast.error("File size must be less than 2MB")
      return
    }

    setUploadingAvatar(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/user/avatar", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      if (response.ok) {
        setAvatarUrl(data.avatarUrl)
        toast.success("Avatar uploaded successfully!")
      } else {
        toast.error(data.error || "Failed to upload avatar")
      }
    } catch (error) {
      console.error("Avatar upload error:", error)
      toast.error("Failed to upload avatar")
    } finally {
      setUploadingAvatar(false)
    }
  }

  const handlePasswordChange = async () => {
    // Client-side validation
    if (!currentPassword.trim()) {
      toast.error("Current password is required")
      return
    }

    if (!newPassword.trim()) {
      toast.error("New password is required")
      return
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters")
      return
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword)) {
      toast.error("Password must contain at least one uppercase letter, one lowercase letter, and one number")
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    setSaveLoading(true)
    try {
      const response = await fetch("/api/user/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword
        }),
      })

      if (response.ok) {
        // Clear password fields
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
        toast.success("Password changed successfully!")
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || "Failed to change password")
      }
    } catch (error) {
      console.error("Password change error:", error)
      toast.error("Failed to change password")
    } finally {
      setSaveLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
            </TabsList>

            {/* Profile Settings */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Profile Information
                  </CardTitle>
                  <CardDescription>
                    Update your personal information and profile details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={avatarUrl || ""} />
                      <AvatarFallback className="text-lg">
                        {currentUser.email.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                        id="avatar-upload"
                        disabled={uploadingAvatar}
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => document.getElementById('avatar-upload')?.click()}
                        disabled={uploadingAvatar}
                      >
                        {uploadingAvatar ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Camera className="mr-2 h-4 w-4" />
                            Change Avatar
                          </>
                        )}
                      </Button>
                      <p className="text-sm text-muted-foreground mt-1">
                        JPG, PNG or GIF. Max 2MB.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Form Fields */}
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input
                        id="displayName"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Your display name"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label>Account Status</Label>
                      <div className="flex items-center space-x-2">
                        <Badge variant="default">Active</Badge>
                        <span className="text-sm text-muted-foreground">
                          Member since {new Date(currentUser.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={() => handleSaveSettings("profile")} disabled={saveLoading}>
                      {saveLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="mr-2 h-5 w-5" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>
                    Manage your password and security preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Password Change */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Change Password</h3>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="Enter current password"
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm new password"
                        />
                      </div>
                    </div>

                    <Button onClick={handlePasswordChange} disabled={saveLoading}>
                      {saveLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Key className="mr-2 h-4 w-4" />
                          Change Password
                        </>
                      )}
                    </Button>
                  </div>

                  <Separator />

                  {/* Two-Factor Authentication */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable 2FA</Label>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Switch
                        checked={twoFactorEnabled}
                        onCheckedChange={setTwoFactorEnabled}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="mr-2 h-5 w-5" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>
                    Choose how you want to be notified
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive browser push notifications
                        </p>
                      </div>
                      <Switch
                        checked={pushNotifications}
                        onCheckedChange={setPushNotifications}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Weekly Reports</Label>
                        <p className="text-sm text-muted-foreground">
                          Get weekly summary of your activity
                        </p>
                      </div>
                      <Switch
                        checked={weeklyReports}
                        onCheckedChange={setWeeklyReports}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Security Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified about security events
                        </p>
                      </div>
                      <Switch
                        checked={securityAlerts}
                        onCheckedChange={setSecurityAlerts}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={() => handleSaveSettings("notifications")} disabled={saveLoading}>
                      {saveLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Preferences
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appearance Settings */}
            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="mr-2 h-5 w-5" />
                    Appearance
                  </CardTitle>
                  <CardDescription>
                    Customize the look and feel of your dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label>Theme</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          variant={theme === "light" ? "default" : "outline"}
                          onClick={() => setThemeState("light")}
                          className="flex items-center justify-center"
                        >
                          <Sun className="mr-2 h-4 w-4" />
                          Light
                        </Button>
                        <Button
                          variant={theme === "dark" ? "default" : "outline"}
                          onClick={() => setThemeState("dark")}
                          className="flex items-center justify-center"
                        >
                          <Moon className="mr-2 h-4 w-4" />
                          Dark
                        </Button>
                        <Button
                          variant={theme === "system" ? "default" : "outline"}
                          onClick={() => setThemeState("system")}
                          className="flex items-center justify-center"
                        >
                          <Globe className="mr-2 h-4 w-4" />
                          System
                        </Button>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="language">Language</Label>
                      <select
                        id="language"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                        <option value="ja">日本語</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={() => handleSaveSettings("appearance")} disabled={saveLoading}>
                      {saveLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
    </div>
  )
}