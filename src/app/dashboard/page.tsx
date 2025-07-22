
"use client"

import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Users, Calendar, Trophy, MessageSquare, PlusCircle, CheckCircle, HelpCircle, Loader2 } from "lucide-react"
import { useState, useEffect, useTransition, useRef } from "react"
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
import { db } from "@/lib/firebase"
import { collection, onSnapshot, Timestamp, query, orderBy } from "firebase/firestore"
import { addExpertQuestion, seedExpertQuestions } from "@/app/actions"
import Link from "next/link"

const upcomingEventsData = [
    {
      title: "Webinar: Advances in Seismic Imaging",
      date: new Date(new Date().setDate(new Date().getDate() + 7)),
      location: "Online",
    },
    {
      title: "Annual Geosciences Conference 2024",
      date: new Date(new Date().setDate(new Date().getDate() + 14)),
      location: "Houston, TX",
    }
]

const topContributorsData = [
    { rank: 1, name: "Salar", avatar: "https://placehold.co/100x100.png", xp: 15230 },
    { rank: 2, name: "Dr. Evelyn Reed", avatar: "https://placehold.co/100x100.png?text=ER", xp: 14890 },
    { rank: 3, name: "Chen Wang", avatar: "https://placehold.co/100x100.png?text=CW", xp: 14500 },
]

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

export default function DashboardPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [isSeeding, startSeedingTransition] = useTransition();
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
        setQuestions(questionsData.slice(0, 3)); // Show latest 3 questions
        setLoading(false);
    }, (error) => {
        console.error("Error fetching questions: ", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to fetch expert questions.",
        })
        setLoading(false);
    });

    return () => unsubscribe();
  }, [toast])

  const handleSeed = () => {
    startSeedingTransition(async () => {
        const result = await seedExpertQuestions()
        if (result.success) {
        toast({
            title: "Success",
            description: result.message,
        });
        } else if (result.message) { 
        toast({
            variant: "destructive",
            title: "Error",
            description: result.message,
        })
        }
    });
  }


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, here's a snapshot of your GeoNexus community.
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 auto-rows-fr">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5"/> Ask an Expert</CardTitle>
                    <CardDescription>Pose questions to our panel of experienced geoscientists.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {loading ? (
                       Array.from({ length: 2 }).map((_, i) => (
                        <div key={i} className="flex items-center space-x-4">
                            <div className="space-y-2 w-full">
                               <div className="h-4 w-3/4 rounded-md bg-muted animate-pulse" />
                               <div className="h-3 w-1/2 rounded-md bg-muted animate-pulse" />
                            </div>
                        </div>
                       ))
                    ) : questions.length === 0 ? (
                        <p className="text-muted-foreground text-sm">No questions yet. Be the first to ask!</p>
                    ) : (
                        questions.map((q) => (
                            <div key={q.id} className="flex items-start justify-between">
                                <div>
                                    <p className="font-semibold">{q.title}</p>
                                    <p className="text-sm text-muted-foreground">Asked by {q.author}</p>
                                </div>
                                 <div className={`flex items-center text-xs rounded-full px-2 py-1 ${q.status === 'Answered' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-secondary text-secondary-foreground'}`}>
                                    {q.status === 'Answered' ? <CheckCircle className="mr-1 h-3 w-3" /> : <HelpCircle className="mr-1 h-3 w-3" />}
                                    {q.status}
                                 </div>
                            </div>
                        ))
                    )}
                </CardContent>
                 <CardFooter>
                    <AskQuestionDialog />
                </CardFooter>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5"/> Upcoming Events</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {upcomingEventsData.map((event, index) => (
                            <div key={index}>
                                <p className="font-semibold">{event.title}</p>
                                <p className="text-sm text-muted-foreground">{event.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} &bull; {event.location}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5"/> Community</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Jump into the community forums to discuss findings, share resources, and collaborate with peers.
                        </p>
                    </CardContent>
                    <CardFooter>
                        <Button asChild variant="outline">
                            <Link href="/community">View Community</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>

        <div className="lg:col-span-1">
             <Card className="h-full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Trophy className="h-5 w-5"/> Top Contributors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {topContributorsData.map((user) => (
                         <div key={user.rank} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="font-bold w-4 text-muted-foreground">{user.rank}</span>
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="person face" />
                                    <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium text-sm">{user.name}</span>
                            </div>
                            <span className="font-mono text-xs text-muted-foreground">{user.xp.toLocaleString()} XP</span>
                        </div>
                    ))}
                </CardContent>
                 <CardFooter>
                    <Button asChild variant="outline" size="sm">
                        <Link href="/leaderboard">View Leaderboard</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  )
}


function AskQuestionDialog() {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const formRef = useRef<HTMLFormElement>(null);
    const { toast } = useToast();
    
    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const result = await addExpertQuestion(formData);
            if (result.success) {
                toast({ title: "Success", description: result.message });
                formRef.current?.reset();
                setOpen(false);
            } else {
                toast({ variant: "destructive", title: "Error", description: result.message || "An unexpected error occurred." });
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
