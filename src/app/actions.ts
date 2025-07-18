// @/app/actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/firebase'
import { collection, addDoc } from 'firebase/firestore'

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
