"use client"

import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock } from 'lucide-react'
import sampleParagraphs from '@/data/sampleParagraphs'
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

const TIME_LIMIT = 60

export default function TypingTest() {
  const [timeLeft, setTimeLeft] = useState<number>(TIME_LIMIT)
  const [isTestRunning, setIsTestRunning] = useState<boolean>(false) // Changed to false initially
  const [hasStarted, setHasStarted] = useState<boolean>(false) // New state to track if test has started
  const [typedText, setTypedText] = useState<string>("")
  const [text, setText] = useState<string>("")
  const [accuracy, setAccuracy] = useState<number>(100)
  const [wpm, setWpm] = useState<number>(0)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  // Select random sample text on component mount
  useEffect(() => {
    const selectRandomSampleText = (): string => {
      const randomIndex = Math.floor(Math.random() * sampleParagraphs.paragraphs.length)
      return sampleParagraphs.paragraphs[randomIndex].text
    }
    setText(selectRandomSampleText())

    if (textAreaRef.current) {
      textAreaRef.current.focus()
    }
  }, [])

  // Timer logic
  useEffect(() => {
    if (isTestRunning && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && isTestRunning) {
      setIsTestRunning(false)
      setIsDialogOpen(true)
    }
  }, [isTestRunning, timeLeft])

  // Typing handler
  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const typed = e.target.value
    if (typed.length > text.length) return // Prevent typing beyond the text length

    // Start the test on first keystroke
    if (!hasStarted && typed.length > 0) {
      setHasStarted(true)
      setIsTestRunning(true)
    }

    setTypedText(typed)

    const charactersTyped = typed.length
    const correctChars = text.substring(0, charactersTyped)

    let correctCount = 0
    for (let i = 0; i < charactersTyped; i++) {
      if (typed[i] === correctChars[i]) {
        correctCount++
      }
    }

    const accuracyValue = charactersTyped > 0 ? (correctCount / charactersTyped) * 100 : 100
    setAccuracy(accuracyValue)

    const words = typed.trim().split(/\s+/).filter((word) => word.length > 0)
    const wpmValue = timeLeft < TIME_LIMIT ? (words.length / ((TIME_LIMIT - timeLeft) / 60)) : 0
    setWpm(Math.round(wpmValue))

    if (typed === text) {
      // Stop the test if text is completed
      setIsTestRunning(false)
      setIsDialogOpen(true)
    }
  }

  // Store results when dialog is displayed
  useEffect(() => {
    if (!isTestRunning && hasStarted && typedText.length > 0) {
      const storeResult = async () => {
        try {
          const response = await axios.put('/api/store-result', { speed: wpm, accuracy });
          console.log('Result stored:', response.data);
          toast.success("Result stored successfully")
        } catch (error) {
          toast.error("Failed to store result")
          console.log('Error while storing the result')
        }
      }
      storeResult();
    }
  }, [isTestRunning, hasStarted])

  // Reset function
  const handleReset = () => {
    window.location.reload()
  }

  return (
    <div className="container min-h-screen mx-auto px-6 py-8">
      <Card className="border-none">
        <CardContent>
          {(!isDialogOpen) && (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-lg font-medium">
                <div className="flex items-center space-x-3">
                  <Clock className="w-8 h-8" />
                  <span className="text-3xl">
                    {hasStarted ? `${timeLeft}s` : 'Start typing to begin'}
                  </span>
                </div>
              </div>

              <div className="relative min-h-[500px] w-full rounded-lg bg-background p-4 font-mono text-xl md:text-3xl">
                <div
                  className="absolute inset-0 p-4 pointer-events-none whitespace-pre-wrap break-words leading-relaxed tracking-wide"
                  style={{ wordSpacing: "0.25em" }}
                  aria-hidden="true"
                >
                  {text.split("").map((char, index) => (
                    <span
                      key={index}
                      className={
                        index < typedText.length
                          ? typedText[index] === char
                            ? "text-green-500 dark:text-gray-200"
                            : "text-red-500"
                          : "text-gray-500"
                      }
                    >
                      {char}
                    </span>
                  ))}
                </div>
                <textarea
                  ref={textAreaRef}
                  value={typedText}
                  onChange={handleTyping}
                  className="relative min-h-[700px] md:min-h-[500px] w-full text-transparent caret-black dark:caret-white resize-none bg-transparent p-0 font-inherit leading-relaxed tracking-wide focus:outline-none focus:ring-0"
                  style={{ wordSpacing: "0.25em" }}
                  placeholder=""
                  disabled={!isTestRunning && hasStarted}
                  onPaste={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
            </div>
          )}

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Typing Test Results</DialogTitle>
                <DialogDescription>Here's how you performed:</DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-xl mb-2">
                  Your WPM: <span className="font-bold">{wpm}</span>
                </p>
                <p className="text-xl">
                  Your Accuracy: <span className="font-bold">{accuracy.toFixed(2)}%</span>
                </p>
              </div>
              <DialogFooter>
                <Button onClick={handleReset} className="bg-gray-700 hover:bg-gray-900 text-white">
                  Try Again
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  )
}

