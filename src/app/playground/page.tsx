"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for players
const players = [
  { id: 1, name: "Player 1" },
  { id: 2, name: "Player 2" },
  { id: 3, name: "Player 3" },
]

// Sample text for typing
const sampleText = "The quick brown fox jumps over the lazy dog."

export default function Component() {
  const [timer, setTimer] = useState(60)
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [scores, setScores] = useState(players.map(player => ({ ...player, wpm: 0, accuracy: 100 })))

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isGameStarted && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1)
      }, 1000)
    } else if (timer === 0) {
      setIsGameStarted(false)
    }
    return () => clearInterval(interval)
  }, [isGameStarted, timer])

  const startGame = () => {
    setIsGameStarted(true)
    setTimer(60)
    setTypedText("")
    setScores(players.map(player => ({ ...player, wpm: 0, accuracy: 100 })))
  }

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    const typed = e.target.value
    setTypedText(typed)

    // Calculate WPM and accuracy
    const words = typed.trim().split(/\s+/).length
    const characters = typed.length
    const accuracy = calculateAccuracy(sampleText.substring(0, characters), typed)
    const wpm = Math.round((words / ((60 - timer) / 60)) || 0)

    // Update scores (in a real app, you'd update this for the current player only)
    setScores(prevScores => 
      prevScores.map((score, index) => 
        index === 0 ? { ...score, wpm, accuracy } : score
      )
    )
  }

  const calculateAccuracy = (original: string, typed: string) => {
    let correct = 0
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === original[i]) correct++
    }
    return Math.round((correct / typed.length) * 100) || 100
  }

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold mb-2">Typing Speed Test</h1>
        <div className="text-4xl font-bold">{timer}s</div>
        <Button onClick={startGame} disabled={isGameStarted} className="mt-2">
          {isGameStarted ? "Game in progress" : "Start Game"}
        </Button>
      </div>
      <div className="flex gap-4">
        <Card className="w-2/3">
          <CardHeader>
            <CardTitle>Typing Area</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-4 bg-muted rounded-md">
              {sampleText}
            </div>
            <Input
              value={typedText}
              onChange={handleTyping}
              disabled={!isGameStarted}
              placeholder={isGameStarted ? "Start typing..." : "Wait for the game to start"}
              className="w-full"
            />
          </CardContent>
        </Card>
        <Card className="w-1/3">
          <CardHeader>
            <CardTitle>Live Scoreboard</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {scores.map(player => (
                <li key={player.id} className="mb-2">
                  <div className="font-semibold">{player.name}</div>
                  <div className="text-sm">
                    WPM: {player.wpm} | Accuracy: {player.accuracy}%
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}