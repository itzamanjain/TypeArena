"use client"

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for players
const players = [
  { id: 1, name: "You" },
]

// Sample text for typing
const sampleText = "The sun was setting over the horizon, casting a warm golden glow across the landscape. A gentle breeze rustled through the trees, and the sound of birds chirping filled the air. The world seemed at peace in that quiet moment, and time felt like it was standing still. People walked slowly along the path, enjoying the beauty of the evening, while the clouds above turned shades of pink and orange. It was one of those perfect days, where everything felt in harmony, reminding us to appreciate the simple joys that life has to offer."

export default function Component() {
  const [timer, setTimer] = useState(60)
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [scores, setScores] = useState(players.map(player => ({ ...player, wpm: 0, accuracy: 100 })))
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

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
    setCurrentWordIndex(0)
    setScores(players.map(player => ({ ...player, wpm: 0, accuracy: 100 })))
    if (inputRef.current) {
      inputRef.current.focus()
    }
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

    // Update current word index
    const typedWords = typed.split(' ')
    setCurrentWordIndex(typedWords.length - 1)
  }

  const calculateAccuracy = (original: string, typed: string) => {
    let correct = 0
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === original[i]) correct++
    }
    return Math.round((correct / typed.length) * 100) || 100
  }

  const renderTypingText = () => {
    const words = sampleText.split(' ')
    return words.map((word, index) => {
      const isCurrentWord = index === currentWordIndex
      const isTypedWord = index < currentWordIndex
      const typedWord = typedText.split(' ')[index] || ''
      
      let wordClass = 'inline-block px-1 py-0.5 rounded '
      if (isCurrentWord) {
        wordClass += 'bg-yellow-200 '
      } else if (isTypedWord) {
        wordClass += typedWord === word ? 'text-green-600 ' : 'text-red-600 bg-red-100 '
      }

      return (
        <span key={index} className={wordClass}>
          {word}
        </span>
      )
    })
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
        <Card className="w-full md:w-2/3">
          <CardHeader>
            <CardTitle>Typing Area</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-4 bg-muted rounded-md noselect overflow-y-auto h-40 text-sm md:text-base leading-relaxed">
              {renderTypingText()}
            </div>
            <Input
              ref={inputRef}
              value={typedText}
              onChange={handleTyping}
              onPaste={(e) => e.preventDefault()}  // Disable paste
              disabled={!isGameStarted}
              placeholder={isGameStarted ? "Start typing..." : "Wait for the game to start"}
              className="w-full h-[50px]"
            />
          </CardContent>
        </Card>
        <Card className="w-full md:w-1/3">
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