"use client"

import { useState, useEffect, ChangeEvent, FormEvent, useTransition, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, PlusCircle, UploadCloud } from "lucide-react"
import Image from "next/image"
import { RockHammerIcon } from "@/components/icons"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { addRockSample } from "@/app/actions"
import { db } from "@/lib/firebase"
import { collection, query, orderBy, onSnapshot, DocumentData } from "firebase/firestore"

interface RockSample extends DocumentData {
    id: string;
    name: string;
    type: string;
    locationFound: string;
    image: string;
}

export default function RockVaultPage() {
  const [samples, setSamples] = useState<RockSample[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const q = query(collection(db, "rock-vault-samples"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const samplesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as RockSample));
      setSamples(samplesData);
      setLoading(false);
    }, (error) => {
        console.error("Error fetching rock samples:", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to fetch samples. Please check your Firestore security rules.",
        });
        setLoading(false);
    });

    return () => unsubscribe();
  }, [toast]);

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
        <AddSampleDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : samples.length === 0 ? (
        <div className="text-center text-muted-foreground py-12 border-2 border-dashed rounded-lg">
            <RockHammerIcon className="mx-auto h-12 w-12 mb-4" />
            <h3 className="text-lg font-semibold">Your Rock Vault is Empty</h3>
            <p>Click "Add New Sample" to start your collection.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {samples.map((rock) => (
            <Card key={rock.id} className="flex flex-col">
                <CardHeader className="p-0">
                    <Image
                        src={rock.image}
                        alt={`Image of ${rock.name}`}
                        width={600}
                        height={400}
                        className="rounded-t-lg object-cover aspect-video"
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
      )}
    </div>
  )
}

function AddSampleDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, startTransition] = useTransition();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB limit
          toast({
              variant: "destructive",
              title: "Image too large",
              description: "Please select an image smaller than 1MB."
          });
          e.target.value = ""; // Reset file input
          return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
        setImagePreview(null);
    }
  };

  const resetForm = () => {
    formRef.current?.reset();
    setImagePreview(null);
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imagePreview) {
        toast({ variant: "destructive", title: "Missing Image", description: "Please upload an image for the sample." });
        return;
    }

    const formData = new FormData(e.currentTarget);
    formData.set('image', imagePreview); // Set the base64 string
    
    startTransition(async () => {
        const result = await addRockSample(formData);
        if (result.success) {
            toast({ title: "Success", description: result.message });
            resetForm();
            onOpenChange(false);
        } else {
            toast({ variant: "destructive", title: "Error", description: result.message });
        }
    });
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
        if (!isOpen) resetForm();
        onOpenChange(isOpen);
    }}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Sample
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New Rock Sample</DialogTitle>
        </DialogHeader>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rock-image">Rock Image (Max 1MB)</Label>
            <Input id="rock-image" name="file" type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" required />
            <label htmlFor="rock-image" className="cursor-pointer">
                <div className="w-full aspect-video border-2 border-dashed rounded-lg flex items-center justify-center bg-secondary/50 text-muted-foreground">
                    {imagePreview ? (
                        <Image src={imagePreview} alt="Rock preview" width={300} height={200} className="object-contain max-h-full max-w-full rounded-md" />
                    ) : (
                        <div className="text-center">
                            <UploadCloud className="mx-auto h-10 w-10" />
                            <p>Click to upload an image</p>
                            <p className="text-xs">(Max 1MB)</p>
                        </div>
                    )}
                </div>
            </label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="rock-name">Rock Name</Label>
            <Input id="rock-name" name="name" placeholder="e.g., Obsidian" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rock-type">Rock Type</Label>
            <Select name="type" required>
              <SelectTrigger id="rock-type">
                <SelectValue placeholder="Select a rock type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Igneous">Igneous</SelectItem>
                <SelectItem value="Sedimentary">Sedimentary</SelectItem>
                <SelectItem value="Metamorphic">Metamorphic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location Found</Label>
            <Input id="location" name="locationFound" placeholder="e.g., Cascade Range, USA" required />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
            Add to Vault
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
