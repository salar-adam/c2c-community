"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trophy } from "lucide-react"

const leaderboardData = [
  {
    rank: 1,
    name: "Salar",
    avatar: "https://placehold.co/100x100.png",
    xp: 15230,
    tier: "Elite",
  },
  {
    rank: 2,
    name: "Dr. Evelyn Reed",
    avatar: "https://placehold.co/100x100.png?text=ER",
    xp: 14890,
    tier: "Elite",
  },
  {
    rank: 3,
    name: "Chen Wang",
    avatar: "https://placehold.co/100x100.png?text=CW",
    xp: 14500,
    tier: "Pro",
  },
  {
    rank: 4,
    name: "Alex Johnson",
    avatar: "https://placehold.co/100x100.png?text=AJ",
    xp: 12100,
    tier: "Pro",
  },
  {
    rank: 5,
    name: "Maria Garcia",
    avatar: "https://placehold.co/100x100.png?text=MG",
    xp: 11560,
    tier: "Member",
  },
  {
    rank: 6,
    name: "Dr. Ben Carter",
    avatar: "https://placehold.co/100x100.png?text=BC",
    xp: 10980,
    tier: "Member",
  },
  {
    rank: 7,
    name: "Siti Nurhaliza",
    avatar: "https://placehold.co/100x100.png?text=SN",
    xp: 9750,
    tier: "Member",
  },
]

export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Leaderboard</h1>
        <p className="text-muted-foreground">
          See who's leading the GeoNexus community in contributions and expertise.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Top Contributors</CardTitle>
          <CardDescription>
            Rankings are updated daily based on community activity.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead className="text-right">XP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((user) => (
                <TableRow key={user.rank}>
                  <TableCell>
                    <div className="flex items-center gap-2 font-bold">
                      {user.rank <= 3 && <Trophy className={`h-5 w-5 ${
                        user.rank === 1 ? "text-yellow-500" :
                        user.rank === 2 ? "text-gray-400" :
                        "text-amber-700"
                      }`} />}
                      <span>{user.rank}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="person face" />
                        <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.tier === "Elite" ? "default" : user.tier === "Pro" ? "secondary" : "outline"}>
                      {user.tier}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">{user.xp.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
