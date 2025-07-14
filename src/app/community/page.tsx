import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Hash, Globe, MessageSquare } from "lucide-react";

const forums = [
  {
    title: "General Geology",
    description: "Discuss all things geology, from basic concepts to complex theories.",
    posts: "1.2k",
    members: "5.8k",
  },
  {
    title: "Fieldwork & Techniques",
    description: "Share tips, tricks, and stories from your adventures in the field.",
    posts: "780",
    members: "3.2k",
  },
  {
    title: "Career & Education Advice",
    description: "Ask for guidance on academic paths, jobs, and professional development.",
    posts: "450",
    members: "4.1k",
  },
  {
    title: "Petrology & Mineralogy",
    description: "A deep dive into the world of rocks and minerals.",
    posts: "980",
    members: "2.9k",
  },
];

const channels = [
  {
    name: "North America",
    icon: Globe,
  },
  {
    name: "Europe",
    icon: Globe,
  },
  {
    name: "Asia",
    icon: Globe,
  },
  {
    name: "South America",
    icon: Globe,
  },
  {
    name: "Africa",
    icon: Globe,
  },
  {
    name: "Oceania",
    icon: Globe,
  },
];


export default function CommunityPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3 space-y-6">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Community Forums</h1>
            <p className="mt-2 text-muted-foreground">
                Engage in discussions, share your knowledge, and connect with peers.
            </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {forums.map((forum) => (
            <Card key={forum.title}>
              <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="bg-secondary p-3 rounded-full">
                        <Hash className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{forum.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{forum.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between text-sm text-muted-foreground">
                <span>{forum.posts} posts</span>
                <span>{forum.members} members</span>
                <Button size="sm" variant="outline">Join</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <div>
            <h2 className="text-2xl font-bold tracking-tight">Regional Channels</h2>
            <p className="mt-2 text-muted-foreground">
                Connect with geoscientists in your area.
            </p>
        </div>
        <Card>
          <CardContent className="p-4 space-y-2">
            {channels.map((channel) => (
              <Button key={channel.name} variant="ghost" className="w-full justify-start">
                <channel.icon className="mr-2 h-4 w-4" />
                {channel.name}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
