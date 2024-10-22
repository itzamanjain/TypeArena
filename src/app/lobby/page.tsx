'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import io, { Socket } from 'socket.io-client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Clock, Trophy, Users } from "lucide-react";
import sampleParagraphs from '@/data/sampleParagraphs';

interface Player {
  wpm: number;
  accuracy: number;
}

interface Players {
  [key: string]: Player;
}

interface RoomEvent {
  roomId: string;
  isAdmin?: boolean;
  text?: string;
  players?: Players;
}

const socket: Socket = io('https://typearena-backend.onrender.com/');

export default function TypingTest() {
  const [roomId, setRoomId] = useState<string>('');
  const [players, setPlayers] = useState<Players>({});
  const [text, setText] = useState<string>('');
  const [typedText, setTypedText] = useState<string>('');
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isTestRunning, setIsTestRunning] = useState<boolean>(false);
  const [resultsDisplayed, setResultsDisplayed] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(3);
  const [showCountdown, setShowCountdown] = useState<boolean>(false);
  const [currentCharIndex, setCurrentCharIndex] = useState<number>(0);

  const createRoom = (): void => {
    const newRoomId = Math.random().toString(36).substring(2, 9);
    setRoomId(newRoomId);
    socket.emit('createRoom', { roomId: newRoomId });
  };

  const joinRoom = (id: string): void => {
    setRoomId(id);
    socket.emit('joinRoom', { roomId: id });
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isTestRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTestRunning(false);
      setResultsDisplayed(true);
      if (timer) {
        clearInterval(timer);
      }
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isTestRunning, timeLeft]);

  const handleTyping = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    if (!isTestRunning) return;
    const input = e.target.value;
    setTypedText(input);
    setCurrentCharIndex(input.length);

    const correctChars = [...input].filter((char, idx) => char === text[idx]).length;
    const newAccuracy = (correctChars / input.length) * 100 || 100;
    const wordsTyped = input.length / 5;
    const newWpm = parseFloat((wordsTyped / ((60 - timeLeft) / 60)).toFixed(2));

    setWpm(newWpm);
    setAccuracy(newAccuracy);

    socket.emit('updateProgress', {
      roomId,
      typedText: input
    });
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
  };

  const handleContextMenu = (event: React.MouseEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
  };


  const paragraphs = sampleParagraphs.paragraphs.map(p => p.text);

  useEffect(() => {
    const randomParagraph = paragraphs[Math.floor(Math.random() * paragraphs.length)];
    setText(randomParagraph);
  }, []);

  useEffect(() => {
    socket.on('roomCreated', ({ roomId, isAdmin: adminStatus }: RoomEvent) => {
      setIsAdmin(adminStatus || false);
    });

    socket.on('roomJoined', ({ text: roomText, isAdmin: adminStatus }: RoomEvent) => {
      setIsAdmin(adminStatus || false);
    });

    socket.on('updateLeaderboard', ({ players }: RoomEvent) => {
      setPlayers(players || {});
    });

    socket.on('playerJoined', ({ players }: RoomEvent) => {
      setPlayers(players || {});
    });

    socket.on('countdown', ({ count }: { count: number }) => {
      setShowCountdown(true);
      setCountdown(count);
    });

    socket.on('startTyping', () => {
      setShowCountdown(false);
      setIsTestRunning(true);
      setTimeLeft(60);
      setTypedText('');
      setCurrentCharIndex(0);
    });

    socket.on('finalResults', ({ players }: RoomEvent) => {
      setPlayers(players || {});
      setIsTestRunning(false);
      setResultsDisplayed(true);
    });

    return () => {
      socket.off('roomCreated');
      socket.off('roomJoined');
      socket.off('updateLeaderboard');
      socket.off('playerJoined');
      socket.off('countdown');
      socket.off('startTyping');
      socket.off('finalResults');
    };
  }, []);

  const startTest = (): void => {
    if (isAdmin) {
      socket.emit('startTest', { roomId });
    }
  };

  const renderColorCodedText = () => {
    return text.split('').map((char, index) => {
      let className = 'text-muted-foreground';
      
      if (index < currentCharIndex) {
        className = typedText[index] === char ? 'text-green-500' : 'text-red-500';
      } else if (index === currentCharIndex) {
        className = 'bg-yellow-200';
      }

      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Typing Test Room</h1>
      <div className="flex flex-col gap-10">
        <Card>
          <CardHeader>
            <CardTitle>Room Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button onClick={createRoom} className="w-full">Create Room</Button>
              {roomId && (
                <div className="p-2 bg-muted rounded-md">
                  <p className="text-sm">Share this room ID with others:</p>
                  <p className="font-mono text-lg">{roomId}</p>
                </div>
              )}
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Enter Room ID"
                  onChange={(e) => setRoomId(e.target.value)}
                />
                <Button variant="outline" onClick={() => joinRoom(roomId)}>Join</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Typing Test</CardTitle>
          </CardHeader>
          <CardContent>
            {showCountdown && (
              <div className="text-center">
                <h2 className="text-6xl font-bold mb-2">{countdown}</h2>
                <p className="text-muted-foreground">Get ready...</p>
              </div>
            )}
            {(isTestRunning || resultsDisplayed) && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span className="font-semibold">{timeLeft}s</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-semibold">{accuracy.toFixed(2)}%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5" />
                    <span className="font-semibold">{wpm} WPM</span>
                  </div>
                </div>
                <Progress value={(typedText.length / text.length) * 100} className="w-full" />
                <div className="p-2 bg-muted rounded-md mb-2 overflow-x-hidden">
                  <p className="text-sm font-medium mb-1">Sample Text:</p>
                  <p className="whitespace-pre-wrap break-all text-lg leading-relaxed">
                    {renderColorCodedText()}
                  </p>
                </div>
                <Textarea
                  value={typedText}
                  onChange={handleTyping}
                  placeholder="Start typing..."
                  rows={5}
                  className="w-full resize-none"
                  disabled={!isTestRunning}
                  onPaste={handlePaste}
                  onContextMenu={handleContextMenu}
                />
              </div>
            )}
            {!isTestRunning && Object.keys(players).length > 0 && !resultsDisplayed && isAdmin && (
              <Button onClick={startTest} className="w-full">Start Typing Test</Button>
            )}
            {resultsDisplayed && (
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Final Results</h2>
                <p className="text-lg">Your WPM: <span className="font-bold">{wpm}</span></p>
                <p className="text-lg">Your Accuracy: <span className="font-bold">{accuracy.toFixed(2)}%</span></p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Leaderboard</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Object.keys(players).map((playerId) => (
                <div key={playerId} className="p-4 bg-muted rounded-lg">
                  <p className="font-semibold">{playerId}</p>
                  <p className="text-sm">WPM: {players[playerId].wpm}</p>
                  {/* <p className="text-sm">Accuracy: {players[playerId].accuracy.toFixed(2)}%</p> */}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}