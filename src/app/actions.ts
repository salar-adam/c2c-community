'use client';

import { db, auth, storage } from '@/lib/firebase';
import { doc, updateDoc, arrayRemove, arrayUnion, increment, collection, addDoc, serverTimestamp, getDoc, runTransaction } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

    const post = {
        title: formData.get('title') as string,
        category: formData.get('category') as string,
        content: formData.get('content') as string,
        file: formData.get('file') as File,
    };

    if (!post.title || !post.category || !post.content) {
        return { success: false, message: "Please fill out all fields." };
    }

    let fileUrl = '';
    let fileType = '';

    if (post.file && post.file.size > 0) {
        const storageRef = ref(storage, `community-files/${user.uid}/${Date.now()}_${post.file.name}`);
        try {
            const snapshot = await uploadBytes(storageRef, post.file);
            fileUrl = await getDownloadURL(snapshot.ref);
            fileType = post.file.type;
        } catch (error: any) {
            console.error("Error uploading file:", error);
            return { success: false, message: `Failed to upload file: ${error.message}` };
        }
    }


    try {
        await addDoc(collection(db, 'community-posts'), {
            author: {
                uid: user.uid,
                name: user.displayName || 'Anonymous User',
                avatar: user.photoURL || `https://placehold.co/100x100.png?text=${user.displayName?.charAt(0) || 'A'}`,
            },
            title: post.title,
            category: post.category,
            content: post.content,
            fileUrl,
            fileType,
            upvotes: 0,
            upvotedBy: [],
            comments: 0,
            timestamp: serverTimestamp(),
        });
        return { success: true, message: "Post created successfully!" };
    } catch (error: any) {
        console.error("Error creating post:", error);
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


export async function addRockSample(data: { name: string; type: string; locationFound: string; image: string; }) {
    const user = auth.currentUser;
    if (!user) {
        return { success: false, message: "You must be logged in to add a sample." };
    }

    try {
        await addDoc(collection(db, "rock-vault-samples"), {
            ...data,
            userId: user.uid,
            timestamp: serverTimestamp(),
        });
        return { success: true, message: "Rock sample added to your vault!" };
    } catch (error: any) {
        console.error("Error adding rock sample:", error);
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
            const postWithServerTimestamp = { ...post, timestamp: serverTimestamp() };
            await addDoc(collection(db, 'community-posts'), postWithServerTimestamp);
        }
        return { success: true, message: "Sample community posts have been seeded!" };
    } catch (error: any) {
        console.error("Error seeding posts:", error);
        return { success: false, message: `Error seeding posts: ${error.message}` };
    }
}

export async function seedResources() {
  const resources = [
    {
      title: "Geological Survey Maps Database",
      description: "Access high-resolution geological maps from surveys conducted worldwide.",
      type: "Database",
      icon: "Database"
    },
    {
      title: "Introduction to Petrology",
      description: "A foundational research paper on the classification and analysis of rock types.",
      type: "Research Paper",
      icon: "FileText"
    },
    {
      title: "Virtual Field Trip: The Rocky Mountains",
      description: "An immersive video series exploring the geological formations of the Rockies.",
      type: "Video Series",
      icon: "Video"
    },
  ];
  try {
    for (const resource of resources) {
      await addDoc(collection(db, "resources"), resource);
    }
    return { success: true, message: "Sample resources have been seeded!" };
  } catch (error: any) {
    console.error("Error seeding resources:", error);
    return { success: false, message: `Error seeding resources: ${error.message}` };
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
