"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { identifyImage, IdentifyImageOutput } from "@/ai/flows/identify-image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, Upload, Percent, CheckCircle, Info } from "lucide-react";
import { Progress } from "../ui/progress";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export function ImageIdentifier() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [result, setResult] = useState<IdentifyImageOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [inProgress, setInProgress] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const photoDataUri = reader.result as string;
        setImagePreview(photoDataUri);
        setResult(null);
        setError(null);
        setInProgress(true);
        try {
          const res = await identifyImage({ photoDataUri });
          if (res) {
            setResult(res);
          }
          setError(null);
        } catch (err: any) {
          setError(`Identification failed: ${err.message}`);
          setResult(null);
        } finally {
          setInProgress(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 items-start">
      <Card>
        <CardHeader>
          <CardTitle>Upload Image</CardTitle>
          <CardDescription>
            Select a clear photo of a rock or strata.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full aspect-video border-2 border-dashed rounded-lg flex items-center justify-center bg-secondary/50">
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Uploaded rock"
                width={500}
                height={300}
                className="object-contain max-h-full max-w-full rounded-md"
              />
            ) : (
              <div className="text-center text-muted-foreground">
                <Upload className="mx-auto h-12 w-12" />
                <p>Your image will be displayed here.</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <Button onClick={handleUploadClick} disabled={inProgress}>
            <Upload className="mr-2 h-4 w-4" />
            {imagePreview ? "Upload Another" : "Select Image"}
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>AI Identification Results</CardTitle>
          <CardDescription>
            A preliminary analysis based on the uploaded image.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {inProgress && (
            <div className="flex flex-col items-center justify-center h-48 gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Analyzing your image...</p>
            </div>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {result && (
            <div className="space-y-6">
               <Alert>
                 <Info className="h-4 w-4" />
                <AlertTitle>Preliminary ID</AlertTitle>
                <AlertDescription>
                   This is an AI-generated identification. Always consult a qualified geologist for definitive analysis.
                </AlertDescription>
              </Alert>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium"><CheckCircle className="h-4 w-4 text-primary" /> Likely Type</div>
                    <p className="text-lg font-bold mt-1">{result.identification.likelyType}</p>
                </div>
                 <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium"><Percent className="h-4 w-4 text-primary" /> Confidence</div>
                    <p className="text-lg font-bold mt-1">{(result.identification.confidence * 100).toFixed(0)}%</p>
                    <Progress value={result.identification.confidence * 100} className="h-2 mt-2" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Detailed Description</h3>
                <p className="text-sm text-muted-foreground prose prose-sm max-w-none">
                    {result.identification.description}
                </p>
              </div>
            </div>
          )}
           {!inProgress && !result && !error && (
            <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
                <p>Results will appear here after image upload.</p>
            </div>
           )}
        </CardContent>
      </Card>
    </div>
  );
}
