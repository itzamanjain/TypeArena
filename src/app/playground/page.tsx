"use client";

import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define the Player type
interface Player {
  id: number;
  name: string;
  wpm: number;
  accuracy: number;
}

// Mock data for players
const players: Player[] = [
  { id: 1, name: "You", wpm: 0, accuracy: 100 },
];

// Sample texts for typing, each with 90-95 words
const sampleTexts: string[] = [
  "The sun was setting over the horizon, casting a warm golden glow across the landscape. A gentle breeze rustled through the trees, and the sound of birds chirping filled the air. The world seemed at peace in that quiet moment, and time felt like it was standing still. People walked slowly along the path, enjoying the beauty of the evening, while the clouds above turned shades of pink and orange. It was one of those perfect days, where everything felt in harmony, reminding us to appreciate the simple joys that life has to offer.",
  
  "In a small village, nestled between lush hills, lived an old woman named Clara. She was known for her extraordinary ability to weave tales that enchanted everyone who listened. Each evening, children would gather around her fireplace, eyes wide with anticipation, as she spun stories of dragons, fairies, and brave heroes. Clara’s voice, soft yet powerful, painted vivid images in their minds, transporting them to far-off lands. As the fire crackled and the stars twinkled outside, the children would lose themselves in the magic of her words, eager for the next adventure.",
  
  "Beneath the vast blue ocean, a world filled with mysteries awaited discovery. Colorful coral reefs thrived in the sunlight, providing shelter to myriad sea creatures. Schools of fish darted through the water, their scales shimmering like jewels. In the depths, an ancient shipwreck lay, covered in seaweed and home to curious octopuses. Explorers dreamed of uncovering the secrets hidden within, using advanced technology to navigate the underwater landscape. Each dive brought new surprises, and with every bubble released, the thrill of exploration ignited their spirits, reminding them of the beauty of the unknown.",
  
  "As winter approached, the first snowfall blanketed the quiet town, transforming it into a scene from a postcard. Children bundled up in colorful jackets raced outside, laughter echoing in the chilly air as they built snowmen and engaged in friendly snowball fights. The crisp smell of pine filled the air as families prepared for the holidays, decorating their homes with twinkling lights. Hot chocolate was served, steam rising from mugs as everyone gathered around fireplaces, sharing stories and warmth. It was a time for togetherness, reminding each person of the joy and love that came with the season.",
  
  "The forest was alive with the sounds of nature, a symphony of rustling leaves and chirping crickets. As the sun filtered through the trees, it created a dance of light and shadow on the forest floor. A young girl named Elara wandered through the woods, enchanted by the beauty surrounding her. She discovered hidden paths leading to sparkling streams and secret clearings filled with wildflowers. Each step unveiled the wonders of the natural world, filling her heart with peace and curiosity. Elara knew that this magical place would always hold a special spot in her heart, a sanctuary of tranquility.",
  
  "In a bustling city, where life moved at a rapid pace, a small bookstore stood as a quiet refuge. Shelves filled with stories waited to be explored, and the scent of aged paper enveloped visitors as they stepped inside. The owner, an elderly gentleman named Mr. Harper, greeted everyone with a warm smile, ready to recommend a book for every mood. People would lose track of time in the cozy corners, sipping tea while diving into worlds crafted by words. The bookstore became a gathering place for book clubs and writers, fostering a community bound by a shared love for literature.",
  
  "A brilliant scientist named Dr. Elena Carter was on the brink of a groundbreaking discovery. After years of research, she developed a device capable of harnessing renewable energy from the sun more efficiently than ever before. As she stood in her lab, surrounded by papers and models, excitement bubbled within her. This innovation could change the world, providing sustainable energy to millions. With her team, she prepared for a demonstration that could revolutionize energy consumption. The weight of responsibility pressed on her shoulders, but Elena was determined to bring her vision to life, confident in the positive impact it would have.",
  
  "In the heart of the city, a beautiful garden bloomed amid the concrete jungle. Vibrant flowers danced in the gentle breeze, and butterflies flitted from blossom to blossom, creating a stunning display of nature’s artistry. The garden was a sanctuary for weary souls seeking solace from their hectic lives. Visitors would come to meditate, read, or simply enjoy the beauty surrounding them. On weekends, the garden came alive with laughter as families gathered for picnics and children chased each other through the greenery. It was a reminder that even in urban chaos, nature could thrive and bring joy.",
];

