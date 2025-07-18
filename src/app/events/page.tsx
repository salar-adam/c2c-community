"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, MapPin } from "lucide-react"

const events = [
  {
    id: 1,
    title: "Webinar: Advances in Seismic Imaging",
    date: new Date(new Date().setDate(new Date().getDate() + 7)), // 1 week from now
    type: "Webinar",
    location: "Online",
    description: "Join Dr. Miles Davis for a talk on cutting-edge seismic imaging techniques.",
  },
  {
    id: 2,
    title: "Annual Geosciences Conference 2024",
    date: new Date(new Date().setDate(new Date().getDate() + 14)), // 2 weeks from now
    type: "Conference",
    location: "Houston, TX",
    description: "The premier annual event for geoscientists to network and share research.",
  },
  {
    id: 3,
    title: "Workshop: Python for Geologists",
    date: new Date(new Date().setDate(new Date().getDate() + 21)), // 3 weeks from now
    type: "Workshop",
    location: "Online",
    description: "A hands-on workshop covering the basics of Python for geological data analysis.",
  },
]

export default function EventsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Events Calendar</h1>
        <p className="text-muted-foreground">
          Find guest lectures, virtual field trips, and conferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1">
            <Card>
                <CardContent className="p-2">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md w-full"
                    />
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">Upcoming Events</h2>
          {events.length > 0 ? (
            events.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{event.title}</CardTitle>
                    <Badge variant="secondary">{event.type}</Badge>
                  </div>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{event.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                </CardContent>
                <CardContent>
                  <Button variant="outline" disabled>View Details</Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground">No upcoming events found.</p>
          )}
        </div>
      </div>
    </div>
  )
}
