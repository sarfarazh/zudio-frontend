"use client";

import { useState } from "react";
import { Loader, Wand2 } from "lucide-react";

export default function WritePromptPage() {
  const [prompt, setPrompt] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEnhance = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    try {
      // API call will be implemented here
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay
      setEnhancedPrompt(prompt + " [Enhanced with additional details and style modifiers]"); // Placeholder enhancement
    } catch (error) {
      console.error("Error enhancing prompt:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Input Column */}
      <div className="flex flex-col space-y-4">
        <div>
          <h2 className="text-lg font-medium mb-2">Write Your Prompt</h2>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to create..."
            className="w-full h-40 p-3 rounded-lg bg-card border resize-none"
          />
        </div>

        <button
          onClick={handleEnhance}
          disabled={!prompt.trim() || loading}
          className="flex items-center justify-center gap-2 p-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          {loading ? (
            <Loader className="h-5 w-5 animate-spin" />
          ) : (
            <Wand2 className="h-5 w-5" />
          )}
          Enhance Prompt
        </button>
      </div>

      {/* Output Column */}
      <div className="flex flex-col space-y-4">
        <div>
          <h2 className="text-lg font-medium mb-2">Enhanced Prompt</h2>
          <div className="w-full h-40 p-3 rounded-lg bg-card border overflow-auto">
            {enhancedPrompt ? (
              <p className="whitespace-pre-wrap">{enhancedPrompt}</p>
            ) : (
              <p className="text-muted-foreground">
                Your enhanced prompt will appear here...
              </p>
            )}
          </div>
        </div>

        <div className="p-4 rounded-lg bg-card border">
          <h3 className="font-medium mb-2">Tips for Better Prompts</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Be specific about the subject, style, and mood</li>
            <li>Include details about lighting, composition, and perspective</li>
            <li>Mention artistic influences or specific techniques</li>
            <li>Use descriptive adjectives and clear language</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 