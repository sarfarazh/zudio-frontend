"use client";

import { useState, useEffect } from "react";
import { Loader } from "lucide-react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [jobId, setJobId] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [jobStatus, setJobStatus] = useState<string | null>(null);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

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
          setImage(`${backendUrl}/${data.image_path}`);
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
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold">Text-to-Image Generator</h1>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Enter your prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="border p-2 rounded-md"
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          {loading ? <Loader className="animate-spin" /> : "Generate"}
        </button>
      </div>

      {jobId && (
        <div className="mt-4 text-center">
          <p className="text-gray-700">Job ID: {jobId}</p>
          <p className="text-gray-700">Status: {jobStatus}</p>
        </div>
      )}

      {image && (
        <div className="mt-4">
          <img src={image} alt="Generated" className="rounded-lg shadow-md" />
        </div>
      )}
    </main>
  );
}
