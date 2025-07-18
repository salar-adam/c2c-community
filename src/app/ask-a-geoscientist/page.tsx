"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { CheckCircle, HelpCircle, PlusCircle } from "lucide-react"

const questions = [
  {
    id: 1,
    title: "What are the key indicators of a potential landslide zone?",
    author: "Siti Nurhaliza",
    status: "Answered",
    expert: {
      name: "Dr. Evelyn Reed",
      title: "Geotechnical Engineer",
      avatar: "https://placehold.co/100x100.png?text=ER",
    },
    answerPreview: "Key indicators include tension cracks, bulging ground at the base of a slope, and unusual spring or seep activity. Monitoring ground movement with inclinometers is crucial...",
  },
  {
    id: 2,
    title: "How can I differentiate between quartzite and marble in the field?",
    author: "Kenji Tanaka",
    status: "Answered",
    expert: {
      name: "Dr. Ben Carter",
      title: "Mineralogist",
      avatar: "https://placehold.co/100x100.png?text=BC",
    },
    answerPreview: "The simplest field test is the acid test. Marble (calcite) will fizz when a drop of dilute hydrochloric acid is applied, while quartzite will not react. Hardness is another clue; quartzite is harder than a steel knife blade, while marble is softer.",
  },
  {
    id: 3,
    title: "What is the significance of the K-T boundary?",
    author: "Fatima Al-Sayed",
    status: "Awaiting Answer",
  },
]

export default function AskAGeoscientistPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <div>
            <h1 className="text-2xl font-bold">Ask an Expert</h1>
            <p className="text-muted-foreground">
                Pose your questions to our panel of experienced geoscientists.
            </p>
        </div>
         <Button disabled>
            <PlusCircle className="mr-2 h-4 w-4" />
            Ask a Question
        </Button>
      </div>

      <div className="space-y-4">
        {questions.map((q) => (
          <Card key={q.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                  <CardTitle>{q.title}</CardTitle>
                   <Badge variant={q.status === "Answered" ? "default" : "secondary"} className="shrink-0">
                      {q.status === 'Answered' ? <CheckCircle className="mr-1 h-4 w-4" /> : <HelpCircle className="mr-1 h-4 w-4" />}
                      {q.status}
                   </Badge>
              </div>
              <CardDescription>Asked by {q.author}</CardDescription>
            </CardHeader>
            {q.status === 'Answered' && q.expert && (
              <>
                <CardContent>
                  <p className="text-sm text-muted-foreground italic">
                    &ldquo;{q.answerPreview}&rdquo;
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center gap-3">
                     <Avatar className="h-9 w-9">
                        <AvatarImage src={q.expert.avatar} alt={q.expert.name} data-ai-hint="person face" />
                        <AvatarFallback>{q.expert.name.substring(0,2)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-semibold">{q.expert.name}</p>
                        <p className="text-xs text-muted-foreground">{q.expert.title}</p>
                    </div>
                  </div>
                </CardFooter>
              </>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
