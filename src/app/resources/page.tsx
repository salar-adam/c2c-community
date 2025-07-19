// @/app/resources/page.tsx
"use client"

import { useState, useEffect, useTransition } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { FileText, Video, Database, Search, ArrowRight, Loader2, DatabaseZap } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"
import { seedResources } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"

type Resource = {
  id: string;
  title: string;
  description: string;
  type: string;
  icon: string;
}

const iconComponents: { [key: string]: React.ElementType } = {
  FileText: FileText,
  Video: Video,
  Database: Database,
}

const ResourceIcon = ({ iconName }: { iconName: string }) => {
  const Icon = iconComponents[iconName] || FileText;
  return <Icon className="h-6 w-6 text-primary" />;
};

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSeeding, startSeedingTransition] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
    const q = query(collection(db, "resources"), orderBy("title"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const resourcesData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Resource));
        setResources(resourcesData);
        setLoading(false);
    }, (error) => {
        console.error("Error fetching resources: ", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to fetch resources. Please check your Firestore security rules.",
        })
        setLoading(false);
    });
    return () => unsubscribe();
  }, [toast]);

  const handleSeed = () => {
    startSeedingTransition(async () => {
        const result = await seedResources();
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
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Resource Library</h1>
          <p className="text-muted-foreground">
            Access a curated library of research papers, case studies, and educational materials.
          </p>
        </div>
         <Button onClick={handleSeed} disabled={isSeeding}>
            {isSeeding ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <DatabaseZap className="mr-2 h-4 w-4" />}
            Seed Resources
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search resources..." className="pl-10" />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : resources.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
              <p>No resources found.</p>
              <p className="text-sm">Click "Seed Resources" to add some sample data.</p>
          </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <Card key={resource.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <ResourceIcon iconName={resource.icon} />
                </div>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <Badge variant="secondary">{resource.type}</Badge>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" disabled>
                  View Resource
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
