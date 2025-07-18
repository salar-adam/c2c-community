"use client"

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScanSearch, Bot, FileText, ArrowRight } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome to GeoNexus</h1>
        <p className="text-muted-foreground">
          Your central hub for geoscience tools and community interaction.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ScanSearch className="h-6 w-6 text-primary" />
              Image Identification
            </CardTitle>
            <CardDescription>
              Upload a photo of a rock or strata for AI-powered identification.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/identify-image">
                Use Tool <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-6 w-6 text-primary" />
              GeoBot Assistant
            </CardTitle>
            <CardDescription>
              Ask our AI assistant any geology-related questions you have.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/geobot">
                Start Chatting <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              Data Summarizer
            </CardTitle>
            <CardDescription>
              Summarize complex research papers or data logs into simple terms.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/summarize-data">
                Summarize Data <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

       <div className="grid gap-6 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Community Forums</CardTitle>
                <CardDescription>Engage with fellow geoscientists, share findings, and ask questions in our vibrant community forums.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild variant="secondary">
                    <Link href="/community">Visit Community</Link>
                </Button>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Resource Library</CardTitle>
                <CardDescription>Access a curated library of research papers, case studies, and educational materials to support your work.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Button asChild variant="secondary">
                    <Link href="/resources">Browse Resources</Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
