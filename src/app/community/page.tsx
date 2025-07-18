"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CommunityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Community Forums</h1>
        <p className="text-muted-foreground">
          This feature is coming soon. Engage with fellow geoscientists, share findings, and ask questions.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon!</CardTitle>
          <CardDescription>
            We're building a vibrant community space. Check back later for updates.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Button disabled>Join the Discussion</Button>
        </CardContent>
      </Card>
    </div>
  )
}
