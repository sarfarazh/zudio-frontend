"use client";

import { useState } from "react";
import { Loader, Music, Play } from "lucide-react";

interface MusicGenParams {
  genre: string;
  mood: string;
  tempo: string;
  duration: string;
}

export default function AddMusicPage() {
  const [loading, setLoading] = useState(false);
  const [previewAudio, setPreviewAudio] = useState<string | null>(null);
  const [params, setParams] = useState<MusicGenParams>({
    genre: "cinematic",
    mood: "epic",
    tempo: "moderate",
    duration: "30",
  });

  const genres = [
    "cinematic",
    "electronic",
    "ambient",
    "rock",
    "jazz",
    "classical",
  ];

  const moods = [
    "epic",
    "happy",
    "sad",
    "mysterious",
    "romantic",
    "intense",
  ];

  const tempos = [
    "slow",
    "moderate",
    "fast",
    "very fast",
  ];

  const handleParamChange = (field: keyof MusicGenParams, value: string) => {
    setParams(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      // API call will be implemented here
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay
      setPreviewAudio("https://example.com/music.mp3"); // Placeholder audio URL
    } catch (error) {
      console.error("Error generating music:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Input Column */}
      <div className="flex flex-col space-y-4">
        <div className="flex-1 flex flex-col space-y-4">
          <h2 className="text-2xl font-bold">Add Background Music</h2>
          <p className="text-muted-foreground">
            Generate AI background music for your video
          </p>

          {/* Music Parameters */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Genre</label>
              <select
                value={params.genre}
                onChange={(e) => handleParamChange("genre", e.target.value)}
                className="w-full p-3 rounded-lg bg-card border"
              >
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre.charAt(0).toUpperCase() + genre.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Mood</label>
              <select
                value={params.mood}
                onChange={(e) => handleParamChange("mood", e.target.value)}
                className="w-full p-3 rounded-lg bg-card border"
              >
                {moods.map((mood) => (
                  <option key={mood} value={mood}>
                    {mood.charAt(0).toUpperCase() + mood.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tempo</label>
              <select
                value={params.tempo}
                onChange={(e) => handleParamChange("tempo", e.target.value)}
                className="w-full p-3 rounded-lg bg-card border"
              >
                {tempos.map((tempo) => (
                  <option key={tempo} value={tempo}>
                    {tempo.charAt(0).toUpperCase() + tempo.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Duration (seconds)</label>
              <input
                type="number"
                min="5"
                max="300"
                value={params.duration}
                onChange={(e) => handleParamChange("duration", e.target.value)}
                className="w-full p-3 rounded-lg bg-card border"
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
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
              "Generate Music"
            )}
          </button>
        </div>
      </div>

      {/* Preview Column */}
      <div className="flex items-center justify-center min-h-[400px] rounded-lg border bg-card p-4">
        {previewAudio ? (
          <div className="w-full max-w-md space-y-4">
            <div className="aspect-video rounded-lg bg-background flex items-center justify-center">
              <Play className="h-12 w-12 text-muted-foreground" />
            </div>
            <audio
              src={previewAudio}
              controls
              className="w-full"
            />
            <div className="text-center space-y-1">
              <p className="font-medium">Generated Music</p>
              <p className="text-sm text-muted-foreground">
                {params.genre.charAt(0).toUpperCase() + params.genre.slice(1)} • {params.mood} • {params.tempo} tempo
              </p>
            </div>
          </div>
        ) : (
          <div className="text-muted-foreground text-center flex flex-col items-center">
            <Music className="h-8 w-8 mb-2" />
            <span>Generated music preview will appear here</span>
          </div>
        )}
      </div>
    </div>
  );
} 