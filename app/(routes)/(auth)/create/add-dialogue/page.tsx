"use client";

import { useState } from "react";
import { Loader, Play, Plus, Trash2 } from "lucide-react";

interface DialogueLine {
  id: string;
  text: string;
  startTime: string;
  endTime: string;
  voice: string;
}

export default function AddDialoguePage() {
  const [loading, setLoading] = useState(false);
  const [dialogueLines, setDialogueLines] = useState<DialogueLine[]>([]);
  const [previewAudio, setPreviewAudio] = useState<string | null>(null);

  const voices = [
    { id: "male1", name: "Male Voice 1" },
    { id: "male2", name: "Male Voice 2" },
    { id: "female1", name: "Female Voice 1" },
    { id: "female2", name: "Female Voice 2" },
  ];

  const addDialogueLine = () => {
    const newLine: DialogueLine = {
      id: Math.random().toString(36).substring(7),
      text: "",
      startTime: "0",
      endTime: "5",
      voice: voices[0].id,
    };
    setDialogueLines([...dialogueLines, newLine]);
  };

  const updateDialogueLine = (id: string, field: keyof DialogueLine, value: string) => {
    setDialogueLines(lines =>
      lines.map(line =>
        line.id === id ? { ...line, [field]: value } : line
      )
    );
  };

  const removeDialogueLine = (id: string) => {
    setDialogueLines(lines => lines.filter(line => line.id !== id));
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      // API call will be implemented here
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay
      setPreviewAudio("https://example.com/dialogue.mp3"); // Placeholder audio URL
    } catch (error) {
      console.error("Error generating dialogue:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Input Column */}
      <div className="flex flex-col space-y-4">
        <div className="flex-1 flex flex-col space-y-4">
          <h2 className="text-2xl font-bold">Add Dialogue</h2>
          <p className="text-muted-foreground">
            Add AI-generated dialogue to your video
          </p>

          {/* Dialogue Lines */}
          <div className="space-y-4">
            {dialogueLines.map((line) => (
              <div
                key={line.id}
                className="p-4 rounded-lg border bg-card space-y-3"
              >
                <div className="flex justify-between items-start">
                  <select
                    value={line.voice}
                    onChange={(e) => updateDialogueLine(line.id, "voice", e.target.value)}
                    className="p-2 rounded-md bg-background border"
                  >
                    {voices.map((voice) => (
                      <option key={voice.id} value={voice.id}>
                        {voice.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => removeDialogueLine(line.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                <textarea
                  value={line.text}
                  onChange={(e) => updateDialogueLine(line.id, "text", e.target.value)}
                  placeholder="Enter dialogue text..."
                  className="w-full p-2 rounded-md bg-background border resize-none min-h-[80px]"
                />

                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="text-sm font-medium block mb-1">
                      Start Time (s)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={line.startTime}
                      onChange={(e) => updateDialogueLine(line.id, "startTime", e.target.value)}
                      className="w-full p-2 rounded-md bg-background border"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium block mb-1">
                      End Time (s)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={line.endTime}
                      onChange={(e) => updateDialogueLine(line.id, "endTime", e.target.value)}
                      className="w-full p-2 rounded-md bg-background border"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={addDialogueLine}
              className="w-full py-3 border-2 border-dashed border-muted-foreground/25
                       hover:border-muted-foreground/50 rounded-lg flex items-center
                       justify-center space-x-2 text-muted-foreground
                       hover:text-foreground transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Add Dialogue Line</span>
            </button>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || dialogueLines.length === 0}
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
              "Generate Dialogue"
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
            <p className="text-center text-sm text-muted-foreground">
              Preview with generated dialogue
            </p>
          </div>
        ) : (
          <div className="text-muted-foreground text-center">
            Generated dialogue preview will appear here
          </div>
        )}
      </div>
    </div>
  );
} 