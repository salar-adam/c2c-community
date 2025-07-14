import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Award, Sparkles } from "lucide-react";

const leaderboardData = [
  { rank: 1, user: "GeoWizard", xp: 15200, badges: 25, avatar: "https://placehold.co/100x100.png", fallback: "GW" },
  { rank: 2, user: "RockStar", xp: 14800, badges: 22, avatar: "https://placehold.co/100x100.png", fallback: "RS" },
  { rank: 3, user: "SedimentSleuth", xp: 13500, badges: 28, avatar: "https://placehold.co/100x100.png", fallback: "SS" },
  { rank: 4, user: "FossilFinder", xp: 12100, badges: 19, avatar: "https://placehold.co/100x100.png", fallback: "FF" },
  { rank: 5, user: "MagmaMaestro", xp: 11950, badges: 18, avatar: "https://placehold.co/100x100.png", fallback: "MM" },
  { rank: 6, user: "TectonicTrekker", xp: 10800, badges: 21, avatar: "https://placehold.co/100x100.png", fallback: "TT" },
  { rank: 7, user: "CrystalClear", xp: 9500, badges: 15, avatar: "https://placehold.co/100x100.png", fallback: "CC" },
];

export default function LeaderboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
        <p className="mt-2 text-muted-foreground">
          See who's making the biggest impact in the GeoNexus community.
        </p>
      </div>

      <Tabs defaultValue="weekly">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="weekly">Weekly GeoChallenge</TabsTrigger>
          <TabsTrigger value="all-time">All-Time Rankings</TabsTrigger>
        </TabsList>
        <TabsContent value="weekly">
          <Card>
            <CardHeader>
              <CardTitle>Weekly GeoChallenge</CardTitle>
              <CardDescription>
                Top contributors from this week. Rankings reset every Sunday.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LeaderboardTable data={leaderboardData.slice(0,5).map(d => ({...d, xp: Math.round(d.xp / 52)}))} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="all-time">
          <Card>
            <CardHeader>
              <CardTitle>All-Time Rankings</CardTitle>
              <CardDescription>
                The most dedicated members of the GeoNexus community.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LeaderboardTable data={leaderboardData} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function LeaderboardTable({ data }: { data: typeof leaderboardData }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">Rank</TableHead>
          <TableHead>User</TableHead>
          <TableHead className="text-right">
            <span className="flex items-center justify-end gap-2">XP <Sparkles className="h-4 w-4"/></span>
          </TableHead>
          <TableHead className="text-right">
            <span className="flex items-center justify-end gap-2">Badges <Award className="h-4 w-4"/></span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((entry) => (
          <TableRow key={entry.rank}>
            <TableCell>
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-secondary text-secondary-foreground font-bold">
                {entry.rank === 1 ? <Trophy className="h-5 w-5 text-yellow-500" /> : entry.rank}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={entry.avatar} alt={entry.user} data-ai-hint="person face" />
                  <AvatarFallback>{entry.fallback}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{entry.user}</span>
              </div>
            </TableCell>
            <TableCell className="text-right font-mono">{entry.xp.toLocaleString()}</TableCell>
            <TableCell className="text-right font-mono">{entry.badges}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
