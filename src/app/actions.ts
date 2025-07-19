'use client';

// import { revalidatePath } from 'next/cache'; // Removed revalidatePath import
import { db } from '@/lib/firebase'; // Import client-side db
import { doc, updateDoc, arrayRemove, arrayUnion, increment, collection, addDoc, serverTimestamp, getDoc } from 'firebase/firestore'; // Import client-side Firestore functions
import { getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


// Note: For security and best practices, some of these actions
// might be better implemented as server-side functions (e.g., Firebase Functions)
// especially for operations that involve sensitive data or require elevated privileges.
// However, for the purpose of making the client-side functionality work, we're
// demonstrating how to use the client-side SDK.


// Function to toggle upvote on a community post
export async function toggleUpvote(postId: string, userId: string) {
    if (!userId) {
        return { success: false, message: "User not authenticated." };
    }

    const postRef = doc(db, 'community-posts', postId); // Use client-side doc

    try {
        const postDoc = await getDoc(postRef);

        if (!postDoc.exists()) {
            return { success: false, message: "Post not found" };
        }

        const postData = postDoc.data();
        const upvotedBy = postData?.upvotedBy || [];

        let newUpvotesCount;

        if (upvotedBy.includes(userId)) {
            // User has already upvoted, so remove upvote
            await updateDoc(postRef, {
                upvotedBy: arrayRemove(userId), // Use client-side arrayRemove
                upvotes: increment(-1), // Use client-side increment
            });
            newUpvotesCount = (postData?.upvotes || 1) - 1;
        } else {
            // User has not upvoted, so add upvote
            await updateDoc(postRef, {
                upvotedBy: arrayUnion(userId), // Use client-side arrayUnion
                upvotes: increment(1), // Use client-side increment
            });
            newUpvotesCount = (postData?.upvotes || 0) + 1;
        }

        // Note: revalidatePath only works in Server Actions
        // revalidatePath(`/community/${postId}`); // Removed revalidatePath usage

        return { success: true, message: "Upvote toggled.", upvotes: newUpvotesCount };
    } catch (error: any) {
        console.error('Error toggling upvote: ', error);
        return { success: false, message: `An error occurred while toggling the upvote: ${error.message}` };
    }
}

// The following functions were originally using the Admin SDK
// and should be reviewed for proper implementation (client-side or secure server-side)

export async function submitJoinRequest(formData: FormData) {
    console.error("submitJoinRequest needs to be implemented with client-side or a secure server-side method.");
    return { success: false, message: "Join request submission is not fully implemented."}
}

export async function submitEliteInvite(formData: FormData) {
    console.error("submitEliteInvite needs to be implemented with client-side or a secure server-side method.");
    return { success: false, message: "Elite invite submission is not fully implemented."}
}

export async function addRockSample(data: { name: string; type: string; locationFound: string; image: string; }) {
    console.error("addRockSample needs to be implemented with client-side or a secure server-side method.");
    return { success: false, message: "Rock sample submission is not fully implemented."}
}

export async function createCommunityPost(formData: FormData) {
     console.error("createCommunityPost needs to be implemented with client-side or a secure server-side method.");
     return { success: false, message: "Community post creation is not fully implemented."}
}

export async function addExpertQuestion(formData: FormData) {
     console.error("addExpertQuestion needs to be implemented with client-side or a secure server-side method.");
     return { success: false, message: "Expert question submission is not fully implemented."}
}

export async function seedCommunityPosts() {
     console.error("seedCommunityPosts needs to be implemented with a secure server-side method.");
     return { success: false, message: "Seeding posts is not fully implemented."}
}

export async function seedResources() {
     console.error("seedResources needs to be implemented with a secure server-side method.");
     return { success: false, message: "Seeding resources is not fully implemented."}
}

export async function seedExpertQuestions() {
     console.error("seedExpertQuestions needs to be implemented with a secure server-side method.");
     return { success: false, message: "Seeding expert questions is not fully implemented."}
}
