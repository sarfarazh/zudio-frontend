'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/store/auth-store'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const message = searchParams.get('message')
  const signIn = useAuthStore((state) => state.signIn)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      await signIn(email, password)
      router.push('/')
      router.refresh()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Invalid credentials')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center">
      <div className="mx-auto w-full max-w-sm space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to sign in to your account
          </p>
        </div>

        {message && (
          <div className="text-sm text-green-500 text-center">
            {message}
          </div>
        )}

        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-sm placeholder:text-gray-500 dark:border-gray-800 dark:bg-gray-950"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-sm placeholder:text-gray-500 dark:border-gray-800 dark:bg-gray-950"
              placeholder="Password"
            />
          </div>

          {error && (
            <div className="text-sm text-red-500">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="flex flex-col gap-2 text-center text-sm">
          <Link href="/forgot-password" className="underline">
            Forgot password?
          </Link>
          <div>
            Don&apos;t have an account?{' '}
            <Link href="/sign-up" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Previous Step */}
        <div className="lg:col-span-3">
          <div className="rounded-lg border bg-card p-4">
            <h3 className="text-sm font-medium mb-2">Previous: Write Prompt</h3>
            <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
              {/* Previous output preview */}
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="lg:col-span-6 flex items-center justify-center py-8">
          <LoginForm />
        </div>

        {/* Next Step */}
        <div className="lg:col-span-3">
          <div className="rounded-lg border bg-card p-4">
            <h3 className="text-sm font-medium mb-2">Next: Text to Image</h3>
            <p className="text-sm text-muted-foreground mb-4">Generate an image from your text prompt.</p>
            <Link
              href="/create/text-to-image"
              className="block w-full py-2 text-center text-sm bg-primary text-primary-foreground rounded-md hover:opacity-90"
            >
              Continue to Text to Image
            </Link>
          </div>
        </div>
      </div>
    </Suspense>
  )
} 