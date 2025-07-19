
'use server'

import { revalidatePath } from 'next/cache'
import { adminDb } from '@/lib/firebase-admin'
import { FieldValue } from 'firebase-admin/firestore'

export async function submitJoinRequest(formData: FormData) {
  const rawFormData = {
    firstName: formData.get('first-name') as string,
    lastName: formData.get('last-name') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    company: formData.get('company') as string,
    jobTitle: formData.get('job-title') as string,
    experience: formData.get('experience') as string,
    learningGoals: formData.get('learning-goals') as string,
    howDidYouHear: formData.get('how-did-you-hear') as string,
    invitationCode: formData.get('invitation-code') as string | null,
    submittedAt: FieldValue.serverTimestamp(),
    type: 'join-request',
  }

  try {
    await adminDb.collection('join-requests').add(rawFormData)
    revalidatePath('/join-request')
    return { success: true, message: 'Application submitted successfully.' }
  } catch (error) {
    console.error('Error adding document: ', error)
    return { success: false, message: 'An error occurred while submitting the form.' }
  }
}

export async function submitEliteInvite(formData: FormData) {
  const rawFormData = {
    eliteMemberName: formData.get('elite-member-name') as string,
    invitationCode: formData.get('invitation-code') as string,
    submittedAt: FieldValue.serverTimestamp(),
    type: 'elite-invite',
  }

  try {
    await adminDb.collection('join-requests').add(rawFormData)
    revalidatePath('/elite-invite')
    return { success: true, message: 'Invitation submitted successfully.' }
  } catch (error) {
    console.error('Error adding document: ', error)
    return { success: false, message: 'An error occurred while submitting the form.' }
  }
}

export async function addRockSample(data: { name: string; type: string; locationFound: string; image: string; }) {
  try {
    await adminDb.collection('rock-vault-samples').add({
      ...data,
      timestamp: FieldValue.serverTimestamp(),
    });
    revalidatePath('/rock-vault');
    return { success: true, message: 'Rock sample added successfully.' };
  } catch (error) {
    console.error('Error adding rock sample: ', error);
    return { success: false, message: 'An error occurred while adding the sample.' };
  }
}

export async function createCommunityPost(formData: FormData) {
  const rawFormData = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    category: formData.get('category') as string,
  };

  if (!rawFormData.title || !rawFormData.content || !rawFormData.category) {
    return { success: false, message: 'Title, content, and category are required.' };
  }

  try {
    const newPost = {
      title: rawFormData.title,
      content: rawFormData.content,
      category: rawFormData.category,
      author: { name: "Salar", avatar: "https://placehold.co/100x100.png" },
      upvotes: 0,
      comments: 0,
      timestamp: FieldValue.serverTimestamp(),
    };
    await adminDb.collection('community-posts').add(newPost);
    revalidatePath('/community');
    return { success: true, message: 'Post created successfully.' };
  } catch (error) {
    console.error('Error creating post: ', error);
    return { success: false, message: 'An error occurred while creating the post.' };
  }
}

export async function addExpertQuestion(formData: FormData) {
  const rawFormData = {
    title: formData.get('title') as string,
  };

  if (!rawFormData.title) {
    return { success: false, message: 'Question title is required.' };
  }

  try {
    const newQuestion = {
      title: rawFormData.title,
      author: "Salar", // In a real app, this would be the logged-in user
      status: "Awaiting Answer",
      timestamp: FieldValue.serverTimestamp(),
    };
    await adminDb.collection('expert-questions').add(newQuestion);
    revalidatePath('/ask-a-geoscientist');
    return { success: true, message: 'Your question has been submitted.' };
  } catch (error) {
    console.error('Error submitting question: ', error);
    return { success: false, message: 'An error occurred while submitting your question.' };
  }
}

