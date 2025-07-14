import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Mail, MapPin, Sparkles, BookOpen } from "lucide-react";
import Image from "next/image";
import { RockHammerIcon } from "@/components/icons";

const rockCollection = [
  { id: 1, name: "Quartz Geode", image: "https://placehold.co/400x400.png", hint: "geode crystal" },
  { id: 2, name: "Ammonite Fossil", image: "https://placehold.co/400x400.png", hint: "ammonite fossil" },
  { id: 3, name: "Banded Iron Formation", image: "https://placehold.co/400x400.png", hint: "banded rock" },
  { id: 4, name: "Labradorite", image: "https://placehold.co/400x400.png", hint: "iridescent rock" },
  { id: 5, name: "Garnet Schist", image: "https://placehold.co/400x400.png", hint: "schist rock" },
  { id: 6, name: "Basalt Column", image: "https://placehold.co/400x400.png", hint: "basalt rock" },
];

const achievements = [
    { name: "Pioneer", description: "Joined within the first month.", icon: Award },
    { name: "First Post", description: "Made your first contribution.", icon: Award },
    { name: "Mentor I", description: "Answered 10 questions.", icon: Award },
    { name: "Resource Sharer", description: "Uploaded 5 resources.", icon: Award },
    { name: "Field Veteran", description: "Shared 10 field experiences.", icon: Award },
    { name: "Rock Hound", description: "Identified 20 rocks.", icon: RockHammerIcon },
]

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="person face" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold">Jane Doe</h1>
            <p className="text-muted-foreground">Senior Geologist at Terra Resources</p>
            <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Denver, CO</span>
                <span className="flex items-center gap-1.5"><Mail className="h-4 w-4" /> jane.doe@example.com</span>
            </div>
          </div>
          <Button>Edit Profile</Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="profile">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="collection">My Rock Collection</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader><CardTitle>About Me</CardTitle></CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Passionate exploration geologist with over 10 years of experience in mineral exploration and resource estimation. I specialize in copper and gold deposits and have a keen interest in sustainable mining practices. Always happy to connect with fellow geoscientists and mentor students entering the field.
                            </p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader><CardTitle>Publications</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-3">
                                <BookOpen className="h-5 w-5 mt-1 text-muted-foreground"/>
                                <div>
                                    <h3 className="font-semibold">"Geochemical Signatures of Porphyry Copper Deposits"</h3>
                                    <p className="text-sm text-muted-foreground">Journal of Geochemical Exploration, 2022</p>
                                </div>
                            </div>
                             <div className="flex items-start gap-3">
                                <BookOpen className="h-5 w-5 mt-1 text-muted-foreground"/>
                                <div>
                                    <h3 className="font-semibold">"Structural Controls on Gold Mineralization in the Carlin Trend"</h3>
                                    <p className="text-sm text-muted-foreground">Economic Geology, 2020</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div>
                     <Card>
                        <CardHeader>
                            <CardTitle>Level 5: Rock Hound</CardTitle>
                            <CardDescription>1,250 / 2,000 XP to next level</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Progress value={62.5} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </TabsContent>
        <TabsContent value="collection">
          <Card>
            <CardHeader>
              <CardTitle>My Rock Collection</CardTitle>
              <CardDescription>A gallery of your favorite geological finds.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {rockCollection.map((rock) => (
                <div key={rock.id} className="group relative">
                  <Image
                    src={rock.image}
                    alt={rock.name}
                    width={400}
                    height={400}
                    className="rounded-lg aspect-square object-cover"
                    data-ai-hint={rock.hint}
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 rounded-lg">
                    <p className="text-white text-sm font-medium">{rock.name}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="achievements">
            <Card>
                <CardHeader>
                    <CardTitle>Achievements & Badges</CardTitle>
                    <CardDescription>Milestones you've reached in the community.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {achievements.map((ach) => (
                        <div key={ach.name} className="flex flex-col items-center text-center p-4 border rounded-lg bg-secondary/50">
                            <ach.icon className="h-10 w-10 text-primary mb-2" />
                            <h3 className="font-semibold">{ach.name}</h3>
                            <p className="text-xs text-muted-foreground">{ach.description}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
