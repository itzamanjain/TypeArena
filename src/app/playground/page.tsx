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
        "bg-black text-white hover:bg-gray-900 font-semibold py-2 px-4 rounded transition-colors duration-200",
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
// Modal Component
// -----------------------
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} // Close modal when clicking outside the content
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6 relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal content
      >
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          onClick={onClose}
          aria-label="Close Modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
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
  const WORD_LIMIT = 100; // Maximum number of words allowed

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
  const [showModal, setShowModal] = useState<boolean>(false); // State for Modal
  const [wordCount, setWordCount] = useState<number>(0); // State for word count
  const [pasteAttempted, setPasteAttempted] = useState<boolean>(false); // State for paste attempt

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const sampleTexts: string[] = [
    // ...your existing sample texts
    "The sun was setting over the horizon, casting a warm golden glow across the landscape. A gentle breeze rustled through the trees, and the sound of birds chirping filled the air. The world seemed at peace in that quiet moment, and time felt like it was standing still. People walked slowly along the path, enjoying the beauty of the evening, while the clouds above turned shades of pink and orange. It was one of those perfect days, where everything felt in harmony, reminding us to appreciate the simple joys that life has to offer.",

    "In a small village, nestled between lush hills, lived an old woman named Clara. She was known for her extraordinary ability to weave tales that enchanted everyone who listened. Each evening, children would gather around her fireplace, eyes wide with anticipation, as she spun stories of dragons, fairies, and brave heroes. Clara’s voice, soft yet powerful, painted vivid images in their minds, transporting them to far-off lands. As the fire crackled and the stars twinkled outside, the children would lose themselves in the magic of her words, eager for the next adventure.",

    "Emma was rushing out for work when she realized her key was missing. Panic set in as she rummaged through her bag, pockets, and drawers. She retraced her steps but found nothing. Feeling hopeless, she sat down, only to notice her cat batting something shiny under the couch. Reaching underneath, she pulled out the key. Emma sighed in relief, laughing at the irony. Her cat, always mischievous, had hidden her most important possession. She petted him, grateful for the unexpected help. Sometimes, the solution is right under our noses, waiting to be discovered.",

    "When Lily and her friends dug up the time capsule they buried a decade ago, they felt nostalgic. Each item brought back memories: a toy car, a friendship bracelet, and a photograph of their younger selves. They laughed, remembering the carefree days of childhood. But one note caught Lily’s eye; it was her own message, predicting where she’d be in ten years. She smiled, realizing she had achieved most of her dreams. The time capsule reminded them of their past, but it also inspired them to create new memories together, making every moment count.",
    
    "In a small town, there was an old library that no one visited anymore. Maya, a book lover, decided to volunteer and bring it back to life. She dusted the shelves, reorganized books, and set up a cozy reading corner. Slowly, children started coming, curious about the new stories waiting for them. Soon, the library became a lively place again, filled with laughter and whispers of shared stories. Maya felt fulfilled, knowing she had created a haven for young readers. The little library once forgotten was now a cherished place, bringing people together through the magic of books.",

    "Jack hated rainy days. They always ruined his plans, making him feel trapped indoors. One day, the rain was relentless, and he sat by the window, sulking. Suddenly, he saw a little girl outside, splashing in the puddles, her face beaming with joy. Jack smiled, inspired by her carefree spirit. He grabbed his raincoat and joined her, feeling the cool drops on his face. They laughed, jumping in puddles together. Jack realized rainy days weren’t so bad after all; they could be fun if he embraced the moment. Sometimes, joy comes from the simplest of things.",

    "Walking home late one night, Mia noticed a small, wrapped box on a bench. Curious, she picked it up and read the tag: “To someone who needs a little magic.” She hesitated but took it home. Inside was a silver charm bracelet, each charm representing something magical—a star, a moon, and a tiny book. The bracelet felt special, as if it had been meant for her. From that day, little lucky moments happened: a surprise job offer, an old friend reconnecting. Mia smiled, realizing that sometimes, the universe sends small gifts to brighten our paths.",

    "Lucas missed the last bus home and ended up at the train station, waiting for the midnight train. It was eerily quiet, the air filled with the distant hum of engines. He noticed an elderly man sitting alone, staring at an old photograph. Lucas struck up a conversation, and the man shared stories of his travels across the country when he was young. The train finally arrived, and as Lucas boarded, the man smiled, saying, “Cherish your adventures, son.” Years later, Lucas remembered that encounter, grateful for the wisdom shared during that unexpected, fleeting moment.",

    "Ella’s job as a lighthouse keeper was lonely, but she loved the sea’s roar and the beacon’s steady light cutting through the darkness. One stormy night, she spotted a tiny fishing boat struggling against the waves. Without hesitation, she activated the foghorn and intensified the light, guiding the boat to safety. The next morning, a fisherman knocked on her door, holding a basket of freshly caught fish. “Thank you for saving me,” he said. Ella smiled, realizing her work wasn’t just about maintaining a lighthouse; it was about helping others find their way home.",

    "Jack hated rainy days. They always ruined his plans, making him feel trapped indoors. One day, the rain was relentless, and he sat by the window, sulking. Suddenly, he saw a little girl outside, splashing in the puddles, her face beaming with joy. Jack smiled, inspired by her carefree spirit. He grabbed his raincoat and joined her, feeling the cool drops on his face. They laughed, jumping in puddles together. Jack realized rainy days weren’t so bad after all; they could be fun if he embraced the moment. Sometimes, joy comes from the simplest of things."
  
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
    } else if (timer === 0 && isGameStarted) {
      setIsGameStarted(false);
      setShowModal(true); // Show the modal when time ends
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
    setWordCount(0);
    setShowModal(false); // Hide modal if it's open
    setPasteAttempted(false); // Reset paste attempt state

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
    let typed = e.target.value;

    // Split the typed text into words
    const words = typed.trim().split(/\s+/).filter((word) => word.length > 0);
    let currentWordCount = words.length;

    if (currentWordCount > WORD_LIMIT) {
      // If word limit exceeded, trim the typed text to the word limit
      typed = words.slice(0, WORD_LIMIT).join(" ");
      currentWordCount = WORD_LIMIT;
    }

    setTypedText(typed);
    setWordCount(currentWordCount);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }

    const characters = typed.length;
    const accuracy = calculateAccuracy(
      sampleText.substring(0, characters),
      typed
    );
    const wpm = timer > 0 ? Math.round((currentWordCount / (60 - timer)) * 60) : 0;

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
  // Handle Paste Attempt
  // -----------------------
  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault(); // Prevent pasting
    setPasteAttempted(true); // Trigger feedback message
  };

  useEffect(() => {
    if (pasteAttempted) {
      const timer = setTimeout(() => setPasteAttempted(false), 3000); // Hide message after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [pasteAttempted]);

  // -----------------------
  // Prevent Drag-and-Drop Pasting (Optional)
  // -----------------------
  const handleDrop = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault(); // Prevent dropping text
    setPasteAttempted(true); // Optionally trigger feedback
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
        <div className="flex items-center space-x-2">
          <span className="text-sm">
            
          </span>
        </div>
      </div>

      {/* Typing Test Card */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle >{isGameStarted && <h1 className="text-red-500">Time Remaining: {timer}s</h1>}</CardTitle>
        </CardHeader>
        <CardContent>
          {renderSampleText()}
          <textarea
            ref={textareaRef}
            value={typedText}
            onChange={handleTyping}
            onPaste={handlePaste} // Prevent pasting
            onDrop={handleDrop} // Prevent drag-and-drop pasting (optional)
            placeholder="Start typing..."
            disabled={!isGameStarted || wordCount >= WORD_LIMIT}
            className={clsx(
              "w-full mt-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden",
              theme === "dark"
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-gray-100 text-gray-900 border-gray-300"
            )}
          />
          {/* Word Count Display */}
          <div
            className={clsx(
              "mt-2 text-sm",
              wordCount >= WORD_LIMIT
                ? "text-red-500 dark:text-red-400"
                : "text-gray-600 dark:text-gray-400"
            )}
          >
            Words: {wordCount} / {WORD_LIMIT}
            {wordCount >= WORD_LIMIT && (
              <span className="ml-2">You've reached the word limit.</span>
            )}
          </div>
          {/* Paste Attempt Feedback */}
          {pasteAttempted && (
            <div className="mt-2 text-sm text-red-500 dark:text-red-400">
              Pasting is disabled. Please type manually.
            </div>
          )}
          <div className="mt-4">
            <Button onClick={startGame} className="bg-black text-white dark:bg-white dark:text-black">
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

      {/* Modal for Time Finished */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-2xl font-bold mb-4">Time's Up!</h2>
        <p className="mb-4">Your time has finished. Here are your results:</p>
        <ul className="space-y-2">
          {scores.map((score) => (
            <li key={score.id}>
              <div className="flex justify-between">
                <span className="font-semibold">{score.name}</span>
                <div className="space-x-2">
                  <span>WPM: {score.wpm}</span>
                  <span>Accuracy: {score.accuracy}%</span>
                  <span>Errors: {score.errors}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-end space-x-4">
          <Button onClick={startGame} className="bg-green-500 hover:bg-green-600">
            Play Again
          </Button>
          <Button onClick={() => setShowModal(false)} className="bg-gray-500 hover:bg-gray-600">
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default TypingTest;
