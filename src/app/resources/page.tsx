"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ResourcesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Resource Library</h1>
        <p className="text-muted-foreground">
          This feature is coming soon. Access a curated library of research papers, case studies, and educational materials.
        </p>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Coming Soon!</CardTitle>
          <CardDescription>
            Our library of resources is currently under construction. Please check back soon.
          </CardDescription>
        </CardHeader>
         <CardContent>
            <Button disabled>Browse Resources</Button>
        </CardContent>
      </Card>
    </div>
  )
}
