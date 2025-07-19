"use client"

import { useState, useEffect, useTransition } from "react" // Added useTransition back
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, PlusCircle, ThumbsUp, Loader2, User, DatabaseZap } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { createCommunityPost, seedCommunityPosts } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { db } from "@/lib/firebase"
import { collection, Timestamp, query, orderBy, onSnapshot } from "firebase/firestore"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const channels = [
    { name: "General Discussion", color: "bg-blue-500" },
    { name: "Field Geology", color: "bg-green-500" },
    { name: "Petrology & Mineralogy", color: "bg-yellow-500" },
    { name: "Geophysics", color: "bg-purple-500" },
    { name: "Career & Education", color: "bg-indigo-500" },
]

interface Post {
    id: string;
    author?: {
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
    const [activeTab, setActiveTab] = useState("recent");
    const { toast } = useToast()
    const [isSeeding, startSeedingTransition] = useTransition();

    useEffect(() => {
        setLoading(true);
        const postsCollection = collection(db, "community-posts");
        const q = activeTab === 'recent'
            ? query(postsCollection, orderBy("timestamp", "desc"))
            : query(postsCollection, orderBy("upvotes", "desc"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const postsData = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    author: data.author,
                    title: data.title,
                    category: data.category,
                    upvotes: data.upvotes,
                    comments: data.comments,
                    timestamp: (data.timestamp as Timestamp)?.toDate() || new Date(),
                    content: data.content,
                };
            });
            setPosts(postsData);
            setLoading(false);
        }, (error) => {
            console.error(`Error fetching ${activeTab} posts in real-time: `, error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to fetch posts. Please check your Firestore security rules.",
            })
            setLoading(false);
        });

        return () => unsubscribe();
    }, [activeTab, toast]);

    const handleSeed = () => {
        startSeedingTransition(async () => {
            const result = await seedCommunityPosts();
            if (result.success) {
                toast({
                    title: "Success",
                    description: result.message,
                });
            } else if (result.message) { 
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: result.message,
                })
            }
        });
    }
  
  const renderPostList = (postsToList: Post[]) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center h-48">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }
    if (postsToList.length === 0) {
        return (
          <div className="text-center text-muted-foreground py-12">
            <p>No posts yet.</p>
            <p className="text-sm">Click "Seed Posts" to add some sample data or create your own.</p>
          </div>
        );
    }
    return postsToList.map(post => (
        <Link key={post.id} href={`/community/${post.id}`}>
            <div className="block">
                <div className="flex items-start gap-4 p-4 border rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
                   <Avatar>
                        {post.author ? (
                            <>
                                <AvatarImage src={post.author.avatar} alt={post.author.name} data-ai-hint="person face"/>
                                <AvatarFallback>{post.author.name?.substring(0,2) || 'U'}</AvatarFallback>
                            </>
                        ) : (
                            <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                        )}
                   </Avatar>
                   <div className="flex-1">
                        <h3 className="font-semibold text-lg leading-tight">{post.title}</h3>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{post.content}</p>
                        <div className="text-sm text-muted-foreground mt-2">
                            Posted by {post.author?.name || "Unknown Author"} &bull; {post.timestamp ? formatDistanceToNow(post.timestamp, { addSuffix: true }) : '...'}
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
            </div>
        </Link>
    ));
  }

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
            <Button onClick={handleSeed} disabled={isSeeding} variant="outline">
                {isSeeding ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <DatabaseZap className="mr-2 h-4 w-4" />}
                Seed Posts
            </Button>
            <CreatePostDialog />
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 items-start">
        <div className="md:col-span-2 lg:col-span-3 space-y-4">
             <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList>
                    <TabsTrigger value="recent">Recent</TabsTrigger>
                    <TabsTrigger value="popular">Popular</TabsTrigger>
                </TabsList>
                <TabsContent value="recent" className="mt-4">
                     <Card>
                        <CardHeader>
                            <CardTitle>Recent Posts</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           {renderPostList(posts)}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="popular" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Popular Posts</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           {renderPostList(posts)}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
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

function CreatePostDialog() {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();
    
    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const result = await createCommunityPost(formData);
            if (result.success) {
                toast({ title: "Success", description: result.message });
                setOpen(false);
            } else {
                toast({ variant: "destructive", title: "Error", description: result.message || "An unexpected error occurred." });
            }
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
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
                    action={handleSubmit}
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
                        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Submit Post
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
