"use client";

import { useState, useCallback } from "react";
import { Loader, Upload, Play } from "lucide-react";

export default function ExtendVideoPage() {
  const [sourceVideo, setSourceVideo] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [outputVideo, setOutputVideo] = useState<string | null>(null);
  const [duration, setDuration] = useState("5");

  const handleVideoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSourceVideo(url);
    }
  }, []);

  const handleGenerate = async () => {
    if (!sourceVideo) return;
    
    setLoading(true);
    try {
      // API call will be implemented here
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay
      setOutputVideo("https://example.com/extended-video.mp4"); // Placeholder video URL
    } catch (error) {
      console.error("Error extending video:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Input Column */}
      <div className="flex flex-col space-y-4">
        <div className="flex-1 flex flex-col space-y-4">
          <h2 className="text-2xl font-bold">Extend Video</h2>
          <p className="text-muted-foreground">
            Upload a video and describe how you want to extend it
          </p>

          {/* Video Upload */}
          <div className="relative aspect-video rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors">
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {sourceVideo ? (
              <video
                src={sourceVideo}
                controls
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                <Upload className="h-8 w-8 mb-2" />
                <span>Upload a video</span>
              </div>
            )}
          </div>

          {/* Extension Duration Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Extension Duration (seconds)
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
            placeholder="Describe how you want to extend the video..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 min-h-[100px] p-3 rounded-lg bg-card border
                      focus:ring-2 focus:ring-primary focus:border-transparent
                      resize-none"
          />

          <button
            onClick={handleGenerate}
            disabled={loading || !sourceVideo || !prompt.trim()}
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
            <span>Your extended video will appear here</span>
          </div>
        )}
      </div>
    </div>
  );
} 