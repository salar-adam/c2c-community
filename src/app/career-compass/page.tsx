"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Compass, Lightbulb, GraduationCap, Briefcase, Loader2, Wand2, Map, BookOpen, Users } from "lucide-react"

// This is a placeholder for the actual output from the AI
const placeholderResult = {
  suggestedRoles: [
    { name: "Hydrogeologist", description: "Specializes in groundwater, its movement, and distribution." },
    { name: "Geotechnical Engineer", description: "Applies geological principles to engineering projects." },
  ],
  skillGaps: ["Groundwater Modeling (MODFLOW)", "Geotechnical Software (PLAXIS)"],
  nextSteps: [
    { title: "Take an online course in Hydrogeology", category: "Education", icon: GraduationCap },
    { title: "Network with professionals in water resource management", category: "Networking", icon: Users },
    { title: "Explore entry-level jobs in environmental consulting", category: "Job Search", icon: Briefcase },
  ]
}

export default function CareerCompassPage() {
  const [skills, setSkills] = useState("Seismic data interpretation, well logging")
  const [interests, setInterests] = useState("Water resources, environmental protection")
  const [goals, setGoals] = useState("Transition into a role with more field work and environmental impact.")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Compass className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Career Compass</h1>
          <p className="text-muted-foreground">
            Get an AI-powered career path based on your goals, skills, and interests.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 flex flex-col gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Your Compass Input</CardTitle>
              <CardDescription>The more detail, the better the path.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="skills">Your Current Skills</Label>
                <Textarea
                  id="skills"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="e.g., Seismic interpretation, Python, GIS"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="interests">Geoscience Interests</Label>
                 <Textarea
                  id="interests"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  placeholder="e.g., Volcanology, planetary geology, hydrology"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="goals">Career Goals</Label>
                <Textarea
                  id="goals"
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  placeholder="e.g., Work in renewable energy, become a researcher"
                  rows={3}
                />
              </div>
               <Button className="w-full" disabled>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Career Path
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
           <Card className="h-full">
             <CardHeader>
                <CardTitle>Your AI-Generated Career Path</CardTitle>
                <CardDescription>Here are the roles, skills, and steps suggested by our AI.</CardDescription>
             </CardHeader>
             <CardContent className="space-y-6">
                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                )}
                {!loading && !result && (
                    <div className="text-center text-muted-foreground py-12">
                        <Map className="mx-auto h-12 w-12 mb-4" />
                        <p>Your career path will appear here.</p>
                         <p className="text-sm">Fill out your details and click "Generate".</p>
                    </div>
                )}
                {result && (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold flex items-center gap-2 mb-3"><Briefcase className="h-5 w-5 text-primary" /> Suggested Roles</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {result.suggestedRoles.map((role: any) => (
                                    <div key={role.name} className="p-4 border rounded-lg">
                                        <p className="font-bold">{role.name}</p>
                                        <p className="text-sm text-muted-foreground">{role.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                         <div>
                            <h3 className="text-lg font-semibold flex items-center gap-2 mb-3"><Lightbulb className="h-5 w-5 text-primary" /> Recommended Skills to Develop</h3>
                             <div className="flex flex-wrap gap-2">
                                {result.skillGaps.map((skill: any) => (
                                    <div key={skill} className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </div>
                         <div>
                            <h3 className="text-lg font-semibold flex items-center gap-2 mb-3"><BookOpen className="h-5 w-5 text-primary" /> Actionable Next Steps</h3>
                            <div className="space-y-3">
                                {result.nextSteps.map((step: any) => (
                                     <div key={step.title} className="flex items-start gap-3">
                                        <div className="pt-1 text-primary"><step.icon className="h-4 w-4" /></div>
                                        <div>
                                            <p className="font-medium">{step.title}</p>
                                            <p className="text-xs text-muted-foreground">{step.category}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  )
}
