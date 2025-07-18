// @/app/actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/firebase'
import { collection, addDoc, writeBatch, getDocs, Timestamp, query, limit, doc } from 'firebase/firestore'

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
    submittedAt: new Date(),
    type: 'join-request',
  }

  try {
    await addDoc(collection(db, 'join-requests'), rawFormData)
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
    submittedAt: new Date(),
    type: 'elite-invite',
  }

  try {
    await addDoc(collection(db, 'join-requests'), rawFormData)
    revalidatePath('/elite-invite')
    return { success: true, message: 'Invitation submitted successfully.' }
  } catch (error) {
    console.error('Error adding document: ', error)
    return { success: false, message: 'An error occurred while submitting the form.' }
  }
}


export async function seedCommunityPosts() {
  const postsCollection = collection(db, 'community-posts');

  try {
    const q = query(postsCollection, limit(1));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return { success: false, message: "Sample posts have already been added." };
    }

    const batch = writeBatch(db);

    const samplePosts = [
      {
        author: { name: "Alex Johnson", avatar: "https://placehold.co/100x100.png?text=AJ" },
        title: "Interesting sedimentary structures found in the Grand Canyon",
        category: "Field Geology",
        upvotes: 128,
        comments: 23,
        timestamp: Timestamp.now(),
      },
      {
        author: { name: "Maria Garcia", avatar: "https://placehold.co/100x100.png?text=MG" },
        title: "Best software for 3D geological modeling?",
        category: "Geophysics",
        upvotes: 95,
        comments: 42,
        timestamp: Timestamp.fromDate(new Date(Date.now() - 5 * 60 * 60 * 1000)), // 5 hours ago
      },
      {
        author: { name: "Salar", avatar: "https://placehold.co/100x100.png" },
        title: "Tips for recent geology graduates on landing the first job",
        category: "Career & Education",
        upvotes: 210,
        comments: 78,
        timestamp: Timestamp.fromDate(new Date(Date.now() - 24 * 60 * 60 * 1000)), // 1 day ago
      },
      {
        author: { name: "Chen Wang", avatar: "https://placehold.co/100x100.png?text=CW" },
        title: "Debate: Is Pluto a planet? (Geologist's take)",
        category: "General Discussion",
        upvotes: 45,
        comments: 112,
        timestamp: Timestamp.fromDate(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)), // 2 days ago
      },
    ];

    samplePosts.forEach(post => {
      const docRef = doc(collection(db, 'community-posts'));
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
  const resourcesCollection = collection(db, 'resources');

  try {
    const q = query(resourcesCollection, limit(1));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return { success: false, message: "Sample resources have already been added." };
    }

    const batch = writeBatch(db);

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
      const docRef = doc(collection(db, 'resources'));
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
  const questionsCollection = collection(db, 'expert-questions');

  try {
    const q = query(questionsCollection, limit(1));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return { success: false, message: "Sample questions have already been added." };
    }

    const batch = writeBatch(db);

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
        timestamp: Timestamp.fromDate(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)), // 2 days ago
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
        timestamp: Timestamp.fromDate(new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)), // 5 days ago
      },
      {
        title: "What is the significance of the K-T boundary?",
        author: "Fatima Al-Sayed",
        status: "Awaiting Answer",
        timestamp: Timestamp.now(),
      },
    ];

    sampleQuestions.forEach(question => {
      const docRef = doc(collection(db, 'expert-questions'));
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