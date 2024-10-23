'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Activity, Globe, Bell } from "lucide-react"

type StatusEntry = {
  timestamp: number;
  status: string;
}

type TimeRange = '60min' | '24hr' | '7days';

const POLLING_INTERVAL = 5 * 60 * 1000; // 5 minutes

export default function StatusPage() {
  const [statusHistory, setStatusHistory] = useState<StatusEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState<TimeRange>('24hr')

  const fetchStatus = useCallback(async () => {
    try {
      const response = await fetch('https://typearena-backend.onrender.com/')
      if (!response.ok) {
        throw new Error('Failed to fetch status')
      }
      const data = await response.text()
      const newEntry: StatusEntry = { timestamp: Date.now(), status: data }
      setStatusHistory(prev => [...prev, newEntry])
      setError(null)
    } catch (err) {
      setError('Failed to fetch status. Please try again later.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStatus()
    const intervalId = setInterval(fetchStatus, POLLING_INTERVAL)
    return () => clearInterval(intervalId)
  }, [fetchStatus])

  const filteredHistory = useCallback(() => {
    const now = Date.now()
    const cutoff = {
      '60min': now - 60 * 60 * 1000,
      '24hr': now - 24 * 60 * 60 * 1000,
      '7days': now - 7 * 24 * 60 * 60 * 1000
    }[timeRange]

    return statusHistory.filter(entry => entry.timestamp >= cutoff)
  }, [statusHistory, timeRange])

  const calculateUptime = useCallback(() => {
    const history = filteredHistory()
    if (history.length === 0) return 0
    const upEntries = history.filter(entry => entry.status === 'Typing Test API')
    return (upEntries.length / history.length) * 100
  }, [filteredHistory])

  return (
    <div className="min-h-screen bg-white p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">TypeArena Status</CardTitle>
          <CardDescription className="text-center">Current system status and uptime information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">API Status</h2>
              {loading && statusHistory.length === 0 ? (
                <p className="text-gray-500">Loading status...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-teal-500"></div>
                  <p className="text-teal-700 font-medium">
                    {statusHistory[statusHistory.length - 1]?.status || 'Unknown'}
                  </p>
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Uptime</h2>
                <Select value={timeRange} onValueChange={(value: TimeRange) => setTimeRange(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="60min">Last 60 minutes</SelectItem>
                    <SelectItem value="24hr">Last 24 hours</SelectItem>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-teal-500 transition-all duration-500 ease-in-out" 
                  style={{width: `${calculateUptime()}%`}}
                  title={`${calculateUptime().toFixed(2)}% uptime`}
                ></div>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Uptime: {calculateUptime().toFixed(2)}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}