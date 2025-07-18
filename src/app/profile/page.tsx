"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Building, Briefcase } from "lucide-react"

export default function ProfilePage() {
  const user = {
    name: "Salar",
    title: "Senior Geologist",
    email: "salar@geonexus.com",
    phone: "+1 (555) 123-4567",
    company: "GeoCore Analytics",
    avatar: "https://placehold.co/100x100.png",
    bio: "An experienced senior geologist with over 15 years in the field, specializing in seismic data interpretation and resource evaluation. Passionate about leveraging technology to advance geological sciences.",
    skills: ["Seismic Interpretation", "Petrel & Kingdom Software", "Reservoir Modeling", "Geological Mapping", "Well Log Analysis"],
    experience: [
      {
        title: "Senior Geologist",
        company: "GeoCore Analytics",
        period: "2015 - Present",
      },
      {
        title: "Exploration Geologist",
        company: "Strata Exploration Inc.",
        period: "2008 - 2015",
      }
    ]
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col md:flex-row items-start gap-6">
          <Avatar className="h-24 w-24 border">
            <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="person face" />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-3xl">{user.name}</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">{user.title}</CardDescription>
            <div className="mt-4 flex flex-col sm:flex-row sm:flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    <span>{user.company}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{user.email}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{user.phone}</span>
                </div>
            </div>
          </div>
          <Button variant="outline" disabled>Edit Profile</Button>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">{user.bio}</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Briefcase className="h-5 w-5" /> Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {user.experience.map((exp, index) => (
                    <div key={index}>
                        <h3 className="font-semibold">{exp.title}</h3>
                        <p className="text-sm text-muted-foreground">{exp.company}</p>
                        <p className="text-xs text-muted-foreground/80">{exp.period}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                    <div key={skill} className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">
                        {skill}
                    </div>
                ))}
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
