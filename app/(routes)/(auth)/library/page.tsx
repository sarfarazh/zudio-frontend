"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Film, Music } from "lucide-react";

const mockData = {
  images: Array(6).fill({
    url: "https://via.placeholder.com/300",
    title: "Generated Image",
    date: "2024-02-08",
  }),
  videos: Array(4).fill({
    url: "https://via.placeholder.com/300",
    title: "Generated Video",
    date: "2024-02-08",
  }),
  audio: Array(3).fill({
    url: "#",
    title: "Generated Audio",
    date: "2024-02-08",
  }),
};

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState("images");

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Media Library</h1>
      
      <Tabs defaultValue="images" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="images" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            Images
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Film className="h-4 w-4" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="audio" className="flex items-center gap-2">
            <Music className="h-4 w-4" />
            Audio
          </TabsTrigger>
        </TabsList>

        <TabsContent value="images">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockData.images.map((item, index) => (
              <div
                key={index}
                className="rounded-lg border bg-card overflow-hidden"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="videos">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockData.videos.map((item, index) => (
              <div
                key={index}
                className="rounded-lg border bg-card overflow-hidden"
              >
                <div className="aspect-video bg-muted relative">
                  <Film className="absolute inset-0 m-auto h-8 w-8 text-muted-foreground" />
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="audio">
          <div className="space-y-4">
            {mockData.audio.map((item, index) => (
              <div
                key={index}
                className="flex items-center p-4 rounded-lg border bg-card"
              >
                <Music className="h-8 w-8 mr-4 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 