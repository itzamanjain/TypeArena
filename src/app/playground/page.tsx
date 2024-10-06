"use client"

import { useState, useEffect, useRef, KeyboardEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Define the Player type
interface Player {
  id: number
  name: string
  wpm: number
  accuracy: number
}

// Mock data for players
const players: Player[] = [
  { id: 1, name: "You", wpm: 0, accuracy: 100 },
]

// Sample text for typing
const sampleText: string = "The sun was setting over the horizon, casting a warm golden glow across the landscape. A gentle breeze rustled through the trees, and the sound of birds chirping filled the air. The world seemed at peace in that quiet moment, and time felt like it was standing still. People walked slowly along the path, enjoying the beauty of the evening, while the clouds above turned shades of pink and orange. It was one of those perfect days, where everything felt in harmony, reminding us to appreciate the simple joys that life has to offer."

const TypingTest: React.FC = () => {
  const [timer, setTimer] = useState<number>(60)
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false)
  const [typedText, setTypedText] = useState<string>("")
  const [scores, setScores] = useState<Player[]>(players)
  const sampleTextRef = useRef<HTMLDivElement>(null)

  // Prevent copying via keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent<Document>) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault()
      }
    }

    document.addEventListener('keydown', handleKeyDown as any)
    return () => {
      document.removeEventListener('keydown', handleKeyDown as any)
    }
  }, [])

  // Timer countdown
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

  // Start the game
  const startGame = (): void => {
    setIsGameStarted(true)
    setTimer(60)
    setTypedText("")
    setScores(players.map(player => ({ ...player, wpm: 0, accuracy: 100 })))
  }

  // Handle typing input
  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const typed = e.target.value
    setTypedText(typed)

    // Calculate WPM and accuracy
    const words = typed.trim().split(/\s+/).filter(word => word.length > 0).length
    const characters = typed.length
    const accuracy = calculateAccuracy(sampleText.substring(0, characters), typed)
    const elapsedTime = 60 - timer
    const wpm = elapsedTime > 0 ? Math.round((words / (elapsedTime / 60))) : 0

    // Update scores for the first player
    setScores(prevScores =>
      prevScores.map((score, index) =>
        index === 0 ? { ...score, wpm, accuracy } : score
      )
    )
  }

  // Calculate typing accuracy
  const calculateAccuracy = (original: string, typed: string): number => {
    if (typed.length === 0) return 100
    let correct = 0
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === original[i]) correct++
    }
    return Math.round((correct / typed.length) * 100)
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
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="md:w-2/3">
          <CardHeader>
            <CardTitle>Typing Area</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              ref={sampleTextRef}
              className="mb-4 p-4 bg-muted rounded-md noselect relative"
              onCopy={(e: React.ClipboardEvent<HTMLDivElement>) => e.preventDefault()} // Prevent copy
              onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => e.preventDefault()} // Prevent right-click menu
              onDragStart={(e: React.DragEvent<HTMLDivElement>) => e.preventDefault()} // Prevent drag
              style={{ userSelect: 'none' }} // Additional CSS to prevent selection
            >
              {sampleText}
              {/* Overlay div to intercept any copy attempts */}
              <div
                className="absolute top-0 left-0 w-full h-full"
                onCopy={(e: React.ClipboardEvent<HTMLDivElement>) => e.preventDefault()}
                onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => e.preventDefault()}
                style={{ cursor: 'not-allowed' }}
              ></div>
            </div>
            <Input
              value={typedText}
              onChange={handleTyping}
              onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => e.preventDefault()}  // Prevent paste
              onCopy={(e: React.ClipboardEvent<HTMLInputElement>) => e.preventDefault()}   // Prevent copy from input
              onCut={(e: React.ClipboardEvent<HTMLInputElement>) => e.preventDefault()}    // Prevent cut from input
              disabled={!isGameStarted}
              placeholder={isGameStarted ? "Start typing..." : "Wait for the game to start"}
              className="w-full"
            />
          </CardContent>
        </Card>
        <Card className="md:w-1/3">
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

export default TypingTest
