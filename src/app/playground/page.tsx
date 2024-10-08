// src/components/TypingTest.tsx

"use client";

import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

// -----------------------
// Button Component
// -----------------------
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={clsx(
        "bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

// -----------------------
// Card Components
// -----------------------
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={clsx("shadow-md rounded-lg p-4", className)}>
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
}

const CardHeader: React.FC<CardHeaderProps> = ({ children }) => {
  return <div className="mb-2 flex justify-between items-center">{children}</div>;
};

interface CardTitleProps {
  children: React.ReactNode;
}

const CardTitle: React.FC<CardTitleProps> = ({ children }) => {
  return <h2 className="text-xl font-bold">{children}</h2>;
};

interface CardContentProps {
  children: React.ReactNode;
}

const CardContent: React.FC<CardContentProps> = ({ children }) => {
  return <div>{children}</div>;
};

// -----------------------
// Switch Component
// -----------------------
interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  label?: string;
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  className,
  label,
}) => {
  const handleChange = () => {
    onChange(!checked); // Toggle the checked state
  };

  return (
    <label className={clsx("flex items-center cursor-pointer", className)}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          className="sr-only"
        />
        <div
          className={clsx(
            "w-10 h-4 bg-gray-300 rounded-full shadow-inner transition-colors duration-200",
            checked ? "bg-blue-500" : ""
          )}
        ></div>
        <div
          className={clsx(
            "dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition-transform duration-200",
            checked ? "transform translate-x-full bg-blue-500" : ""
          )}
        ></div>
      </div>
      {label && (
        <span className="ml-3 text-gray-700 dark:text-gray-300">{label}</span>
      )}
    </label>
  );
};

// -----------------------
// Player Interface
// -----------------------
interface Player {
  id: number;
  name: string;
  wpm: number;
  accuracy: number;
  errors: number;
}

// -----------------------
// TypingTest Component
// -----------------------
const TypingTest: React.FC = () => {
  const [timer, setTimer] = useState<number>(60);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [typedText, setTypedText] = useState<string>("");
  const [scores, setScores] = useState<Player[]>([
    { id: 1, name: "You", wpm: 0, accuracy: 100, errors: 0 },
  ]);
  const [sampleText, setSampleText] = useState<string>(
    "When you start the game, you will be given a new paragraph."
  );
  const [errors, setErrors] = useState<number>(0);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  // -----------------------
  // Theme Management
  // -----------------------
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Prevent copying text during the game
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "c" || e.key === "C")) {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown as any);
    return () => {
      document.removeEventListener("keydown", handleKeyDown as any);
    };
  }, []);

  // -----------------------
  // Timer Management
  // -----------------------
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGameStarted && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsGameStarted(false);
    }
    return () => clearInterval(interval);
  }, [isGameStarted, timer]);

  // -----------------------
  // Start Game Function
  // -----------------------
  const startGame = (): void => {
    setIsGameStarted(true);
    setTimer(60);
    setTypedText("");
    setSampleText(selectRandomSampleText());
    setScores([{ id: 1, name: "You", wpm: 0, accuracy: 100, errors: 0 }]);
    setErrors(0);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.focus();
    }
  };

  // Select a random sample text
  const selectRandomSampleText = (): string => {
    const randomIndex = Math.floor(Math.random() * sampleTexts.length);
    return sampleTexts[randomIndex];
  };

  // -----------------------
  // Handle Typing
  // -----------------------
  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const typed = e.target.value;
    setTypedText(typed);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }

    const words = typed
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    const characters = typed.length;
    const accuracy = calculateAccuracy(
      sampleText.substring(0, characters),
      typed
    );
    const wpm = timer > 0 ? Math.round((words / (60 - timer)) * 60) : 0;

    const currentErrors = countErrors(
      sampleText.substring(0, characters),
      typed
    );

    setScores((prevScores) =>
      prevScores.map((score, index) =>
        index === 0 ? { ...score, wpm, accuracy, errors: currentErrors } : score
      )
    );
    setErrors(currentErrors);
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

  // Count typing errors
  const countErrors = (original: string, typed: string): number => {
    let errorCount = 0;
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] !== original[i]) errorCount++;
    }
    return errorCount;
  };

  // -----------------------
  // Render Sample Text with Highlights
  // -----------------------
  const renderSampleText = () => {
    const characters = sampleText.split("");
    return (
      <p className="font-mono text-lg">
        {characters.map((char, index) => {
          let className = "inline-block";
          if (index < typedText.length) {
            className +=
              char === typedText[index] ? " text-green-500" : " bg-red-300";
          } else {
            className += " text-gray-700 dark:text-gray-300";
          }
          return (
            <span key={index} className={className}>
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </p>
    );
  };

  return (
    <div
      className={clsx(
        "min-h-screen p-4 transition-colors duration-300",
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      )}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Typing Speed Test</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm">
            {theme === "light" ? "Light" : "Dark"} Mode
          </span>
          <Switch
            checked={theme === "dark"}
            onChange={(checked) => setTheme(checked ? "dark" : "light")}
            label="Toggle Theme"
          />
        </div>
      </div>

      {/* Typing Test Card */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle>Time Remaining: {timer}s</CardTitle>
        </CardHeader>
        <CardContent>
          {renderSampleText()}
          <textarea
            ref={textareaRef}
            value={typedText}
            onChange={handleTyping}
            placeholder="Start typing..."
            disabled={!isGameStarted}
            className={clsx(
              "w-full mt-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden",
              theme === "dark"
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-gray-100 text-gray-900 border-gray-300"
            )}
          />
          <div className="mt-4">
            <Button onClick={startGame} className="bg-blue-600 hover:bg-blue-700">
              {isGameStarted ? "Restart Test" : "Start Test"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Scores Card */}
      <Card className="mt-6 bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle>Your Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {scores.map((score) => (
              <li key={score.id}>
                <div className="flex justify-between">
                  <span className="font-semibold">{score.name}</span>
                  <div className="space-x-4">
                    <span>WPM: {score.wpm}</span>
                    <span>Accuracy: {score.accuracy}%</span>
                    <span>Errors: {score.errors}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default TypingTest;
