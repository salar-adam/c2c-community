"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase, MapPin, Search } from "lucide-react"

const jobs = [
  {
    id: 1,
    title: "Exploration Geologist",
    company: "Terra Resources Inc.",
    location: "Denver, CO",
    type: "Full-time",
  },
  {
    id: 2,
    title: "Geotechnical Engineer",
    company: "Foundation Solutions",
    location: "Remote",
    type: "Full-time",
  },
  {
    id: 3,
    title: "Wellsite Geologist",
    company: "Offshore Drilling Co.",
    location: "Houston, TX",
    type: "Contract",
  },
  {
    id: 4,
    title: "Geospatial Data Analyst",
    company: "Enviro-Analytics",
    location: "Sacramento, CA",
    type: "Full-time",
  },
  {
    id: 5,
    title: "Hydrogeologist",
    company: "AquaSource Consulting",
    location: "Hybrid (Boise, ID)",
    type: "Full-time",
  },
]

export default function JobsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Job Board</h1>
        <p className="text-muted-foreground">
          Explore career opportunities in the geosciences.
        </p>
      </div>

      <Card>
        <CardContent className="p-4 sm:p-6">
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search by title, company, keyword..." className="pl-10" />
            </div>
            <Select disabled>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="denver">Denver, CO</SelectItem>
                <SelectItem value="houston">Houston, TX</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
              </SelectContent>
            </Select>
            <Select disabled>
              <SelectTrigger>
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {jobs.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <CardTitle>{job.title}</CardTitle>
              <CardDescription className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1">
                 <span className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" /> {job.company}
                 </span>
                 <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> {job.location}
                 </span>
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between items-center">
              <Badge variant="secondary">{job.type}</Badge>
              <Button variant="outline" disabled>View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