export async function toggleUpvote(postId: string, userId: string) {
    if (!userId) {
        return { success: false, message: "User not authenticated." };
    }

    const postRef = adminDb.collection('community-posts').doc(postId);
    const transaction = adminDb.runTransaction(async (t) => {
        const postDoc = await t.get(postRef);
        if (!postDoc.exists) {
            throw new Error("Post not found");
        }

        const postData = postDoc.data();
        const upvotedBy = postData?.upvotedBy || [];
        let newUpvotesCount;

        if (upvotedBy.includes(userId)) {
            // User has already upvoted, so remove upvote
            t.update(postRef, {
                upvotedBy: FieldValue.arrayRemove(userId),
                upvotes: FieldValue.increment(-1),
            });
            newUpvotesCount = (postData?.upvotes || 1) - 1;
        } else {
            // User has not upvoted, so add upvote
            t.update(postRef, {
                upvotedBy: FieldValue.arrayUnion(userId),
                upvotes: FieldValue.increment(1),
            });
            newUpvotesCount = (postData?.upvotes || 0) + 1;
        }
        return { newUpvotesCount };
    });

    try {
        const result = await transaction;
        revalidatePath(`/community/${postId}`);
        return { success: true, message: "Upvote toggled.", upvotes: result.newUpvotesCount };
    } catch (error) {
        console.error('Error toggling upvote: ', error);
        return { success: false, message: 'An error occurred while toggling the upvote.' };
    }
}


export async function seedCommunityPosts() {
  const postsCollection = adminDb.collection('community-posts');

  try {
    const snapshot = await postsCollection.limit(1).get();
    if (!snapshot.empty) {
      console.log("Sample posts have already been added.");
      return { success: true, message: "Sample posts have already been added." };
    }

    const batch = adminDb.batch();

    const samplePosts = [
      {
        author: { name: "Alex Johnson", avatar: "https://placehold.co/100x100.png?text=AJ" },
        title: "Interesting sedimentary structures found in the Grand Canyon",
        category: "Field Geology",
        upvotes: 128,
        comments: 23,
        timestamp: FieldValue.serverTimestamp(),
        content: "During a recent trip, I observed some fascinating cross-bedding in the Coconino Sandstone. The scale was massive, indicating a vast ancient desert environment. Has anyone else seen similar structures elsewhere?"
      },
      {
        author: { name: "Maria Garcia", avatar: "https://placehold.co/100x100.png?text=MG" },
        title: "Best software for 3D geological modeling?",
        category: "Geophysics",
        upvotes: 95,
        comments: 42,
        timestamp: FieldValue.serverTimestamp(),
        content: "Our team is evaluating new 3D modeling software for subsurface interpretation. We're currently looking at Petrel and Leapfrog. Does anyone have strong opinions or experience with these, or perhaps recommend an alternative?"
      },
      {
        author: { name: "Salar", avatar: "https://placehold.co/100x100.png" },
        title: "Tips for recent geology graduates on landing the first job",
        category: "Career & Education",
        upvotes: 210,
        comments: 78,
        timestamp: FieldValue.serverTimestamp(),
        content: "I've been mentoring a few recent grads and the job market can be tough. My top tips are: 1) Get proficient with GIS software (like QGIS), 2) Network relentlessly on LinkedIn, and 3) Tailor your resume for EVERY single application. What other advice would you give?"
      },
      {
        author: { name: "Chen Wang", avatar: "https://placehold.co/100x100.png?text=CW" },
        title: "Debate: Is Pluto a planet? (Geologist's take)",
        category: "General Discussion",
        upvotes: 45,
        comments: 112,
        timestamp: FieldValue.serverTimestamp(),
        content: "From a planetary geology perspective, the 'clearing its orbital neighborhood' requirement is problematic. Pluto has a complex geology with mountains, glaciers, and a potential subsurface ocean. Isn't that enough to be considered a planet? Let's discuss."
      },
    ];

    samplePosts.forEach(post => {
      const docRef = postsCollection.doc();
      batch.set(docRef, post);
    });

    await batch.commit();
    revalidatePath('/community');
    return { success: true, message: 'Sample posts added successfully.' };
  } catch (error) {
    console.error("Error seeding posts: ", error);
    return { success: false, message: 'An error occurred while seeding posts.' };
  }
}

