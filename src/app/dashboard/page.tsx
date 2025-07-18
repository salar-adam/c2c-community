
"use client"

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, Trophy, BookCopy, ThumbsUp, MessageSquare } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { useState, useEffect } from "react"

const recentActivityData = [
    {
      author: { name: "Alex Johnson", avatar: "https://placehold.co/100x100.png?text=AJ" },
      title: "Interesting sedimentary structures found in the Grand Canyon",
      upvotes: 128,
      comments: 23,
      timestamp: new Date(),
    },
]

const upcomingEventsData = [
    {
      title: "Webinar: Advances in Seismic Imaging",
      date: new Date(new Date().setDate(new Date().getDate() + 7)),
      location: "Online",
    },
    {
      title: "Annual Geosciences Conference 2024",
      date: new Date(new Date().setDate(new Date().getDate() + 14)),
      location: "Houston, TX",
    }
]

const topContributorsData = [
    { rank: 1, name: "Salar", avatar: "https://placehold.co/100x100.png", xp: 15230 },
    { rank: 2, name: "Dr. Evelyn Reed", avatar: "https://placehold.co/100x100.png?text=ER", xp: 14890 },
    { rank: 3, name: "Chen Wang", avatar: "https://placehold.co/100x100.png?text=CW", xp: 14500 },
    { rank: 4, name: "Alex Johnson", avatar: "https://placehold.co/100x100.png?text=AJ", xp: 12100 },
]

const featuredResourceData = {
    title: "Seismic Stratigraphy of the North Sea",
    description: "A comprehensive analysis of seismic data and stratigraphic sequences in the Viking Graben.",
    type: "Research Paper",
}


export default function DashboardPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, here's a snapshot of your GeoNexus community.
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 auto-rows-fr">
        {/* Community Widget */}
        <div className="lg:col-span-3">
            <Card className="h-full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5"/> Community</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {recentActivityData.map((post, index) => (
                        <div key={index} className="flex items-start gap-4 p-3 border rounded-lg hover:bg-secondary/50 transition-colors">
                           <Avatar>
                                <AvatarImage src={post.author.avatar} alt={post.author.name} data-ai-hint="person face"/>
                                <AvatarFallback>{post.author.name.substring(0,2)}</AvatarFallback>
                           </Avatar>
                           <div className="flex-1">
                                <h3 className="font-semibold leading-tight">{post.title}</h3>
                                <div className="text-sm text-muted-foreground mt-1">
                                    Posted by {post.author.name} &bull; {isClient ? formatDistanceToNow(post.timestamp, { addSuffix: true }) : '...'}
                                </div>
                                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <ThumbsUp className="h-4 w-4" />
                                        <span>{post.upvotes}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MessageSquare className="h-4 w-4" />
                                        <span>{post.comments}</span>
                                    </div>
                                </div>
                           </div>
                        </div>
                    ))}
                </CardContent>
                 <CardFooter>
                    <Button asChild variant="outline">
                        <Link href="/community">Community</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>

        {/* Featured Resource Widget */}
        <div className="lg:col-span-2">
            <Card className="h-full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BookCopy className="h-5 w-5"/> Featured Resource</CardTitle>
                </CardHeader>
                <CardContent>
                    <h3 className="font-semibold">{featuredResourceData.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{featuredResourceData.description}</p>
                    <Badge variant="secondary" className="mt-3">{featuredResourceData.type}</Badge>
                </CardContent>
                <CardFooter>
                    <Button asChild variant="outline">
                        <Link href="/resources">Resources</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
        
        {/* Top Contributors Widget */}
        <div className="lg:col-span-1 row-span-2">
             <Card className="h-full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Trophy className="h-5 w-5"/> Top Contributors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {topContributorsData.map((user) => (
                         <div key={user.rank} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="font-bold w-4 text-muted-foreground">{user.rank}</span>
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="person face" />
                                    <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium text-sm">{user.name}</span>
                            </div>
                            <span className="font-mono text-xs text-muted-foreground">{user.xp.toLocaleString()} XP</span>
                        </div>
                    ))}
                </CardContent>
                 <CardFooter>
                    <Button asChild variant="outline" size="sm">
                        <Link href="/leaderboard">Leaderboard</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>

        {/* Upcoming Events Widget */}
         <div className="lg:col-span-2">
            <Card className="h-full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5"/> Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {upcomingEventsData.map((event, index) => (
                        <div key={index}>
                            <p className="font-semibold">{event.title}</p>
                            <p className="text-sm text-muted-foreground">{event.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} &bull; {event.location}</p>
                        </div>
                    ))}
                </CardContent>
                 <CardFooter>
                    <Button asChild variant="outline" size="sm">
                        <Link href="/events">Events</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>

      </div>
    </div>
  )
}
