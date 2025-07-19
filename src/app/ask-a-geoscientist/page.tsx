"use client"

import { useState, useEffect, useRef, useTransition } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { CheckCircle, HelpCircle, PlusCircle, Loader2, DatabaseZap } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, onSnapshot, Timestamp, query, orderBy } from "firebase/firestore"
import { seedExpertQuestions, addExpertQuestion } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

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

  useEffect(() => {
    const q = query(collection(db, "expert-questions"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
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
        setLoading(false);
    }, (error) => {
        console.error("Error fetching questions: ", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to fetch questions.",
        })
        setLoading(false);
    });

    return () => unsubscribe();
  }, [toast])

  const handleSeed = async () => {
    const result = await seedExpertQuestions()
    if (result.success) {
      toast({
        title: "Success",
        description: result.message,
      });
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
            <AskQuestionDialog />
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
            <p className="text-sm">Click "Seed Questions" to add some sample data or ask your own.</p>
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

function AskQuestionDialog() {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const formRef = useRef<HTMLFormElement>(null);
    const { toast } = useToast();
    
    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            const result = await addExpertQuestion(formData);
            if (result?.success) {
                toast({ title: "Success", description: result.message });
                formRef.current?.reset();
                setOpen(false);
            } else {
                toast({ variant: "destructive", title: "Error", description: result?.message || "An unexpected error occurred." });
            }
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Ask a Question
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ask a Question</DialogTitle>
                    <DialogDescription>
                        Submit your question to our panel of experts. They will get back to you as soon as possible.
                    </DialogDescription>
                </DialogHeader>
                <form 
                    ref={formRef}
                    action={handleSubmit}
                    className="space-y-4"
                >
                    <div className="space-y-2">
                        <Label htmlFor="title">Your Question</Label>
                        <Textarea id="title" name="title" placeholder="What would you like to know?" rows={4} required />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Submit Question
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
