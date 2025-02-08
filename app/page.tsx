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
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setEnhancedPrompt(prompt + " [Enhanced with additional details and style modifiers]")
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
    <div className="relative min-h-[calc(100vh-4rem)] bg-black">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
      
      {/* Content */}
      <div className="relative flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl space-y-12 text-center pt-20"
        >
          <div className="space-y-6">
            <h1 className="text-4xl font-bold sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Create Amazing AI Media with ZenStudio
            </h1>
            <p className="text-xl text-gray-400">
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
                  className="w-full rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm px-4 py-3 text-lg placeholder:text-gray-600 text-white focus:border-gray-700 focus:ring-1 focus:ring-gray-700 transition-all"
                  rows={3}
                />
                <button
                  type="button"
                  onClick={handleEnhance}
                  disabled={!prompt.trim() || loading}
                  className="flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-lg bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 backdrop-blur-sm transition-all disabled:opacity-50"
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
                <div className="rounded-xl border border-gray-800 bg-gray-900/30 backdrop-blur-sm p-4 text-left">
                  <h3 className="text-sm font-medium mb-2 text-gray-400">Enhanced Prompt:</h3>
                  <p className="text-sm text-gray-300 whitespace-pre-wrap">{enhancedPrompt}</p>
                </div>
              )}

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-lg font-semibold text-white hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Start Creating
              </button>
            </form>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-xl border border-gray-800 bg-gray-900/30 backdrop-blur-sm p-6 hover:bg-gray-900/40 transition-all">
                <h2 className="text-lg font-medium mb-4 text-white">Tips for Better Prompts</h2>
                <ul className="space-y-2 text-sm text-gray-400 text-left">
                  <li>• Be specific about the subject, style, and mood</li>
                  <li>• Include details about lighting and composition</li>
                  <li>• Mention artistic influences or techniques</li>
                  <li>• Use descriptive adjectives and clear language</li>
                </ul>
              </div>

              <div className="rounded-xl border border-gray-800 bg-gray-900/30 backdrop-blur-sm p-6 hover:bg-gray-900/40 transition-all">
                <h2 className="text-lg font-medium mb-4 text-white">Get Started</h2>
                <div className="space-y-4">
                  <p className="text-sm text-gray-400 text-left">
                    Create an account to start generating amazing AI media with your prompts.
                  </p>
                  <div className="flex gap-4">
                    <Link
                      href="/sign-up"
                      className="flex-1 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white hover:from-blue-700 hover:to-purple-700 transition-all"
                    >
                      Sign Up
                    </Link>
                    <Link
                      href="/login"
                      className="flex-1 inline-flex items-center justify-center rounded-xl border border-gray-700 px-4 py-2 text-sm font-semibold text-gray-300 hover:bg-gray-800/50 backdrop-blur-sm transition-all"
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
    </div>
  )
}
