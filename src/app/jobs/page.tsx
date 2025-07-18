"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function JobsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Job Board</h1>
        <p className="text-muted-foreground">
          This feature is coming soon. Explore career opportunities in the geosciences.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon!</CardTitle>
          <CardDescription>
            We are currently gathering job listings. Please check back soon for career opportunities.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Button disabled>Browse Jobs</Button>
        </CardContent>
      </Card>
    </div>
  )
}
