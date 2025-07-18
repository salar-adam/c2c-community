"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { CheckCircle, HelpCircle, PlusCircle, Loader2, DatabaseZap } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, getDocs, Timestamp, query, orderBy } from "firebase/firestore"
import { seedExpertQuestions } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"

interface Question {
  id: string;
  title: string;
  author: string;
  status: string;
  expert?: {
    name: string;
    title: string;
    avatar: string;
  };
  answerPreview?: string;
  timestamp: Date;
}

export default function AskAGeoscientistPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchQuestions = async () => {
    setLoading(true)
    try {
      const q = query(collection(db, "expert-questions"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const questionsData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          author: data.author,
          status: data.status,
          expert: data.expert,
          answerPreview: data.answerPreview,
          timestamp: (data.timestamp as Timestamp).toDate(),
        };
      });
      setQuestions(questionsData);
    } catch (error) {
      console.error("Error fetching questions: ", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch questions.",
      })
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchQuestions();
  }, [])

  const handleSeed = async () => {
    const result = await seedExpertQuestions()
    if (result.success) {
      toast({
        title: "Success",
        description: result.message,
      });
      fetchQuestions(); // Refresh list
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.message,
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Ask an Expert</h1>
          <p className="text-muted-foreground">
            Pose your questions to our panel of experienced geoscientists.
          </p>
        </div>
        <div className="flex items-center gap-2">
           <Button onClick={handleSeed}>
                <DatabaseZap className="mr-2 h-4 w-4" />
                Seed Questions
            </Button>
            <Button disabled>
                <PlusCircle className="mr-2 h-4 w-4" />
                Ask a Question
            </Button>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : questions.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            <p>No questions have been asked yet.</p>
            <p className="text-sm">Click "Seed Questions" to add some sample data.</p>
          </div>
        ) : (
          questions.map((q) => (
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
                        <AvatarFallback>{q.expert.name.substring(0, 2)}</AvatarFallback>
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
          ))
        )}
      </div>
    </div>
  )
}