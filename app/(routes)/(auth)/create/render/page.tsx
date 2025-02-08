"use client";

import { useState } from "react";
import { Loader, Download, Settings, CheckCircle } from "lucide-react";

interface RenderSettings {
  resolution: string;
  format: string;
  quality: string;
}

export default function RenderPage() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [settings, setSettings] = useState<RenderSettings>({
    resolution: "1080p",
    format: "mp4",
    quality: "high",
  });

  const resolutions = [
    { value: "720p", label: "720p (1280x720)" },
    { value: "1080p", label: "1080p (1920x1080)" },
    { value: "4k", label: "4K (3840x2160)" },
  ];

  const formats = [
    { value: "mp4", label: "MP4 (H.264)" },
    { value: "webm", label: "WebM (VP9)" },
    { value: "mov", label: "QuickTime (ProRes)" },
  ];

  const qualities = [
    { value: "low", label: "Low (Faster)" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High (Better Quality)" },
  ];

  const handleSettingChange = (field: keyof RenderSettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleRender = async () => {
    setLoading(true);
    setProgress(0);
    setDownloadUrl(null);

    try {
      // Simulated render progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setProgress(i);
      }

      // Simulated completion
      setDownloadUrl("https://example.com/rendered-video.mp4");
    } catch (error) {
      console.error("Error rendering video:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Render Video</h2>
        <p className="text-muted-foreground">
          Configure render settings and export your video
        </p>
      </div>

      {/* Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Render Settings
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Resolution</label>
                <select
                  value={settings.resolution}
                  onChange={(e) => handleSettingChange("resolution", e.target.value)}
                  className="w-full p-3 rounded-lg bg-card border"
                >
                  {resolutions.map((res) => (
                    <option key={res.value} value={res.value}>
                      {res.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Format</label>
                <select
                  value={settings.format}
                  onChange={(e) => handleSettingChange("format", e.target.value)}
                  className="w-full p-3 rounded-lg bg-card border"
                >
                  {formats.map((format) => (
                    <option key={format.value} value={format.value}>
                      {format.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Quality</label>
                <select
                  value={settings.quality}
                  onChange={(e) => handleSettingChange("quality", e.target.value)}
                  className="w-full p-3 rounded-lg bg-card border"
                >
                  {qualities.map((quality) => (
                    <option key={quality.value} value={quality.value}>
                      {quality.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={handleRender}
            disabled={loading}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors duration-200"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader className="animate-spin" />
                <span>Rendering... {progress}%</span>
              </div>
            ) : (
              "Start Render"
            )}
          </button>
        </div>

        {/* Preview & Download */}
        <div className="space-y-6">
          <div className="aspect-video rounded-lg border bg-card flex items-center justify-center">
            {downloadUrl ? (
              <div className="text-center space-y-2">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                <p className="font-medium">Render Complete!</p>
              </div>
            ) : (
              <div className="text-center space-y-2 text-muted-foreground">
                <p>Video Preview</p>
                <p className="text-sm">Start render to see the final result</p>
              </div>
            )}
          </div>

          {downloadUrl && (
            <a
              href={downloadUrl}
              download
              className="w-full py-3 bg-secondary text-secondary-foreground rounded-lg
                       flex items-center justify-center space-x-2 hover:bg-secondary/90
                       transition-colors duration-200"
            >
              <Download className="h-5 w-5" />
              <span>Download Video</span>
            </a>
          )}

          {/* Render Info */}
          <div className="p-4 rounded-lg border space-y-2">
            <h4 className="font-medium">Render Information</h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>Resolution: {settings.resolution}</p>
              <p>Format: {settings.format.toUpperCase()}</p>
              <p>Quality: {settings.quality.charAt(0).toUpperCase() + settings.quality.slice(1)}</p>
              {downloadUrl && <p>Status: Complete</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 