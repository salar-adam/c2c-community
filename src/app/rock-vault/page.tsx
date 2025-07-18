"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle } from "lucide-react"
import Image from "next/image"
import { RockHammerIcon } from "@/components/icons"

const sampleRocks = [
  {
    id: "rock-1",
    name: "Obsidian",
    type: "Igneous",
    locationFound: "Cascade Range, USA",
    image: "https://placehold.co/600x400.png",
    imageHint: "obsidian rock",
  },
  {
    id: "rock-2",
    name: "Limestone",
    type: "Sedimentary",
    locationFound: "Yorkshire, UK",
    image: "https://placehold.co/600x400.png",
    imageHint: "limestone rock",
  },
  {
    id: "rock-3",
    name: "Gneiss",
    type: "Metamorphic",
    locationFound: "Swiss Alps, Switzerland",
    image: "https://placehold.co/600x400.png",
    imageHint: "gneiss rock",
  },
  {
    id: "rock-4",
    name: "Granite",
    type: "Igneous",
    locationFound: "Yosemite National Park, USA",
    image: "https://placehold.co/600x400.png",
    imageHint: "granite rock",
  },
]

export default function RockVaultPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
            <RockHammerIcon className="h-8 w-8 text-primary" />
            <div>
            <h1 className="text-2xl font-bold">Rock Vault</h1>
            <p className="text-muted-foreground">
                Your personal digital collection of rock and mineral samples.
            </p>
            </div>
        </div>
        <Button disabled>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Sample
        </Button>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sampleRocks.map((rock) => (
          <Card key={rock.id} className="flex flex-col">
            <CardHeader className="p-0">
                <Image
                    src={rock.image}
                    alt={`Image of ${rock.name}`}
                    width={600}
                    height={400}
                    className="rounded-t-lg object-cover aspect-video"
                    data-ai-hint={rock.imageHint}
                />
            </CardHeader>
            <CardContent className="p-4 flex-grow">
                <CardTitle className="text-lg">{rock.name}</CardTitle>
                <CardDescription className="pt-1">Found in {rock.locationFound}</CardDescription>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Badge variant="secondary">{rock.type}</Badge>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
