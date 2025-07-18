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
import { GeoNexusLogo } from "@/components/icons"
import Link from "next/link"

export default function EliteInvitePage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // In a real app, you would handle form submission to a backend here.
    setIsSubmitted(true)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="text-center">
          <Link href="/login" className="inline-block mx-auto mb-4">
            <GeoNexusLogo className="h-10 w-10 text-primary" />
          </Link>
          <CardTitle className="text-2xl">Elite Member Invitation</CardTitle>
          <CardDescription>
            Please provide the name of the member who invited you and your invitation code.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <div className="text-center p-4">
               <h3 className="text-xl font-semibold mb-2">Thank you for your time.</h3>
               <p className="text-muted-foreground">We will review your eligibility. You will be hearing from us soon.</p>
               <Button asChild className="mt-6">
                 <Link href="/login">Return to Login</Link>
               </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="elite-member-name">Name of the Elite Member</Label>
                <Input id="elite-member-name" placeholder="Enter the member's name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="invitation-code">Invitation Code</Label>
                <Input id="invitation-code" placeholder="Enter your invitation code" required />
              </div>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
