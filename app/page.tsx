"use client";

import { useState, useEffect } from "react";
import { Loader } from "lucide-react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [jobId, setJobId] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [jobStatus, setJobStatus] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (loading || jobStatus === "PENDING") {
      timer = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      setElapsedTime(0);
    }
    return () => clearInterval(timer);
  }, [loading, jobStatus]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleGenerate = async () => {
    setLoading(true);
    setJobId(null);
    setImage(null);
    setJobStatus(null);

    try {
      const response = await fetch(`${backendUrl}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, workflow: "flux1_dev_fp8" }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData?.detail || response.statusText}`);
      }

      const data = await response.json();
      setJobId(data.job_id);
      setJobStatus("PENDING");
      setLoading(false);
    } catch (error) {
      console.error("Error starting job:", error);
      setLoading(false);
    }
  };

  // Function to check job status
  useEffect(() => {
    if (!jobId) return;

    const interval = setInterval(async () => {
      try {
        const response = await fetch(`${backendUrl}/status/${jobId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch job status");
        }

        const data = await response.json();
        setJobStatus(data.status);

        if (data.status === "COMPLETED" && data.image_path) {
          setImage(`${backendUrl}/output/${data.image_path.split('/').pop()}`);
          clearInterval(interval);
        }
      } catch (error) {
        console.error("Error polling job status:", error);
        clearInterval(interval);
      }
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, [jobId]);

  return (
    <main className="h-screen bg-gray-950 text-gray-100 p-4 md:p-8">
      <div className="h-full max-w-7xl mx-auto flex flex-col">
        <h1 className="text-3xl font-bold text-center mb-6">Text-to-Image Generator</h1>
        
        <div className="flex-1 grid md:grid-cols-2 gap-8 min-h-0">
          {/* Left Column - Input Controls */}
          <div className="flex flex-col space-y-4 min-h-0">
            <div className="flex-1 flex flex-col space-y-4 min-h-0">
              <textarea
                placeholder="Enter your prompt..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700 
                          focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          resize-none"
              />
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-colors duration-200"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader className="animate-spin" />
                    <span>Generating... ({formatTime(elapsedTime)})</span>
                  </div>
                ) : (
                  "Generate"
                )}
              </button>
            </div>

            {jobId && (
              <div className="p-4 rounded-lg bg-gray-800">
                <p className="text-gray-300">Job ID: {jobId}</p>
                <p className="text-gray-300">Status: {jobStatus}</p>
                {(loading || jobStatus === "PENDING") && (
                  <p className="text-gray-300">Time elapsed: {formatTime(elapsedTime)}</p>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Image Display */}
          <div className="flex items-center justify-center min-h-0">
            {image ? (
              <img 
                src={image} 
                alt="Generated" 
                className="rounded-lg shadow-xl max-w-full max-h-full object-contain"
              />
            ) : (
              <div className="w-full aspect-square rounded-lg bg-gray-800 flex items-center justify-center">
                <p className="text-gray-400">Generated image will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
