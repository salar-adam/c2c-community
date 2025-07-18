"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { FileText, Video, Database, Search, ArrowRight } from "lucide-react"

const resources = [
  {
    id: 1,
    title: "Seismic Stratigraphy of the North Sea",
    description: "A comprehensive analysis of seismic data and stratigraphic sequences in the Viking Graben.",
    type: "Research Paper",
    icon: <FileText className="h-6 w-6 text-primary" />,
  },
  {
    id: 2,
    title: "Geothermal Energy Potential in Iceland: A Case Study",
    description: "In-depth case study exploring the geological factors contributing to Iceland's geothermal resources.",
    type: "Case Study",
    icon: <FileText className="h-6 w-6 text-primary" />,
  },
  {
    id: 3,
    title: "Introduction to Well Logging",
    description: "A video tutorial series covering the fundamentals of well log interpretation for subsurface analysis.",
    type: "Video Series",
    icon: <Video className="h-6 w-6 text-primary" />,
  },
  {
    id: 4,
    title: "USGS Earthquake Catalog",
    description: "Public dataset containing information on global earthquake events, magnitudes, and locations.",
    type: "Dataset",
    icon: <Database className="h-6 w-6 text-primary" />,
  },
    {
    id: 5,
    title: "Mineralogy of the Andes Mountains",
    description: "Detailed study on the mineral compositions and formations found throughout the Andean mountain range.",
    type: "Research Paper",
    icon: <FileText className="h-6 w-6 text-primary" />,
  },
  {
    id: 6,
    title: "Offshore Drilling Project: Gulf of Mexico",
    description: "A case study detailing the engineering and geological challenges of a deepwater drilling operation.",
    type: "Case Study",
    icon: <FileText className="h-6 w-6 text-primary" />,
  },
]

export default function ResourcesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Resource Library</h1>
        <p className="text-muted-foreground">
          Access a curated library of research papers, case studies, and educational materials.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search resources..." className="pl-10" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <Card key={resource.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{resource.title}</CardTitle>
                {resource.icon}
              </div>
              <CardDescription>{resource.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <Badge variant="secondary">{resource.type}</Badge>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" disabled>
                View Resource
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
