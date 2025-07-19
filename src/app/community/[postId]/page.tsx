
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc, collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore'; // Added collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, Timestamp
import { db } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ThumbsUp, MessageSquare, Loader2, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

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

interface Comment {
    id: string;
    author: {
        name: string;
        avatar: string;
    };
    content: string;
    timestamp: Date;
}

export default function PostPage() {
    const { postId } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]); // State for comments
    const [newComment, setNewComment] = useState(''); // State for new comment input
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSubmittingComment, setIsSubmittingComment] = useState(false); // State for comment submission loading

    // Placeholder for getting current user information
    // You will need to replace this with your actual authentication logic
    const currentUser = {
        name: 'Salar',
        avatar: 'https://placehold.co/100x100.png',
    };


    useEffect(() => {
        if (!postId) {
            setLoading(false);
            return;
        }

        const fetchPost = async () => {
            try {
                const postDocRef = doc(db, 'community-posts', postId as string);
                const postDocSnap = await getDoc(postDocRef);

                if (postDocSnap.exists()) {
                    const data = postDocSnap.data();
                    setPost({
                        id: postDocSnap.id,
                        author: data.author,
                        title: data.title,
                        category: data.category,
                        upvotes: data.upvotes,
                        comments: data.comments,
                        timestamp: (data.timestamp as Timestamp)?.toDate() || new Date(),
                        content: data.content,
                    });
                } else {
                    setError('Post not found');
                }
            } catch (err) {
                console.error('Error fetching post:', err);
                setError('Failed to load post.');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId]);

     // Effect to fetch comments
     useEffect(() => {
        if (!postId) return;

        const commentsCollectionRef = collection(db, 'community-posts', postId as string, 'comments');
        const q = query(commentsCollectionRef, orderBy('timestamp', 'asc')); // Order comments by timestamp

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const commentsData = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    author: data.author,
                    content: data.content,
                    timestamp: (data.timestamp as Timestamp)?.toDate() || new Date(),
                };
            });
            setComments(commentsData);
        }, (error) => {
            console.error('Error fetching comments:', error);
            // Optionally show a toast notification for comment fetching error
        });

        return () => unsubscribe(); // Unsubscribe when the component unmounts
    }, [postId]);


    const handleCommentSubmit = async () => {
        if (!newComment.trim() || !postId || !currentUser) {
            // Prevent submitting empty comments or if user is not logged in
            return;
        }

        setIsSubmittingComment(true);

        try {
            const commentsCollectionRef = collection(db, 'community-posts', postId as string, 'comments');
            await addDoc(commentsCollectionRef, {
                author: {
                    name: currentUser.name,
                    avatar: currentUser.avatar,
                },
                content: newComment,
                timestamp: serverTimestamp(), // Use serverTimestamp for accurate timing
            });

            setNewComment(''); // Clear the input field
        } catch (error) {
            console.error('Error adding comment:', error);
            // Optionally show a toast notification for the error
        } finally {
            setIsSubmittingComment(false);
        }
    };


    if (loading) {
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
                    <p className="text-lg">{post.content}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{post.upvotes}</span>
                        </div>
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
                                                <p className="text-sm text-muted-foreground">{comment.content}</p>
                                                <div className="text-xs text-muted-foreground mt-1">{comment.timestamp ? formatDistanceToNow(comment.timestamp, { addSuffix: true }) : '...'}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                             {/* Comment Form */}
                            {currentUser && ( // Only show the comment form if a user is logged in
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
                             {!currentUser && (
                                <div className="text-center text-muted-foreground mt-4">Please log in to comment.</div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

