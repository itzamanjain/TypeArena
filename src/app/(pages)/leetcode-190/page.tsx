'use client';

import { useEffect, useState } from 'react';
import { patterns } from '@/data/pattern';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

export default function Home() {
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState<Record<string, string>>({});

  const uniquePatterns = [...new Set(patterns.map(q => q.pattern))];
  const totalQuestions = patterns.length;
  const completedCount = completedQuestions.size;

  useEffect(() => {
    // Load completed questions from local storage
    const storedCompleted = getFromLocalStorage('completedQuestions');
    if (storedCompleted) {
      setCompletedQuestions(new Set(storedCompleted));
    }

    // Load notes from local storage
    const storedNotes = getFromLocalStorage('questionNotes');
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  const handleCheckQuestion = (id: string) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
    }
    setCompletedQuestions(newCompleted);
    saveToLocalStorage('completedQuestions', [...newCompleted]);
  };

  const handleNoteChange = (id: string, note: string) => {
    const newNotes = { ...notes, [id]: note };
    setNotes(newNotes);
    saveToLocalStorage('questionNotes', newNotes);
  };

  const saveToDatabase = async (questionId: string, notes: string, status: string) => {
    try {
      const response = await fetch('/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questionId, notes, status }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save data');
      }
  
      const result = await response.json();
      console.log('Save successful:', result);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const saveToLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  const getFromLocalStorage = (key: string) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  };

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">LeetCode Patterns Tracker</h1>
          <div className="flex gap-2 items-center">
            <Badge variant="secondary">
              {completedCount} / {totalQuestions} Completed
            </Badge>
            <Badge variant="outline">
              {uniquePatterns.length} Patterns
            </Badge>
          </div>
        </div>

        <Card className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Done</TableHead>
                <TableHead>Question</TableHead>
                <TableHead>Pattern</TableHead>
                <TableHead className="w-[300px]">Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patterns.map((question) => (
                <TableRow key={question.id}>
                  <TableCell>
                    <Checkbox
                      checked={completedQuestions.has(question.id)}
                      onCheckedChange={() => handleCheckQuestion(question.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <a
                      href={question.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {question.title}
                    </a>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{question.pattern}</Badge>
                  </TableCell>
                  <TableCell>
                    <Input
                      className="w-full word-break"
                      placeholder="Add notes..."
                      value={notes[question.id] || ''}
                      onChange={(e) => handleNoteChange(question.id, e.target.value)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </main>
  );
}
