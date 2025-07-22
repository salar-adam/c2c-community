
'use client';

import { useEffect, useState, useTransition } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc, collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, Timestamp, updateDoc, increment } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ThumbsUp, MessageSquare, Loader2, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toggleUpvote } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface Post {
    id: string;
    author?: {
        name: string;
        avatar: string;
    };
    title: string;
    category: string;
    upvotes: number;
    upvotedBy?: string[];
    comments: number;
    timestamp: Date;
    content?: string;
}

interface Comment {
    id: string;
    author: {
        uid: string;
        name: string;
        avatar: string;
    };
    content: string;
    timestamp: Date;
}

export default function PostPage() {
    const { postId } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);
    const [isUpvoting, startUpvoteTransition] = useTransition();
    const { toast } = useToast();

    const [user, authLoading] = useAuthState(auth);

    const hasUpvoted = post?.upvotedBy?.includes(user?.uid || '');

    useEffect(() => {
        if (!postId) {
            setLoading(false);
            return;
        }

        const postDocRef = doc(db, 'community-posts', postId as string);
        
        const unsubscribePost = onSnapshot(postDocRef, (postDocSnap) => {
            if (postDocSnap.exists()) {
                const data = postDocSnap.data();
                setPost({
                    id: postDocSnap.id,
                    author: data.author,
                    title: data.title,
                    category: data.category,
                    upvotes: data.upvotes,
                    upvotedBy: data.upvotedBy || [],
                    comments: data.comments,
                    timestamp: (data.timestamp as Timestamp)?.toDate() || new Date(),
                    content: data.content,
                });
                setError(null);
            } else {
                setError('Post not found');
            }
            setLoading(false);
        }, (err) => {
            console.error('Error fetching post:', err);
            setError('Failed to load post.');
            setLoading(false);
        });

        const commentsCollectionRef = collection(db, 'community-posts', postId as string, 'comments');
        const q = query(commentsCollectionRef, orderBy('timestamp', 'asc'));

        const unsubscribeComments = onSnapshot(q, (querySnapshot) => {
            const commentsData = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    author: data.author,
                    content: data.content,
                    timestamp: (data.timestamp as Timestamp)?.toDate() || new Date(),
                } as Comment;
            });
            setComments(commentsData);
        }, (error) => {
            console.error('Error fetching comments:', error);
            toast({
                variant: 'destructive',
                title: "Error",
                description: "Failed to load comments."
            })
        });

        return () => {
            unsubscribePost();
            unsubscribeComments();
        };
    }, [postId, toast]);

    const handleCommentSubmit = async () => {
        if (!newComment.trim() || !postId || !user) {
            toast({
                variant: 'destructive',
                title: "Cannot submit comment",
                description: "You must be logged in to comment.",
            })
            return;
        }

        setIsSubmittingComment(true);

        try {
            const commentsCollectionRef = collection(db, 'community-posts', postId as string, 'comments');
            await addDoc(commentsCollectionRef, {
                author: {
                    uid: user.uid,
                    name: user.displayName || 'Anonymous User',
                    avatar: user.photoURL || `https://placehold.co/100x100.png?text=${user.displayName?.charAt(0) || 'U'}`,
                },
                content: newComment,
                timestamp: serverTimestamp(),
            });
            
            const postDocRef = doc(db, 'community-posts', postId as string);
            await updateDoc(postDocRef, {
                comments: increment(1)
            });

            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
            toast({
                variant: 'destructive',
                title: "Error",
                description: "Could not submit your comment. Please try again."
            })
        } finally {
            setIsSubmittingComment(false);
        }
    };

    const handleUpvote = () => {
        if (!user || !postId) {
            toast({
                variant: "destructive",
                title: "Login Required",
                description: "You must be logged in to upvote posts.",
            });
            return;
        }
        startUpvoteTransition(async () => {
            const result = await toggleUpvote(postId as string, user.uid);
            if (!result.success) {
                toast({
                    variant: "destructive",
                    title: "Upvote Failed",
                    description: result.message,
                });
            }
        });
    };

    if (loading || authLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-destructive mt-8">{error}</div>;
    }

    if (!post) {
        return <div className="text-center text-muted-foreground mt-8">Post not found.</div>;
    }

    return (
        <div className="container mx-auto py-8">
            <Card>
                <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground mt-2">
                         <Avatar className="h-6 w-6 mr-2">
                            {post.author ? (
                                <>
                                    <AvatarImage src={post.author.avatar} alt={post.author.name} data-ai-hint="person face"/>
                                    <AvatarFallback>{post.author.name?.substring(0,2) || 'U'}</AvatarFallback>
                                </>
                            ) : (
                                <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                            )}
                       </Avatar>
                        Posted by {post.author?.name || "Unknown Author"} &bull; {post.timestamp ? formatDistanceToNow(post.timestamp, { addSuffix: true }) : '...'}
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Badge variant="secondary">{post.category}</Badge>
                    <p className="text-lg whitespace-pre-wrap">{post.content}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleUpvote}
                            disabled={isUpvoting || !user}
                            className={cn(
                                "flex items-center gap-1",
                                hasUpvoted && "text-primary"
                            )}
                        >
                            <ThumbsUp className={cn("h-4 w-4", hasUpvoted && "fill-current")} />
                            <span>{post.upvotes}</span>
                        </Button>
                        <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{comments.length}</span>
                        </div>
                    </div>
                    {/* Comments Section */}
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-4">Comments</h3>
                        <div className="space-y-4">
                            {comments.length === 0 ? (
                                <div className="text-center text-muted-foreground pt-4">
                                    No comments yet. Be the first to comment!
                                </div>
                            ) : (
                                comments.map(comment => (
                                    <div key={comment.id} className="border-t pt-4">

                                        <div className="flex items-start gap-3">
                                             <Avatar className="h-7 w-7">
                                                {comment.author?.avatar ? (
                                                    <AvatarImage src={comment.author.avatar} alt={comment.author.name} data-ai-hint="person face"/>
                                                ) : (
                                                     <AvatarFallback>{comment.author?.name?.substring(0,2) || 'U'}</AvatarFallback>
                                                )}
                                            </Avatar>
                                            <div>
                                                <div className="font-semibold text-sm">{comment.author?.name || "Unknown User"}</div>
                                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{comment.content}</p>
                                                <div className="text-xs text-muted-foreground mt-1">{comment.timestamp ? formatDistanceToNow(comment.timestamp, { addSuffix: true }) : '...'}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                             {/* Comment Form */}
                            {user && (
                                <div className="mt-4 border-t pt-4">
                                    <h4 className="text-lg font-semibold mb-2">Add a Comment</h4>
                                    <Textarea
                                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                        rows={3}
                                        placeholder="Write your comment here..."
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        disabled={isSubmittingComment}
                                    />
                                    <Button
                                        className="mt-2"
                                        onClick={handleCommentSubmit}
                                        disabled={!newComment.trim() || isSubmittingComment}
                                    >
                                        {isSubmittingComment ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                        Submit Comment
                                    </Button>
                                </div>
                            )}
                             {!user && !authLoading && (
                                <div className="text-center text-muted-foreground mt-4 border-t pt-4">Please log in to comment.</div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