const TypingTest: React.FC = () => {
  const [timer, setTimer] = useState<number>(60);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [typedText, setTypedText] = useState<string>("");
  const [scores, setScores] = useState<Player[]>(players);
  const [sampleText, setSampleText] = useState<string>("When you start the game, you will be given a new paragraph.");

  const textareaRef = useRef<HTMLTextAreaElement>(null); // Ref for textarea

  // Prevent copying via keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent<Document>) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown as any);
    return () => {
      document.removeEventListener('keydown', handleKeyDown as any);
    };
  }, []);

  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGameStarted && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsGameStarted(false);
    }
    return () => clearInterval(interval);
  }, [isGameStarted, timer]);

  // Start the game
  const startGame = (): void => {
    setIsGameStarted(true);
    setTimer(60);
    setTypedText("");
    setSampleText(selectRandomSampleText()); // Select a random sample text
    setScores(players.map(player => ({ ...player, wpm: 0, accuracy: 100 })));

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  // Function to select a random sample text
  const selectRandomSampleText = (): string => {
    const randomIndex = Math.floor(Math.random() * sampleTexts.length);
    return sampleTexts[randomIndex];
  };

  // Handle typing input
  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const typed = e.target.value;
    setTypedText(typed);

    // Adjust textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set to scrollHeight
    }

    // Calculate WPM and accuracy
    const words = typed.trim().split(/\s+/).filter(word => word.length > 0).length;
    const characters = typed.length;
    const accuracy = calculateAccuracy(sampleText.substring(0, characters), typed);
    const elapsedTime = 60 - timer;
    const wpm = elapsedTime > 0 ? Math.round((words / (elapsedTime / 60))) : 0;

    // Update scores for the first player
    setScores(prevScores =>
      prevScores.map((score, index) =>
        index === 0 ? { ...score, wpm, accuracy } : score
      )
    );
  };

  // Calculate typing accuracy
  const calculateAccuracy = (original: string, typed: string): number => {
    if (typed.length === 0) return 100;
    let correct = 0;
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === original[i]) correct++;
    }
    return Math.round((correct / typed.length) * 100);
  };

  // Function to render sample text with colored characters
  const renderSampleText = () => {
    const characters = sampleText.split('');
    return (
      <span>
        {characters.map((char, index) => {
          let color;
          if (index < typedText.length) {
            color = char === typedText[index] ? 'text-green-500' : 'bg-red-300';
          } else {
            color = 'text-gray-700';
          }
          return (
            <span key={index} className={color}>
              {char}
            </span>
          );
        })}
      </span>
    );
  };

  return (
    <div className="container min-h-screen mx-auto p-4">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold mb-2">Typing Speed Test</h1>
        {isGameStarted ? (
          <div className="text-4xl font-bold text-red-600">{timer}s</div>
        ) : (
          <Button onClick={startGame}>Start Game</Button>
        )}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Text to type:</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-mono">
            {renderSampleText()} {/* Render colored text */}
          </div>
        </CardContent>
      </Card>
      {/* Using textarea with auto-resize */}
      <textarea
        ref={textareaRef}
        placeholder="Type here..."
        value={typedText}
        onChange={handleTyping}
        disabled={!isGameStarted}
        className="mt-4 w-full p-2 border rounded font-mono text-lg"
        style={{
          resize: 'none',
          overflow: 'hidden',
          minHeight: '40px',
        }}
      />
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Scores:</h2>
        {scores.map(player => (
          <div key={player.id}>
            {player.name}: {player.wpm} WPM, {player.accuracy}% Accuracy
          </div>
        ))}
      </div>
    </div>
  );
};

export default TypingTest;
