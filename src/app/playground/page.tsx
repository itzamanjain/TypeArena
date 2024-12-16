"use client"

import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from "next-themes"

const WORD_LIMIT = 100
const TIME_LIMIT = 60

interface Player {
  id: number
  name: string
  wpm: number
  accuracy: number
  errors: number
}

const sampleTexts = [
  "The sun was setting over the horizon, casting a warm golden glow across the landscape. A gentle breeze rustled through the trees, and the sound of birds chirping filled the air. The world seemed at peace in that quiet moment, and time felt like it was standing still.",
  "In a small village, nestled between lush hills, lived an old woman named Clara. She was known for her extraordinary ability to weave tales that enchanted everyone who listened. Each evening, children would gather around her fireplace, eyes wide with anticipation.",
  "Emma was rushing out for work when she realized her key was missing. Panic set in as she rummaged through her bag, pockets, and drawers. She retraced her steps but found nothing. Feeling hopeless, she sat down, only to notice her cat batting something shiny under the couch.",
  "When Lily and her friends dug up the time capsule they buried a decade ago, they felt nostalgic. Each item brought back memories: a toy car, a friendship bracelet, and a photograph of their younger selves. They laughed, remembering the carefree days of childhood.",
  "In a small town, there was an old library that no one visited anymore. Maya, a book lover, decided to volunteer and bring it back to life. She dusted the shelves, reorganized books, and set up a cozy reading corner. Slowly, children started coming, curious about the new stories waiting for them."
]

export default function TypingTest() {
  const [timer, setTimer] = useState<number>(TIME_LIMIT)
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false)
  const [typedText, setTypedText] = useState<string>("")
  const [scores, setScores] = useState<Player[]>([
    { id: 1, name: "You", wpm: 0, accuracy: 100, errors: 0 },
  ])
  const [sampleText, setSampleText] = useState<string>("")
  const [errors, setErrors] = useState<number>(0)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [wordCount, setWordCount] = useState<number>(0)
  const [pasteAttempted, setPasteAttempted] = useState<boolean>(false)

  const { setTheme, theme } = useTheme()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isGameStarted && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000)
    } else if (timer === 0 && isGameStarted) {
      setIsGameStarted(false)
      setShowModal(true)
    }
    return () => clearInterval(interval)
  }, [isGameStarted, timer])

  const startGame = (): void => {
    setIsGameStarted(true)
    setTimer(TIME_LIMIT)
    setTypedText("")
    setSampleText(selectRandomSampleText())
    setScores([{ id: 1, name: "You", wpm: 0, accuracy: 100, errors: 0 }])
    setErrors(0)
    setWordCount(0)
    setShowModal(false)
    setPasteAttempted(false)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const selectRandomSampleText = (): string => {
    const randomIndex = Math.floor(Math.random() * sampleTexts.length)
    return sampleTexts[randomIndex]
  }

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let typed = e.target.value
    const words = typed.trim().split(/\s+/).filter((word) => word.length > 0)
    let currentWordCount = words.length

    if (currentWordCount > WORD_LIMIT) {
      typed = words.slice(0, WORD_LIMIT).join(" ")
      currentWordCount = WORD_LIMIT
    }

    setTypedText(typed)
    setWordCount(currentWordCount)

    const characters = typed.length
    const accuracy = calculateAccuracy(sampleText.substring(0, characters), typed)
    const wpm = timer > 0 ? Math.round((currentWordCount / (TIME_LIMIT - timer)) * 60) : 0

    const currentErrors = countErrors(sampleText.substring(0, characters), typed)

    setScores((prevScores) =>
      prevScores.map((score, index) =>
        index === 0 ? { ...score, wpm, accuracy, errors: currentErrors } : score
      )
    )
    setErrors(currentErrors)
  }

  const calculateAccuracy = (original: string, typed: string): number => {
    if (typed.length === 0) return 100
    let correct = 0
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === original[i]) correct++
    }
    return Math.round((correct / typed.length) * 100)
  }

  const countErrors = (original: string, typed: string): number => {
    let errorCount = 0
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] !== original[i]) errorCount++
    }
    return errorCount
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    setPasteAttempted(true)
  }

  useEffect(() => {
    if (pasteAttempted) {
      const timer = setTimeout(() => setPasteAttempted(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [pasteAttempted])

  const renderSampleText = () => {
    const characters = sampleText.split("")
    return (
      <p className="font-mono text-lg leading-relaxed">
        {characters.map((char, index) => {
          let className = "inline-block"
          if (index < typedText.length) {
            className += char === typedText[index] ? " text-green-500" : " text-red-500"
          }
          return (
            <span key={index} className={className}>
              {char === " " ? "\u00A0" : char}
            </span>
          )
        })}
      </p>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Typing Test</h1>
      </div>

      <Card>
        <CardHeader>
          <Button onClick={startGame} className=" text-white mb-5 text-md bg-teal-500 hover:bg-teal-600">
            {isGameStarted ? "Restart Test" : "Start Test"}
          </Button>
          <CardTitle>
            {isGameStarted && (
              <div className="flex justify-between items-center">
                <span>Time Remaining: {timer}s</span>
                <Progress value={(timer / TIME_LIMIT) * 100} className="w-1/2" />
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 h-40 overflow-y-auto p-2 border rounded">
            {isGameStarted ? renderSampleText() : <div className=" text-lg text-gray-600">click on start test to see the sample text</div>}
          </div>
          <Input
            ref={inputRef}
            value={typedText}
            onChange={handleTyping}
            onPaste={handlePaste}
            placeholder="Start typing..."
            disabled={!isGameStarted || wordCount >= WORD_LIMIT}
            className="mb-2 text-lg w-full h-20 resize-none overflow-y-auto whitespace-pre-wrap"
            style={{ lineHeight: "1.5", padding: "8px" }}
          />
          <div className="text-sm text-muted-foreground">
            Words: {wordCount} / {WORD_LIMIT}
            {wordCount >= WORD_LIMIT && (
              <span className="ml-2 text-red-500">Word limit reached</span>
            )}
          </div>
          {pasteAttempted && (
            <div className="mt-2 text-sm text-red-500">
              Pasting is disabled. Please type manually.
            </div>
          )}
        </CardContent>
        <CardFooter>

        </CardFooter>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Your Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {scores.map((score) => (
              <div key={score.id} className="flex justify-between items-center">
                <span className="font-semibold">{score.name}</span>
                <div className="space-x-4 text-sm">
                  <span>WPM: {score.wpm}</span>
                  <span>Accuracy: {score.accuracy}%</span>
                  <span>Errors: {score.errors}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Time's Up!</DialogTitle>
            <DialogDescription>Here are your results:</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {scores.map((score) => (
              <div key={score.id} className="flex justify-between items-center mb-2">
                <span className="font-semibold">{score.name}</span>
                <div className="space-x-2 text-sm">
                  <span>WPM: {score.wpm}</span>
                  <span>Accuracy: {score.accuracy}%</span>
                  <span>Errors: {score.errors}</span>
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button className="w-full text-white bg-teal-500 hover:bg-teal-600" onClick={startGame}>Play Again</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

