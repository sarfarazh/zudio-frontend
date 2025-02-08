'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Loader, Wand2 } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const router = useRouter()
  const [prompt, setPrompt] = useState('')
  const [enhancedPrompt, setEnhancedPrompt] = useState('')
  const [loading, setLoading] = useState(false)

  const handleEnhance = async () => {
    if (!prompt.trim()) return
    
    setLoading(true)
    try {
      // API call will be implemented here
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulated delay
      setEnhancedPrompt(prompt + " [Enhanced with additional details and style modifiers]") // Placeholder enhancement
    } catch (error) {
      console.error("Error enhancing prompt:", error)
    } finally {
      setLoading(false)
    }
  }

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/sign-up')
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl space-y-12 text-center"
      >
        <div className="space-y-6">
          <h1 className="text-4xl font-bold sm:text-6xl">
            Create Amazing AI Media with ZenStudio
          </h1>
          <p className="text-xl text-muted-foreground">
            Transform your ideas into stunning videos, images, and more with our AI-powered platform
          </p>
        </div>

        <div className="mx-auto max-w-2xl space-y-8">
          <form onSubmit={handlePromptSubmit} className="space-y-4">
            <div className="space-y-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to create..."
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-lg placeholder:text-gray-500 dark:border-gray-800 dark:bg-gray-950"
                rows={3}
              />
              <button
                type="button"
                onClick={handleEnhance}
                disabled={!prompt.trim() || loading}
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
              >
                {loading ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="h-4 w-4" />
                )}
                Enhance Prompt
              </button>
            </div>

            {enhancedPrompt && (
              <div className="rounded-lg border bg-card p-4 text-left">
                <h3 className="text-sm font-medium mb-2">Enhanced Prompt:</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{enhancedPrompt}</p>
              </div>
            )}

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-3 text-lg font-semibold text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
            >
              Start Creating
            </button>
          </form>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg border bg-card p-6">
              <h2 className="text-lg font-medium mb-4">Tips for Better Prompts</h2>
              <ul className="space-y-2 text-sm text-muted-foreground text-left">
                <li>• Be specific about the subject, style, and mood</li>
                <li>• Include details about lighting and composition</li>
                <li>• Mention artistic influences or techniques</li>
                <li>• Use descriptive adjectives and clear language</li>
              </ul>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <h2 className="text-lg font-medium mb-4">Get Started</h2>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground text-left">
                  Create an account to start generating amazing AI media with your prompts.
                </p>
                <div className="flex gap-4">
                  <Link
                    href="/sign-up"
                    className="flex-1 inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
                  >
                    Sign Up
                  </Link>
                  <Link
                    href="/login"
                    className="flex-1 inline-flex items-center justify-center rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
                  >
                    Log In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
