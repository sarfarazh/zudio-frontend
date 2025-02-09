"use client";

import { ChevronDown, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { generatePrompt } from "@/services/prompt";
import { PromptRequest } from "@/types/prompt";
import { toast } from "sonner";
import {
  artFormOptions,
  photoTypeOptions,
  lightingOptions,
  compositionOptions,
  backgroundOptions,
  PromptOption
} from "@/data/prompt-options";
import { useState } from "react";

export default function WritePromptPage() {
  const [loading, setLoading] = useState(false);
  const [enhancePrompt, setEnhancePrompt] = useState(true);
  const [promptData, setPromptData] = useState<PromptRequest>({
    seed: Math.floor(Math.random() * 2147483647).toString(),
    custom: "",
    subject: "",
    artform: "disabled",
    photo_type: "disabled",
    lighting: "disabled",
    composition: "disabled",
    background: "disabled",
  });
  const [generatedPrompt, setGeneratedPrompt] = useState({
    raw: "",
    enhanced: "",
    seed: "",
  });

  const handleInputChange = (field: keyof PromptRequest, value: string) => {
    setPromptData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    if (!promptData.custom?.trim() && !promptData.subject?.trim()) {
      toast.error("Please provide at least a custom prompt or subject");
      return;
    }
    
    setLoading(true);
    try {
      console.log('Generating prompt with data:', promptData);
      const response = await generatePrompt({
        ...promptData,
        enhance: enhancePrompt,
      });
      console.log('Generated prompt response:', response);
      setGeneratedPrompt({
        raw: response.raw_prompt,
        enhanced: response.enhanced_prompt,
        seed: response.seed,
      });
      toast.success("Prompt generated successfully!");
    } catch (error) {
      console.error("Error generating prompt:", error);
      toast.error(error instanceof Error ? error.message : "Failed to generate prompt");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="grid lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Prompt Tips</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Be specific about what you want to create</p>
              <p>• Include details about style, mood, and lighting</p>
              <p>• Mention camera angles for photos</p>
              <p>• Describe the environment or setting</p>
              <p>• Use descriptive adjectives</p>
            </div>
          </CardContent>
        </Card>
        <div className="col-span-2 space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">Write Prompt</h1>
            <p className="text-muted-foreground">Describe your vision for the image</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-4">
              <label className="font-medium">Custom Prompt</label>
              <Textarea 
                placeholder="Enter your custom prompt..." 
                className="min-h-[150px]"
                value={promptData.custom}
                onChange={(e) => handleInputChange("custom", e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="enhance" 
                checked={enhancePrompt}
                onCheckedChange={(checked: boolean) => setEnhancePrompt(checked)}
              />
              <label
                htmlFor="enhance"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Enhance prompt with AI
              </label>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="space-y-4">
              <label className="font-medium">Subject</label>
              <input
                className="w-full rounded-md border bg-background px-3 py-2"
                placeholder="Main subject of the image"
                value={promptData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-4">
                <label className="font-medium">Art Form</label>
                <Select value={promptData.artform} onValueChange={(value) => handleInputChange("artform", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="No preference" />
                  </SelectTrigger>
                  <SelectContent>
                    {artFormOptions.map((option: PromptOption) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <label className="font-medium">Photo Type</label>
                <Select value={promptData.photo_type} onValueChange={(value) => handleInputChange("photo_type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="No preference" />
                  </SelectTrigger>
                  <SelectContent>
                    {photoTypeOptions.map((option: PromptOption) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <label className="font-medium">Lighting</label>
                <Select value={promptData.lighting} onValueChange={(value) => handleInputChange("lighting", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="No preference" />
                  </SelectTrigger>
                  <SelectContent>
                    {lightingOptions.map((option: PromptOption) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <label className="font-medium">Composition</label>
                <Select value={promptData.composition} onValueChange={(value) => handleInputChange("composition", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="No preference" />
                  </SelectTrigger>
                  <SelectContent>
                    {compositionOptions.map((option: PromptOption) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <label className="font-medium">Background</label>
              <Select value={promptData.background} onValueChange={(value) => handleInputChange("background", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="No preference" />
                </SelectTrigger>
                <SelectContent>
                  {backgroundOptions.map((option: PromptOption) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleGenerate} disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <ChevronDown className="mr-2 h-4 w-4" />
                Generate Prompt
              </>
            )}
          </Button>
        </div>

        <Card>
          <CardContent className="flex flex-col p-4">
            <h2 className="font-semibold">Generated Prompt</h2>
            <p className="flex-1 py-4 text-sm text-muted-foreground">
              {generatedPrompt.enhanced || generatedPrompt.raw || "Generated prompt will appear here..."}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
