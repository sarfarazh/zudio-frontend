"use client";

import { useState } from "react";
import { Loader } from "lucide-react";

export default function TextToImagePage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      // API call will be implemented here
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay
      setImage("https://via.placeholder.com/512"); // Placeholder image
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Input Column */}
      <div className="flex flex-col space-y-4">
        <div className="flex-1 flex flex-col space-y-4">
          <h2 className="text-2xl font-bold">Text to Image</h2>
          <p className="text-muted-foreground">
            Describe the image you want to generate
          </p>
          <textarea
            placeholder="A serene landscape with mountains..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 min-h-[200px] p-3 rounded-lg bg-card border
                      focus:ring-2 focus:ring-primary focus:border-transparent
                      resize-none"
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="py-3 bg-primary text-primary-foreground rounded-lg
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors duration-200"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader className="animate-spin" />
                <span>Generating...</span>
              </div>
            ) : (
              "Generate"
            )}
          </button>
        </div>
      </div>

      {/* Output Column */}
      <div className="flex items-center justify-center min-h-[400px] rounded-lg border bg-card p-4">
        {image ? (
          <img
            src={image}
            alt="Generated"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        ) : (
          <div className="text-muted-foreground text-center">
            Your generated image will appear here
          </div>
        )}
      </div>
    </div>
  );
} 