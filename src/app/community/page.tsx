"use client"

import { useState, useEffect, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, PlusCircle, ThumbsUp, Loader2, Database } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, getDocs, Timestamp } from "firebase/firestore"
import { formatDistanceToNow } from "date-fns"
import { seedCommunityPosts, createCommunityPost } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
    content?: string;
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
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
                content: data.content,
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
  
  const handleSeed = async () => {
    await seedCommunityPosts();
    await fetchPosts();
    toast({
        title: "Success",
        description: "Sample posts added successfully.",
    });
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
                <Button>
                    <Database className="mr-2 h-4 w-4" />
                    Seed Posts
                </Button>
            </form>
            <CreatePostDialog open={dialogOpen} onOpenChange={setDialogOpen} onPostCreated={fetchPosts}/>
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
                                    <p className="text-sm text-muted-foreground mt-2">{post.content}</p>
                                    <div className="text-sm text-muted-foreground mt-2">
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

function CreatePostDialog({ open, onOpenChange, onPostCreated }: { open: boolean, onOpenChange: (open: boolean) => void, onPostCreated: () => void }) {
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Post
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a New Post</DialogTitle>
                    <DialogDescription>
                        Share your thoughts, questions, or findings with the community.
                    </DialogDescription>
                </DialogHeader>
                <form 
                    ref={formRef}
                    action={async (formData) => {
                        const result = await createCommunityPost(formData);
                        if (result.success) {
                            toast({ title: "Success", description: result.message });
                            onOpenChange(false);
                            onPostCreated();
                            formRef.current?.reset();
                        } else {
                            toast({ variant: "destructive", title: "Error", description: result.message });
                        }
                    }}
                    className="space-y-4"
                >
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" placeholder="Enter a descriptive title" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select name="category" required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {channels.map(channel => (
                                    <SelectItem key={channel.name} value={channel.name}>{channel.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="content">Content</Label>
                        <Textarea id="content" name="content" placeholder="Write your post here..." rows={6} required />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
                        <Button type="submit">Submit Post</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
