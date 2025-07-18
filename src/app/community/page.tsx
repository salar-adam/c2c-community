"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Book, MessageSquare, PlusCircle, ThumbsUp } from "lucide-react"

const channels = [
    { name: "General Discussion", color: "bg-blue-500" },
    { name: "Field Geology", color: "bg-green-500" },
    { name: "Petrology & Mineralogy", color: "bg-yellow-500" },
    { name: "Geophysics", color: "bg-purple-500" },
    { name: "Career & Education", color: "bg-indigo-500" },
]

const posts = [
  {
    id: 1,
    author: {
      name: "Alex Johnson",
      avatar: "https://placehold.co/100x100.png?text=AJ",
    },
    title: "Interesting sedimentary structures found in the Grand Canyon",
    category: "Field Geology",
    upvotes: 128,
    comments: 23,
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    author: {
      name: "Maria Garcia",
      avatar: "https://placehold.co/100x100.png?text=MG",
    },
    title: "Best software for 3D geological modeling?",
    category: "Geophysics",
    upvotes: 95,
    comments: 42,
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    author: {
      name: "Salar",
      avatar: "https://placehold.co/100x100.png",
    },
    title: "Tips for recent geology graduates on landing the first job",
    category: "Career & Education",
    upvotes: 210,
    comments: 78,
    timestamp: "1 day ago",
  },
   {
    id: 4,
    author: {
      name: "Chen Wang",
      avatar: "https://placehold.co/100x100.png?text=CW",
    },
    title: "Debate: Is Pluto a planet? (Geologist's take)",
    category: "General Discussion",
    upvotes: 45,
    comments: 112,
    timestamp: "2 days ago",
  },
]

export default function CommunityPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-2xl font-bold">Community Forums</h1>
            <p className="text-muted-foreground">
            Engage with fellow geoscientists, share findings, and ask questions.
            </p>
        </div>
        <Button disabled>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Post
        </Button>
      </div>
      
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 items-start">
        <div className="md:col-span-2 lg:col-span-3 space-y-4">
             <Card>
                <CardHeader>
                    <CardTitle>Recent Posts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {posts.map(post => (
                        <div key={post.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-secondary/50 transition-colors">
                           <Avatar>
                                <AvatarImage src={post.author.avatar} alt={post.author.name} data-ai-hint="person face"/>
                                <AvatarFallback>{post.author.name.substring(0,2)}</AvatarFallback>
                           </Avatar>
                           <div className="flex-1">
                                <h3 className="font-semibold text-lg leading-tight">{post.title}</h3>
                                <div className="text-sm text-muted-foreground mt-1">
                                    Posted by {post.author.name} &bull; {post.timestamp}
                                </div>
                                <div className="flex items-center gap-4 mt-2 text-sm">
                                    <Badge variant="secondary">{post.category}</Badge>
                                    <div className="flex items-center gap-1 text-muted-foreground">
                                        <ThumbsUp className="h-4 w-4" />
                                        <span>{post.upvotes}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-muted-foreground">
                                        <MessageSquare className="h-4 w-4" />
                                        <span>{post.comments}</span>
                                    </div>
                                </div>
                           </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Channels</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    {channels.map(channel => (
                        <Button key={channel.name} variant="ghost" className="w-full justify-start gap-2" disabled>
                           <span className={`h-2 w-2 rounded-full ${channel.color}`} />
                           {channel.name}
                        </Button>
                    ))}
                </CardContent>
            </Card>
        </div>
      </div>

    </div>
  )
}
