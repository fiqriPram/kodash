import { z } from "zod"

// Settings validation schema
export const settingsSchema = z.object({
  displayName: z.string().min(1, "Display name is required").max(50, "Display name must be 50 characters or less"),
  email: z.string().email("Invalid email address"),
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(false),
  weeklyReports: z.boolean().default(true),
  securityAlerts: z.boolean().default(true),
  theme: z.enum(["light", "dark", "system"]).default("system"),
  language: z.enum(["en", "es", "fr", "de", "ja"]).default("en"),
  twoFactorEnabled: z.boolean().default(false)
})

// Password change validation schema
export const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
  confirmPassword: z.string().min(1, "Password confirmation is required")
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
})

// Profile update validation schema
export const profileUpdateSchema = z.object({
  displayName: z.string().min(1, "Display name is required").max(50, "Display name must be 50 characters or less"),
  email: z.string().email("Invalid email address"),
  bio: z.string().max(500, "Bio must be 500 characters or less").optional()
})

// Avatar upload validation schema
export const avatarUploadSchema = z.object({
  file: z.instanceof(File).refine(
    (file) => file.size <= 2 * 1024 * 1024, // 2MB
    "File size must be 2MB or less"
  ).refine(
    (file) => ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(file.type),
    "File must be an image (JPEG, PNG, GIF, or WebP)"
  )
})

// User registration validation (enhanced)
export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number")
})

export type SettingsInput = z.infer<typeof settingsSchema>
export type PasswordChangeInput = z.infer<typeof passwordChangeSchema>
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>
export type AvatarUploadInput = z.infer<typeof avatarUploadSchema>