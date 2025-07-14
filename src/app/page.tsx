import {
  Activity,
  Award,
  BookOpen,
  Calendar,
  Sparkles,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome to GeoNexus</h1>
        <p className="text-muted-foreground">
          Your global hub for connecting with geoscientists and exploring the Earth.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Progress</CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250 XP</div>
            <p className="text-xs text-muted-foreground">
              +150 XP from last week
            </p>
            <Progress value={50} className="mt-4" />
            <p className="mt-2 text-xs text-muted-foreground">
              Level 5 - Rock Hound
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Recently earned: Field Veteran
            </p>
            <div className="mt-4 flex space-x-2">
              <Badge variant="outline">Pioneer</Badge>
              <Badge variant="outline">Mentor</Badge>
              <Badge>Field Veteran</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Community Discussions
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 active topics</div>
            <p className="text-xs text-muted-foreground">
              Hot topic: "Identifying Cretaceous-era fossils"
            </p>
            <Button size="sm" className="mt-4">
              <Link href="/community">Join Discussion</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Featured Resource</CardTitle>
            <CardDescription>
              Check out this popular field guide.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="relative h-48 w-full">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Field Guide Cover"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
                data-ai-hint="book geology"
              />
            </div>
            <div>
              <h3 className="font-semibold">
                Advanced Field Guide to Igneous Petrology
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                A comprehensive guide to identifying igneous rocks in their
                natural habitat, complete with detailed diagrams and location maps.
              </p>
              <Button variant="outline" size="sm" className="mt-4">
                <BookOpen className="mr-2 h-4 w-4" />
                <Link href="/resources">View Guide</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>
              Don't miss out on these virtual gatherings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-col items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                <span className="text-sm font-medium">JUL</span>
                <span className="text-lg font-bold">28</span>
              </div>
              <div>
                <h3 className="font-semibold">
                  Guest Lecture: The Future of Seismology
                </h3>
                <p className="text-sm text-muted-foreground">
                  with Dr. Evelyn Reed
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-col items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                <span className="text-sm font-medium">AUG</span>
                <span className="text-lg font-bold">12</span>
              </div>
              <div>
                <h3 className="font-semibold">
                  Virtual Field Trip: The Grand Canyon
                </h3>
                <p className="text-sm text-muted-foreground">
                  A guided tour through geological time.
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-4">
              <Calendar className="mr-2 h-4 w-4" />
              <Link href="/events">View All Events</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
