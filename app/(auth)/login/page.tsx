'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/store/auth-store'

export default function LoginPage() {
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
      router.push('/dashboard')
      router.refresh()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Invalid credentials')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4">
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
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-sm placeholder:text-gray-500 dark:border-gray-800 dark:bg-gray-950"
            placeholder="name@example.com"
          />
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-sm placeholder:text-gray-500 dark:border-gray-800 dark:bg-gray-950"
            placeholder="Password"
          />

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