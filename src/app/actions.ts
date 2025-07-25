
'use client';

import { db, auth } from '@/lib/firebase';
import { doc, updateDoc, arrayRemove, arrayUnion, increment, collection, addDoc, serverTimestamp, getDoc } from 'firebase/firestore';

export async function toggleUpvote(postId: string, userId: string) {
    if (!userId) {
        return { success: false, message: "User not authenticated." };
    }
    const postRef = doc(db, 'community-posts', postId);
    try {
        const postDoc = await getDoc(postRef);
        if (!postDoc.exists()) {
            return { success: false, message: "Post not found" };
        }
        const postData = postDoc.data();
        const upvotedBy = postData.upvotedBy || [];

        if (upvotedBy.includes(userId)) {
            await updateDoc(postRef, {
                upvotedBy: arrayRemove(userId),
                upvotes: increment(-1),
            });
        } else {
            await updateDoc(postRef, {
                upvotedBy: arrayUnion(userId),
                upvotes: increment(1),
            });
        }
        return { success: true, message: "Upvote toggled." };
    } catch (error: any) {
        console.error('Error toggling upvote: ', error);
        return { success: false, message: `An error occurred while toggling the upvote: ${error.message}` };
    }
}


export async function createCommunityPost(formData: FormData) {
    const user = auth.currentUser;
    if (!user) {
        return { success: false, message: "You must be logged in to create a post." };
    }

    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const content = formData.get('content') as string;
    const fileUrl = formData.get('fileUrl') as string | null;
    const fileType = formData.get('fileType') as string | null;

    if (!title || !category || !content) {
        return { success: false, message: "Please fill out all fields." };
    }

    try {
        await addDoc(collection(db, 'community-posts'), {
            author: {
                uid: user.uid,
                name: user.displayName || 'Anonymous User',
                avatar: user.photoURL || `https://placehold.co/100x100.png?text=${user.displayName?.charAt(0) || 'A'}`,
            },
            title,
            category,
            content,
            fileUrl: fileUrl || '',
            fileType: fileType || '',
            upvotes: 0,
            upvotedBy: [],
            comments: 0,
            timestamp: serverTimestamp(),
        });
        return { success: true, message: "Post created successfully!" };
    } catch (error: any) {
        console.error("Error creating post:", error);
        // Check for Firestore quota/size limit error
        if (error.code === 'resource-exhausted' || (error.message && error.message.includes('entity too large'))) {
             return { success: false, message: "Failed to create post: The attached image is too large. Please use an image under 1MB." };
        }
        return { success: false, message: `Failed to create post: ${error.message}` };
    }
}


export async function addExpertQuestion(formData: FormData) {
    const user = auth.currentUser;
    if (!user) {
        return { success: false, message: "You must be logged in to ask a question." };
    }

    const title = formData.get('title') as string;
    if (!title) {
        return { success: false, message: "Question cannot be empty." };
    }

    try {
        await addDoc(collection(db, "expert-questions"), {
            author: user.displayName || 'Anonymous User',
            title: title,
            status: "Pending",
            timestamp: serverTimestamp(),
            userId: user.uid,
        });
        return { success: true, message: "Your question has been submitted!" };
    } catch (error: any) {
        console.error("Error adding expert question: ", error);
        return { success: false, message: `Failed to submit question: ${error.message}` };
    }
}


export async function addRockSample(formData: FormData) {
    const user = auth.currentUser;
    if (!user) {
        return { success: false, message: "You must be logged in to add a sample." };
    }
    
    const name = formData.get('name') as string;
    const type = formData.get('type') as string;
    const locationFound = formData.get('locationFound') as string;
    const imageAsDataUrl = formData.get('image') as string;

    if (!name || !type || !locationFound || !imageAsDataUrl) {
        return { success: false, message: "Please fill out all fields and provide an image." };
    }
    
    try {
        await addDoc(collection(db, "rock-vault-samples"), {
            name,
            type,
            locationFound,
            image: imageAsDataUrl,
            userId: user.uid,
            timestamp: serverTimestamp(),
        });
        return { success: true, message: "Rock sample added to your vault!" };
    } catch (error: any) {
        console.error("Error adding rock sample:", error);
        if (error.code === 'resource-exhausted' || (error.message && error.message.includes('entity too large'))) {
             return { success: false, message: "Failed to add sample: The attached image is too large. Please use an image under 1MB." };
        }
        return { success: false, message: `Failed to add sample: ${error.message}` };
    }
}

// Functions below are for seeding data and should ideally be run in a secure server environment.
// For this project, they are here for convenience.

export async function seedCommunityPosts() {
    console.log("Seeding community posts...");
    const posts = [
        {
            author: { name: 'Dr. Evelyn Reed', avatar: 'https://placehold.co/100x100.png?text=ER' },
            title: 'Unusual Sedimentary Structures in the Grand Canyon',
            category: 'Field Geology',
            content: 'During a recent field expedition, we discovered some fascinating cross-bedding structures that suggest a previously unrecorded fluvial system. Has anyone seen similar formations in this area?',
            upvotes: 128,
            comments: 23,
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        },
        {
            author: { name: 'Chen Wang', avatar: 'https://placehold.co/100x100.png?text=CW' },
            title: 'Best Python libraries for geophysical data analysis?',
            category: 'Geophysics',
            content: 'I am starting a new project involving seismic data processing. I have experience with NumPy and SciPy, but I was wondering if there are more specialized libraries you would recommend. ObsPy seems promising.',
            upvotes: 95,
            comments: 42,
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
        },
    ];

    try {
        for (const post of posts) {
            const postWithServerTimestamp = { ...post, timestamp: serverTimestamp(), fileUrl: '', fileType: '' };
            await addDoc(collection(db, 'community-posts'), postWithServerTimestamp);
        }
        return { success: true, message: "Sample community posts have been seeded!" };
    } catch (error: any) {
        console.error("Error seeding posts:", error);
        return { success: false, message: `Error seeding posts: ${error.message}` };
    }
}

export async function seedExpertQuestions() {
  const questions = [
    {
      title: "What are the key indicators for potential landslide activity in volcanic soil?",
      author: "Alex Johnson",
      status: "Answered",
      expert: {
        name: "Dr. Ben Carter",
        title: "Geohazards Specialist",
        avatar: "https://placehold.co/100x100.png?text=BC",
      },
      answerPreview: "Key indicators include soil saturation levels, presence of tension cracks, and unusual spring activity. Monitoring ground deformation with InSAR is also crucial...",
      timestamp: serverTimestamp(),
    },
    {
      title: "How can I differentiate between biotite and muscovite in the field without lab equipment?",
      author: "Maria Garcia",
      status: "Pending",
      timestamp: serverTimestamp(),
    },
  ];

   try {
    for (const question of questions) {
      await addDoc(collection(db, "expert-questions"), question);
    }
    return { success: true, message: "Sample questions have been seeded!" };
  } catch (error: any) {
    console.error("Error seeding questions:", error);
    return { success: false, message: `Error seeding questions: ${error.message}` };
  }
}

// The following functions are not implemented as they are not essential for the core functionality
// and would require more complex server-side logic (e.g., sending emails, handling secure codes).
export async function submitJoinRequest(formData: FormData) {
    console.error("submitJoinRequest needs to be implemented with a secure server-side method.");
    return { success: false, message: "Join request submission is not fully implemented."}
}

export async function submitEliteInvite(formData: FormData) {
    console.error("submitEliteInvite needs to be implemented with a secure server-side method.");
    return { success: false, message: "Elite invite submission is not fully implemented."}
}
