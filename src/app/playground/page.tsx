"use client"

import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, Clock, Trophy, Users } from 'lucide-react';
import sampleParagraphs from '@/data/sampleParagraphs'

const WORD_LIMIT = 100
const TIME_LIMIT = 60

export default function TypingTest() {
  const [timeLeft, setTimeLeft] = useState<number>(TIME_LIMIT)
  const [isTestRunning, setIsTestRunning] = useState<boolean>(false)
  const [typedText, setTypedText] = useState<string>("")
  const [text, setText] = useState<string>("")
  const [accuracy, setAccuracy] = useState<number>(100)
  const [wpm, setWpm] = useState<number>(0)
  const [resultsDisplayed, setResultsDisplayed] = useState<boolean>(false)
  const [countdown, setCountdown] = useState<number>(3)
  const [showCountdown, setShowCountdown] = useState<boolean>(false)

  const selectRandomSampleText = (): string => {
    const randomIndex = Math.floor(Math.random() * sampleParagraphs.paragraphs.length)
    return sampleParagraphs.paragraphs[randomIndex].text
  }

  const startTest = (): void => {
    setShowCountdown(true)
    setCountdown(3)
    setText(selectRandomSampleText())
    setTypedText("")
    setResultsDisplayed(false)
    setAccuracy(100)
    setWpm(0)

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(countdownInterval)
          setShowCountdown(false)
          setIsTestRunning(true)
          setTimeLeft(TIME_LIMIT)
          return prev
        }
        return prev - 1
      })
    }, 1000)
  }

  useEffect(() => {
    if (isTestRunning && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && isTestRunning) {
      setIsTestRunning(false)
      setResultsDisplayed(true)
    }
  }, [isTestRunning, timeLeft])

  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const typed = e.target.value
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
  }

  return (
    <div className="container min-h-screen mt-14 mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Typing Test</CardTitle>
        </CardHeader>
        <CardContent>
          {showCountdown && (
            <div className="text-center">
              <h2 className="text-7xl font-extrabold mb-4">{countdown}</h2>
              <p className="text-lg text-muted-foreground">Get ready...</p>
            </div>
          )}
          {(isTestRunning || resultsDisplayed) && (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-lg font-medium">
                <div className="flex items-center space-x-3">
                  <Clock className="w-6 h-6" />
                  <span>{timeLeft}s</span>
                </div>
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-6 h-6" />
                  <span>{accuracy.toFixed(2)}%</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Trophy className="w-6 h-6" />
                  <span>{wpm} WPM</span>
                </div>
              </div>
              <Progress
                value={(typedText.length / text.length) * 100}
                className="w-full h-4 rounded-full"
              />
              <div className="relative  min-h-[200px] w-full rounded-lg border bg-background p-4 font-mono text-2xl">
                <div
                  className="absolute inset-0 p-4  pointer-events-none whitespace-pre-wrap break-words leading-relaxed tracking-wide"
                  style={{ wordSpacing: "0.25em" }}
                  aria-hidden="true"
                >
                  {text.split("").map((char, index) => (
                    <span
                      key={index}
                      className={
                        index < typedText.length
                          ? typedText[index] === char
                            ? "text-green-500"
                            : "text-red-500"
                          : "text-gray-500"
                      }
                    >
                      {char}
                    </span>
                  ))}
                </div>

                <textarea
                  value={typedText}
                  onChange={handleTyping}
                  className="relative min-h-[200px]  h-full w-full text-transparent caret-black resize-none bg-transparent p-0 font-inherit leading-relaxed tracking-wide focus:outline-none focus:ring-0"
                  style={{ wordSpacing: "0.25em" }}
                  placeholder=""
                  disabled={!isTestRunning}
                  onPaste={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
            </div>
          )}
          {resultsDisplayed && (
            <div className="space-y-4 mt-6">
              <h2 className="text-3xl font-bold">Final Results</h2>
              <p className="text-xl">
                Your WPM: <span className="font-bold">{wpm}</span>
              </p>
              <p className="text-xl">
                Your Accuracy: <span className="font-bold">{accuracy.toFixed(2)}%</span>
              </p>
            </div>
          )}
          {!isTestRunning && !showCountdown && !resultsDisplayed && (
            <Button
              onClick={startTest}
              className="w-full text-white text-lg py-3 bg-teal-500 hover:bg-teal-600"
            >
              Start Typing Test
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
