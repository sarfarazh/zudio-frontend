'use client'

import { useAuthStore } from "@/store/auth-store"

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user)

  return (
    <div className="container max-w-4xl py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Account Information</h2>
            <div className="grid gap-4 rounded-lg border p-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="mt-1">{user?.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Account Created</label>
                <p className="mt-1">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Preferences</h2>
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Preference settings will be added here
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Usage Statistics</h2>
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Your usage statistics will be displayed here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 