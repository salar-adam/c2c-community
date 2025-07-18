"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Virtual Events & Opportunities</h1>
        <p className="text-muted-foreground">
          This feature is coming soon. Find guest lectures, virtual field trips, and a conference calendar.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon!</CardTitle>
          <CardDescription>
            Our events calendar is currently being updated. Please check back soon for exciting new opportunities.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Button disabled>View Calendar</Button>
        </CardContent>
      </Card>
    </div>
  )
}
