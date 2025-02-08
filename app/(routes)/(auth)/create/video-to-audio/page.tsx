"use client";

import { useState, useCallback } from "react";
import { Loader, Upload, Music } from "lucide-react";

export default function VideoToAudioPage() {
  const [sourceVideo, setSourceVideo] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [outputAudio, setOutputAudio] = useState<string | null>(null);

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
      setOutputAudio("https://example.com/audio.mp3"); // Placeholder audio URL
    } catch (error) {
      console.error("Error generating audio:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Input Column */}
      <div className="flex flex-col space-y-4">
        <div className="flex-1 flex flex-col space-y-4">
          <h2 className="text-2xl font-bold">Video to Audio</h2>
          <p className="text-muted-foreground">
            Upload a video and describe the audio you want to generate
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

          {/* Prompt Input */}
          <textarea
            placeholder="Describe the audio you want to generate..."
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
        {outputAudio ? (
          <div className="w-full max-w-md space-y-4">
            <div className="flex items-center justify-center">
              <Music className="h-16 w-16 text-primary" />
            </div>
            <audio
              src={outputAudio}
              controls
              className="w-full"
            />
            <p className="text-center text-sm text-muted-foreground">
              Generated Audio
            </p>
          </div>
        ) : (
          <div className="text-muted-foreground text-center flex flex-col items-center">
            <Music className="h-8 w-8 mb-2" />
            <span>Your generated audio will appear here</span>
          </div>
        )}
      </div>
    </div>
  );
} 