'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface User {
  _id: string
  fullname: string
  username: string
  testAttempted: number
  topSpeed: number
}

interface LeaderboardResponse {
  message: string
  users: User[]
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get('/api/leaderboard')
        setLeaderboard(res.data)
      } catch (err) {
        console.error('Error fetching leaderboard:', err)
        setError('Failed to load leaderboard. Please try again later.')
      }
    }

    fetchLeaderboard()
  }, [])

  const handleRowClick = (username: string) => {
    router.push(`/${username}`)
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container min-h-screen mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          {!leaderboard ? (
            <LeaderboardSkeleton />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Rank</TableHead>
                  <TableHead>Player</TableHead>
                  <TableHead>Tests</TableHead>
                  <TableHead className="text-right">Top Speed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboard.users.map((user, index) => (
                  <TableRow 
                    key={user._id} 
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleRowClick(user.username)}
                  >
                    <TableCell className="font-medium">
                      {index === 0 && <Badge className="mr-1">🥇</Badge>}
                      {index === 1 && <Badge className="mr-1">🥈</Badge>}
                      {index === 2 && <Badge className="mr-1">🥉</Badge>}
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <Link href={`/${user.username}`} className="hover:underline">
                        {user.fullname}
                      </Link>
                    </TableCell>
                    <TableCell>{user.testAttempted}</TableCell>
                    <TableCell className="text-right font-semibold">{user.topSpeed} WPM</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function LeaderboardSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  )
}

