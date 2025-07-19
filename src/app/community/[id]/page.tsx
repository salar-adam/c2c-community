
"use client"

import { useState, useEffect, useTransition, useRef } from "react"
import { useParams } from "next/navigation"
import { doc, onSnapshot, collection, query, orderBy, Timestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { addCommentToPost } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"
import { formatDistanceToNow } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Loader2, MessageSquare, ThumbsUp, User, Send } from "lucide-react"

interface Post {
    id: string;
    author?: { name: string; avatar: string; };
    title: string;
    category: string;
    upvotes: number;
    comments: number;
    timestamp: Date;
    content?: string;
}

interface Comment {
    id: string;
    author: { name: string; avatar: string; };
    text: string;
    timestamp: Date;
}

export default function PostDetailPage() {
    const params = useParams()
    const postId = params.id as string
    const [post, setPost] = useState<Post | null>(null)
    const [comments, setComments] = useState<Comment[]>([])
    const [loading, setLoading] = useState(true)
    const { toast } = useToast()
    const [isPending, startTransition] = useTransition()
    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        if (!postId) return;

        setLoading(true)
        const postRef = doc(db, "community-posts", postId);
        const unsubscribePost = onSnapshot(postRef, (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                setPost({
                    id: doc.id,
                    ...data,
                    timestamp: (data.timestamp as Timestamp)?.toDate() || new Date(),
                } as Post);
            } else {
                // Handle post not found
                setPost(null)
            }
            setLoading(false);
        });

        const commentsQuery = query(collection(db, `community-posts/${postId}/comments`), orderBy("timestamp", "asc"));
        const unsubscribeComments = onSnapshot(commentsQuery, (snapshot) => {
            const commentsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                timestamp: (doc.data().timestamp as Timestamp)?.toDate() || new Date(),
            } as Comment));
            setComments(commentsData);
        });

        return () => {
            unsubscribePost();
            unsubscribeComments();
        };
    }, [postId]);

    const handleCommentSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const result = await addCommentToPost(postId, formData)
            if (result.success) {
                toast({ title: "Success", description: result.message })
                formRef.current?.reset()
            } else {
                toast({ variant: "destructive", title: "Error", description: result.message || "Could not post comment." })
            }
        })
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        )
    }

    if (!post) {
        return (
            <div className="text-center py-12">
                <h1 className="text-2xl font-bold">Post not found</h1>
                <p className="text-muted-foreground">The post you are looking for does not exist.</p>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Card>
                <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">{post.category}</Badge>
                    <CardTitle className="text-3xl">{post.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 pt-2">
                        <Avatar className="h-6 w-6">
                            {post.author ? (
                                <>
                                    <AvatarImage src={post.author.avatar} alt={post.author.name} data-ai-hint="person face" />
                                    <AvatarFallback>{post.author.name?.substring(0, 2) || 'U'}</AvatarFallback>
                                </>
                            ) : (
                                <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                            )}
                        </Avatar>
                        <span>{post.author?.name || "Unknown Author"} &bull; {formatDistanceToNow(post.timestamp, { addSuffix: true })}</span>
                    </CardDescription>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                    <p>{post.content}</p>
                </CardContent>
                <CardFooter className="gap-4">
                    <Button variant="outline" disabled>
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        Upvote ({post.upvotes})
                    </Button>
                    <Button variant="outline" disabled>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Comment ({post.comments})
                    </Button>
                </CardFooter>
            </Card>

            <Separator />

            <div className="space-y-4">
                <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>
                {/* Add comment form */}
                <form action={handleCommentSubmit} ref={formRef} className="flex items-start gap-4">
                    <Avatar>
                        <AvatarImage src="https://placehold.co/100x100.png" alt="Salar" data-ai-hint="person face"/>
                        <AvatarFallback>S</AvatarFallback>
                    </Avatar>
                    <Textarea
                        name="comment"
                        placeholder="Add a comment..."
                        rows={2}
                        required
                        className="flex-1"
                    />
                    <Button type="submit" disabled={isPending}>
                        {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                        Post
                    </Button>
                </form>

                {/* Comments list */}
                <div className="space-y-6">
                    {comments.map(comment => (
                        <div key={comment.id} className="flex items-start gap-4">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={comment.author.avatar} alt={comment.author.name} data-ai-hint="person face"/>
                                <AvatarFallback>{comment.author.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="font-semibold">{comment.author.name}</span>
                                    <span className="text-muted-foreground">&bull; {formatDistanceToNow(comment.timestamp, { addSuffix: true })}</span>
                                </div>
                                <p className="text-muted-foreground mt-1">{comment.text}</p>
                            </div>
                        </div>
                    ))}
                    {comments.length === 0 && (
                        <p className="text-muted-foreground text-center py-4">No comments yet. Be the first to comment!</p>
                    )}
                </div>
            </div>
        </div>
    )
}
