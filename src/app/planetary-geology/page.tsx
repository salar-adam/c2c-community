
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Rocket } from "lucide-react"
import Image from "next/image"

const planets = [
  {
    name: "Mars",
    image: "https://placehold.co/600x400.png",
    imageHint: "mars planet",
    description: "Explore the geology of the Red Planet, from its vast canyons to its polar ice caps. Analyze data from rovers like Perseverance and Curiosity.",
  },
  {
    name: "The Moon",
    image: "https://placehold.co/600x400.png",
    imageHint: "moon surface",
    description: "Delve into the lunar surface, studying its maria, highlands, and the history of impacts that have shaped our closest celestial neighbor.",
  },
  {
    name: "Asteroids & Comets",
    image: "https://placehold.co/600x400.png",
    imageHint: "asteroid space",
    description: "Investigate the building blocks of our solar system. Learn about the composition and importance of near-Earth objects and distant comets.",
  },
]

const updates = [
    { title: "Perseverance Rover finds intriguing organic molecules in Jezero Crater.", source: "NASA/JPL" },
    { title: "Lunar Reconnaissance Orbiter maps new ice deposits in polar regions.", source: "NASA" },
    { title: "OSIRIS-REx mission provides new insights into asteroid Bennu's composition.", source: "NASA" },
]

export default function PlanetaryGeologyPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Rocket className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Planetary Geology Portal</h1>
          <p className="text-muted-foreground">
            From the canyons of Mars to the icy moons of Jupiter, explore the geology of our solar system.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {planets.map((planet) => (
          <Card key={planet.name} className="flex flex-col">
            <CardHeader className="p-0">
              <Image
                src={planet.image}
                alt={`Image of ${planet.name}`}
                width={600}
                height={400}
                className="rounded-t-lg object-cover"
                data-ai-hint={planet.imageHint}
              />
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <CardTitle>{planet.name}</CardTitle>
              <CardDescription className="pt-2">{planet.description}</CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button variant="outline" className="w-full" disabled>
                Explore {planet.name} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
       <Card>
        <CardHeader>
            <CardTitle>Latest Rover Updates</CardTitle>
            <CardDescription>News and data from active planetary missions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {updates.map((update, index) => (
                <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 text-primary pt-1"><Rocket className="h-4 w-4" /></div>
                    <div>
                        <p className="font-medium">{update.title}</p>
                        <p className="text-xs text-muted-foreground">Source: {update.source}</p>
                    </div>
                </div>
            ))}
        </CardContent>
       </Card>

    </div>
  )
}
