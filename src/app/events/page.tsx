import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Video, Globe } from "lucide-react";
import Image from "next/image";

const events = [
  {
    title: "Guest Lecture: The Future of Seismology",
    organizer: "Dr. Evelyn Reed",
    date: "July 28, 2024",
    type: "Lecture",
    icon: Video,
    image: "https://placehold.co/600x400.png",
    aiHint: "lecture hall",
    description: "Join Dr. Evelyn Reed as she discusses cutting-edge technologies and predictive models in modern seismology. A live Q&A will follow the presentation.",
  },
  {
    title: "Virtual Field Trip: The Grand Canyon",
    organizer: "GeoNexus Tours",
    date: "August 12, 2024",
    type: "Field Trip",
    icon: Globe,
    image: "https://placehold.co/600x400.png",
    aiHint: "canyon landscape",
    description: "Embark on an immersive virtual journey through the geological strata of the Grand Canyon. Our expert guide will reveal millions of years of Earth's history.",
  },
  {
    title: "Workshop: GIS for Geologists",
    organizer: "Mapping Masters Inc.",
    date: "August 20, 2024",
    type: "Workshop",
    icon: Calendar,
    image: "https://placehold.co/600x400.png",
    aiHint: "map computer",
    description: "A hands-on workshop covering the fundamentals of Geographic Information Systems (GIS) tailored for geological applications. Limited spots available.",
  },
  {
    title: "Conference: Annual Geoscience Symposium",
    organizer: "Global Geology Foundation",
    date: "September 5-7, 2024",
    type: "Conference",
    icon: Calendar,
    image: "https://placehold.co/600x400.png",
    aiHint: "conference room",
    description: "A three-day virtual conference featuring keynote speakers, research presentations, and networking opportunities for geoscientists worldwide.",
  },
];

export default function EventsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Virtual Events & Opportunities
        </h1>
        <p className="mt-2 text-muted-foreground">
          Join our global community for lectures, workshops, and more.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {events.map((event) => (
          <Card key={event.title} className="flex flex-col">
            <CardHeader className="p-0">
              <div className="relative h-56 w-full">
                <Image
                  src={event.image}
                  alt={event.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                  data-ai-hint={event.aiHint}
                />
              </div>
            </CardHeader>
            <div className="flex flex-col flex-grow p-6">
              <CardTitle>{event.title}</CardTitle>
              <CardDescription className="mt-2 flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1.5">
                  <event.icon className="h-4 w-4" /> {event.type}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" /> {event.date}
                </span>
              </CardDescription>
              <CardContent className="p-0 pt-4 flex-grow">
                <p className="text-sm text-muted-foreground">
                  {event.description}
                </p>
              </CardContent>
              <CardFooter className="p-0 pt-4">
                <Button>Register Now</Button>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
