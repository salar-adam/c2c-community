"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Leaderboard</h1>
        <p className="text-muted-foreground">
          This feature is coming soon. Earn XP, badges, and see where you rank in the community.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon!</CardTitle>
          <CardDescription>
            The GeoChallenge leaderboards are being calibrated. Check back later to see the rankings.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Button disabled>View Rankings</Button>
        </CardContent>
      </Card>
    </div>
  )
}
