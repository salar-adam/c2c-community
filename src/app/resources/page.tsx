import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, Database, Map } from "lucide-react";
import Image from "next/image";

const resources = [
    {
        title: "Field Guide to Sedimentary Structures",
        type: "Field Guide",
        icon: Map,
        author: "Dr. Alex Chen",
        description: "A comprehensive visual guide to identifying structures in the field.",
        image: "https://placehold.co/600x400.png",
        aiHint: "geology book",
    },
    {
        title: "Global Volcanic Eruptions Dataset",
        type: "Dataset",
        icon: Database,
        author: "USGS",
        description: "A dataset covering all recorded volcanic eruptions from 1900-present.",
        image: "https://placehold.co/600x400.png",
        aiHint: "data graph",
    },
    {
        title: "Tectonics of the Himalayas: A Review",
        type: "Research Paper",
        icon: BookOpen,
        author: "Dr. Priya Singh",
        description: "A peer-reviewed paper summarizing the last decade of research on Himalayan orogeny.",
        image: "https://placehold.co/600x400.png",
        aiHint: "mountain range",
    },
    {
        title: "Interactive Geologic Time Scale",
        type: "Learning Tool",
        icon: Map,
        author: "GeoNexus Learning",
        description: "An interactive web tool for exploring the geologic time scale with key events.",
        image: "https://placehold.co/600x400.png",
        aiHint: "geology chart",
    }
]

export default function ResourcesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Knowledge & Resource Hub
        </h1>
        <p className="mt-2 text-muted-foreground">
          Access curated research, field guides, datasets, and learning tracks.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search for resources..." className="pl-10" />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((res) => (
            <Card key={res.title} className="flex flex-col">
                <CardHeader className="p-0">
                    <div className="relative h-48 w-full">
                        <Image src={res.image} alt={res.title} layout="fill" objectFit="cover" className="rounded-t-lg" data-ai-hint={res.aiHint} />
                    </div>
                </CardHeader>
                <div className="p-6 flex flex-col flex-grow">
                    <CardDescription className="flex items-center gap-2 text-sm font-medium text-primary">
                        <res.icon className="h-4 w-4"/>
                        {res.type}
                    </CardDescription>
                    <CardTitle className="mt-2">{res.title}</CardTitle>
                    <CardContent className="p-0 pt-2 flex-grow">
                        <p className="text-sm text-muted-foreground">{res.description}</p>
                    </CardContent>
                    <CardFooter className="p-0 pt-4 flex justify-between items-center">
                        <p className="text-xs text-muted-foreground">By {res.author}</p>
                        <Button variant="outline" size="sm">Access</Button>
                    </CardFooter>
                </div>
            </Card>
        ))}
      </div>
    </div>
  );
}
