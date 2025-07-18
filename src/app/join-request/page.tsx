"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { GeoNexusLogo } from "@/components/icons"
import Link from "next/link"

export default function JoinRequestPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // In a real app, you would handle form submission to a backend here.
    setIsSubmitted(true)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background py-12">
      <Card className="mx-auto max-w-2xl w-full">
        <CardHeader className="text-center">
          <Link href="/login" className="inline-block mx-auto mb-4">
            <GeoNexusLogo className="h-10 w-10 text-primary" />
          </Link>
          <CardTitle className="text-2xl">Join GeoNexus</CardTitle>
          <CardDescription>
            Complete the form below to request access to our private community.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <div className="text-center p-8">
              <h3 className="text-xl font-semibold mb-2">Thank you for your time.</h3>
              <p className="text-muted-foreground">We will review your eligibility. You will be hearing from us soon.</p>
              <Button asChild className="mt-6">
                <Link href="/login">Return to Login</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-4 border-b pb-2">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="Enter your first name" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Enter your last name" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter your email address" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="Enter your phone number" required />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4 border-b pb-2">Professional Background</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="company">Current Company/Organization</Label>
                    <Input id="company" placeholder="Enter your company name" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="job-title">Job Title</Label>
                    <Input id="job-title" placeholder="Enter your job title" required />
                  </div>
                  <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor="experience">Years of Experience in Related Fields</Label>
                    <Input id="experience" type="number" placeholder="Enter years of experience" required />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4 border-b pb-2">Additional Information</h3>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="learning-goals">What are your learning goals for this course?</Label>
                    <Textarea id="learning-goals" placeholder="Please share your goals and what you hope to achieve..." required />
                  </div>
                   <div className="grid gap-2">
                    <Label htmlFor="how-did-you-hear">How did you hear about us?</Label>
                    <Input id="how-did-you-hear" placeholder="Google, colleague, social media, etc." required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="invitation-code">Invitation Code</Label>
                    <Input id="invitation-code" placeholder="Enter your invitation code (optional)" />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full">
                Submit Application
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
