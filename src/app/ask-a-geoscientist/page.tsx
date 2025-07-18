"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AskAGeoscientistPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Ask an Expert</h1>
        <p className="text-muted-foreground">
         This feature is coming soon. Connect with students and professionals through our "Ask a Geoscientist" forum.
        </p>
      </div>
        <Card>
            <CardHeader>
                <CardTitle>Coming Soon!</CardTitle>
                <CardDescription>
                    Our mentorship and expert forum is currently under development. Please check back soon.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button disabled>Ask a Question</Button>
            </CardContent>
        </Card>
    </div>
  )
}
