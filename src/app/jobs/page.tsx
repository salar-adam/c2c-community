import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, Clock } from "lucide-react";

const jobs = [
  {
    title: "Exploration Geologist",
    company: "Terra Resources",
    location: "Denver, CO",
    type: "Full-time",
    tags: ["Mining", "Exploration", "Fieldwork"],
    description: "Seeking a motivated exploration geologist to join our team for mineral exploration projects in the Rocky Mountains. Requires extensive fieldwork.",
  },
  {
    title: "Geotechnical Engineer",
    company: "Foundation Solutions Inc.",
    location: "Remote",
    type: "Contract",
    tags: ["Engineering", "Soil Mechanics", "Construction"],
    description: "Contract position for a geotechnical engineer to perform site investigations and provide recommendations for foundation design.",
  },
  {
    title: "Research Assistant - Paleoclimatology",
    company: "Oceanic Institute",
    location: "San Diego, CA",
    type: "Full-time",
    tags: ["Research", "Climate Science", "Lab Work"],
    description: "Full-time research assistant position to support studies on past climate change using marine sediment cores. Lab experience is a plus.",
  },
  {
    title: "GIS Analyst",
    company: "EnviroConsult",
    location: "Austin, TX",
    type: "Full-time",
    tags: ["GIS", "Environmental", "Data Analysis"],
    description: "We are hiring a GIS Analyst to manage spatial data and create maps for environmental assessment projects.",
  },
];

export default function JobsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Job Board</h1>
        <p className="mt-2 text-muted-foreground">
          Find your next career opportunity in the geosciences.
        </p>
      </div>
      <div className="grid gap-6">
        {jobs.map((job) => (
          <Card key={job.title}>
            <CardHeader className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
              <div>
                <CardTitle>{job.title}</CardTitle>
                <CardDescription className="mt-1">{job.company}</CardDescription>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {job.location}</span>
                    <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> {job.type}</span>
                </div>
              </div>
              <div className="flex md:flex-col md:items-end gap-2">
                <Button>Apply Now</Button>
                <Button variant="outline">View Details</Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{job.description}</p>
            </CardContent>
            <CardFooter>
                <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
