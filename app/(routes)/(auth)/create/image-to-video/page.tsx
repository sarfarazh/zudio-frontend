"use client";

import { useState, useCallback } from "react";
import { Loader, Upload, Play } from "lucide-react";
import Image from 'next/image';

export default function ImageToVideoPage() {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [outputVideo, setOutputVideo] = useState<string | null>(null);
  const [duration, setDuration] = useState("5");

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSourceImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleGenerate = async () => {
    if (!sourceImage) return;
    
    setLoading(true);
    try {
      // API call will be implemented here
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay
      setOutputVideo("https://example.com/video.mp4"); // Placeholder video URL
    } catch (error) {
      console.error("Error generating video:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Input Column */}
      <div className="flex flex-col space-y-4">
        <div className="flex-1 flex flex-col space-y-4">
          <h2 className="text-2xl font-bold">Image to Video</h2>
          <p className="text-muted-foreground">
            Upload an image and describe how you want to animate it
          </p>

          {/* Image Upload */}
          <div className="relative aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {sourceImage ? (
              <Image
                src={sourceImage}
                alt="Source image"
                width={800}
                height={800}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                <Upload className="h-8 w-8 mb-2" />
                <span>Upload an image</span>
              </div>
            )}
          </div>

          {/* Duration Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Video Duration (seconds)
            </label>
            <input
              type="number"
              min="1"
              max="30"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-3 rounded-lg bg-card border
                      focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Prompt Input */}
          <textarea
            placeholder="Describe how you want to animate the image..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 min-h-[100px] p-3 rounded-lg bg-card border
                      focus:ring-2 focus:ring-primary focus:border-transparent
                      resize-none"
          />

          <button
            onClick={handleGenerate}
            disabled={loading || !sourceImage || !prompt.trim()}
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
        {outputVideo ? (
          <video
            src={outputVideo}
            controls
            className="max-w-full max-h-full rounded-lg"
          />
        ) : (
          <div className="text-muted-foreground text-center flex flex-col items-center">
            <Play className="h-8 w-8 mb-2" />
            <span>Your generated video will appear here</span>
          </div>
        )}
      </div>
    </div>
  );
} 