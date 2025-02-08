'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/store/auth-store'

function LoginContent() {
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
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
      <div className="relative mx-auto w-full max-w-sm space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Welcome back</h1>
          <p className="text-sm text-gray-400">
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
            className="block w-full rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm px-4 py-2 text-sm text-white placeholder:text-gray-600 focus:border-gray-700 focus:ring-1 focus:ring-gray-700 transition-all"
            placeholder="name@example.com"
          />
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="block w-full rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm px-4 py-2 text-sm text-white placeholder:text-gray-600 focus:border-gray-700 focus:ring-1 focus:ring-gray-700 transition-all"
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
            className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="flex flex-col gap-2 text-center text-sm text-gray-400">
          <Link href="/forgot-password" className="hover:text-gray-300 transition-colors">
            Forgot password?
          </Link>
          <div>
            Don&apos;t have an account?{' '}
            <Link href="/sign-up" className="hover:text-gray-300 transition-colors">
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
    <Suspense fallback={<div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">Loading...</div>}>
      <LoginContent />
    </Suspense>
  )
} 