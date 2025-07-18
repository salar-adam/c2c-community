"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="person face" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">Salar</CardTitle>
            <CardDescription>
              User profile page. This feature is currently under development.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Button disabled>Edit Profile</Button>
        </CardContent>
      </Card>
    </div>
  )
}