export async function seedResources() {
  const resourcesCollection = adminDb.collection('resources');

  try {
    const snapshot = await resourcesCollection.limit(1).get();
    if (!snapshot.empty) {
      return { success: true, message: "Sample resources have already been added." };
    }

    const batch = adminDb.batch();

    const sampleResources = [
      {
        title: "Seismic Stratigraphy of the North Sea",
        description: "A comprehensive analysis of seismic data and stratigraphic sequences in the Viking Graben.",
        type: "Research Paper",
        icon: "FileText",
      },
      {
        title: "Geothermal Energy Potential in Iceland: A Case Study",
        description: "In-depth case study exploring the geological factors contributing to Iceland's geothermal resources.",
        type: "Case Study",
        icon: "FileText",
      },
      {
        title: "Introduction to Well Logging",
        description: "A video tutorial series covering the fundamentals of well log interpretation for subsurface analysis.",
        type: "Video Series",
        icon: "Video",
      },
      {
        title: "USGS Earthquake Catalog",
        description: "Public dataset containing information on global earthquake events, magnitudes, and locations.",
        type: "Dataset",
        icon: "Database",
      },
      {
        title: "Mineralogy of the Andes Mountains",
        description: "Detailed study on the mineral compositions and formations found throughout the Andean mountain range.",
        type: "Research Paper",
        icon: "FileText",
      },
      {
        title: "Offshore Drilling Project: Gulf of Mexico",
        description: "A case study detailing the engineering and geological challenges of a deepwater drilling operation.",
        type: "Case Study",
        icon: "FileText",
      },
    ];

    sampleResources.forEach(resource => {
      const docRef = resourcesCollection.doc();
      batch.set(docRef, resource);
    });

    await batch.commit();
    revalidatePath('/resources');
    return { success: true, message: 'Sample resources added successfully.' };

  } catch (error) {
    console.error("Error seeding resources: ", error);
    return { success: false, message: 'An error occurred while seeding resources.' };
  }
}

export async function seedExpertQuestions() {
  const questionsCollection = adminDb.collection('expert-questions');

  try {
    const snapshot = await questionsCollection.limit(1).get();
    if (!snapshot.empty) {
      return { success: true, message: "Sample questions have already been added." };
    }

    const batch = adminDb.batch();

    const sampleQuestions = [
      {
        title: "What are the key indicators of a potential landslide zone?",
        author: "Siti Nurhaliza",
        status: "Answered",
        expert: {
          name: "Dr. Evelyn Reed",
          title: "Geotechnical Engineer",
          avatar: "https://placehold.co/100x100.png?text=ER",
        },
        answerPreview: "Key indicators include tension cracks, bulging ground at the base of a slope, and unusual spring or seep activity. Monitoring ground movement with inclinometers is crucial...",
        timestamp: FieldValue.serverTimestamp(),
      },
      {
        title: "How can I differentiate between quartzite and marble in the field?",
        author: "Kenji Tanaka",
        status: "Answered",
        expert: {
          name: "Dr. Ben Carter",
          title: "Mineralogist",
          avatar: "https://placehold.co/100x100.png?text=BC",
        },
        answerPreview: "The simplest field test is the acid test. Marble (calcite) will fizz when a drop of dilute hydrochloric acid is applied, while quartzite will not react. Hardness is another clue; quartzite is harder than a steel knife blade, while marble is softer.",
        timestamp: FieldValue.serverTimestamp(),
      },
      {
        title: "What is the significance of the K-T boundary?",
        author: "Fatima Al-Sayed",
        status: "Awaiting Answer",
        timestamp: FieldValue.serverTimestamp(),
      },
    ];

    sampleQuestions.forEach(question => {
      const docRef = questionsCollection.doc();
      batch.set(docRef, question);
    });

    await batch.commit();
    revalidatePath('/ask-a-geoscientist');
    return { success: true, message: 'Sample questions added successfully.' };

  } catch (error) {
    console.error("Error seeding questions: ", error);
    return { success: false, message: 'An error occurred while seeding questions.' };
  }
}
