import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const mentors = [
  {
    name: "Dr. Eleanor Vance",
    avatar: "https://placehold.co/100x100.png",
    fallback: "EV",
    specialty: "Volcanology",
    description: "Expert in volcanic activity and igneous petrology. 15+ years of field experience.",
    tags: ["Volcanoes", "Petrology", "Geochemistry"],
  },
  {
    name: "Prof. Ben Carter",
    avatar: "https://placehold.co/100x100.png",
    fallback: "BC",
    specialty: "Paleontology",
    description: "Specializes in Mesozoic era dinosaurs and fossil preservation.",
    tags: ["Fossils", "Dinosaurs", "Sedimentology"],
  },
  {
    name: "Dr. Aisha Khan",
    avatar: "https://placehold.co/100x100.png",
    fallback: "AK",
    specialty: "Seismology",
    description: "Focuses on earthquake prediction models and tectonic plate movements.",
    tags: ["Earthquakes", "Tectonics", "Geophysics"],
  },
   {
    name: "Dr. Kenji Tanaka",
    avatar: "https://placehold.co/100x100.png",
    fallback: "KT",
    specialty: "Hydrogeology",
    description: "Researches groundwater flow and contaminant transport.",
    tags: ["Groundwater", "Water Quality", "Modeling"],
  },
];

export default function AskAGeoscientistPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ask a Geoscientist</h1>
        <p className="mt-2 text-muted-foreground">
          Have a question? Get answers from our community of verified experts
          and mentors.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submit Your Question</CardTitle>
          <CardDescription>
            Be as detailed as possible. You can even attach an image if needed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Textarea
              placeholder="Type your question about geology, fieldwork, careers, or anything else..."
              rows={6}
            />
            <div className="flex justify-between items-center">
                <input type="file" className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
                <Button>Ask Question</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-bold tracking-tight">Meet the Mentors</h2>
        <p className="mt-2 text-muted-foreground">
          Connect with professionals who are passionate about sharing their
          knowledge.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {mentors.map((mentor) => (
          <Card key={mentor.name}>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={mentor.avatar} alt={mentor.name} data-ai-hint="person face" />
                <AvatarFallback>{mentor.fallback}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{mentor.name}</CardTitle>
                <CardDescription>{mentor.specialty}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {mentor.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {mentor.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
