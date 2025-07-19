"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, PlusCircle, ThumbsUp, Loader2, Database } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, getDocs, Timestamp } from "firebase/firestore"
import { formatDistanceToNow } from "date-fns"
import { seedCommunityPosts } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"

const channels = [
    { name: "General Discussion", color: "bg-blue-500" },
    { name: "Field Geology", color: "bg-green-500" },
    { name: "Petrology & Mineralogy", color: "bg-yellow-500" },
    { name: "Geophysics", color: "bg-purple-500" },
    { name: "Career & Education", color: "bg-indigo-500" },
]

interface Post {
    id: string;
    author: {
        name: string;
        avatar: string;
    };
    title: string;
    category: string;
    upvotes: number;
    comments: number;
    timestamp: Date;
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast()

  const fetchPosts = async () => {
    setLoading(true);
    try {
        const querySnapshot = await getDocs(collection(db, "community-posts"));
        const postsData = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                author: data.author,
                title: data.title,
                category: data.category,
                upvotes: data.upvotes,
                comments: data.comments,
                timestamp: (data.timestamp as Timestamp).toDate(),
            };
        });
        // Sort by most recent
        postsData.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        setPosts(postsData);
    } catch (error) {
        console.error("Error fetching posts: ", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to fetch community posts.",
        })
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  
  // This effect will show a toast message when the form action completes.
  // It relies on the page re-rendering after the action.
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("seeded") === "true") {
       toast({
        title: "Success",
        description: "Sample posts have been added to the database.",
      });
       // remove the query param to avoid showing the toast on refresh
       window.history.replaceState({}, document.title, "/community");
    } else if (urlParams.get("seeded") === "false") {
         toast({
            variant: "destructive",
            title: "Already Seeded",
            description: "Sample posts have already been added.",
        })
        window.history.replaceState({}, document.title, "/community");
    }
  }, [toast]);


  const handleSeed = async (formData: FormData) => {
    const result = await seedCommunityPosts();
     if (result.success) {
      window.location.search = `?seeded=true`;
    } else {
       window.location.search = `?seeded=false&message=${encodeURIComponent(result.message || 'Error')}`;
    }
  };


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-2xl font-bold">Community Forums</h1>
            <p className="text-muted-foreground">
            Engage with fellow geoscientists, share findings, and ask questions.
            </p>
        </div>
        <div className="flex gap-2">
            <form action={handleSeed}>
                <Button type="submit">
                    <Database className="mr-2 h-4 w-4" />
                    Seed Posts
                </Button>
            </form>
            <Button disabled>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Post
            </Button>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 items-start">
        <div className="md:col-span-2 lg:col-span-3 space-y-4">
             <Card>
                <CardHeader>
                    <CardTitle>Recent Posts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {loading ? (
                        <div className="flex justify-center items-center h-48">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="text-center text-muted-foreground py-12">
                            <p>No posts yet.</p>
                            <p className="text-sm">Click "Seed Posts" to add some sample data.</p>
                        </div>
                    ) : (
                        posts.map(post => (
                            <div key={post.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-secondary/50 transition-colors">
                               <Avatar>
                                    <AvatarImage src={post.author.avatar} alt={post.author.name} data-ai-hint="person face"/>
                                    <AvatarFallback>{post.author.name.substring(0,2)}</AvatarFallback>
                               </Avatar>
                               <div className="flex-1">
                                    <h3 className="font-semibold text-lg leading-tight">{post.title}</h3>
                                    <div className="text-sm text-muted-foreground mt-1">
                                        Posted by {post.author.name} &bull; {formatDistanceToNow(post.timestamp, { addSuffix: true })}
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
                        ))
                    )}
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
