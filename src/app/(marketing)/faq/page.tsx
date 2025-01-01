
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h1>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do I start a typing test?</AccordionTrigger>
            <AccordionContent>
              To start a typing test, simply click on the "Play Now" button in the navigation menu. You'll be taken to our playground where you can choose from various typing challenges and tests.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is TypeArena free to use?</AccordionTrigger>
            <AccordionContent>
              Yes, TypeArena is completely free to use. We offer a range of features and challenges at no cost. However, we may introduce premium features in the future for users who want an enhanced experience.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How are the typing speeds calculated?</AccordionTrigger>
            <AccordionContent>
              Typing speeds are calculated in words per minute (WPM). We use the standard definition of a word as 5 characters, including spaces. Your net WPM is calculated by subtracting your errors from your gross WPM.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Can I compete with my friends?</AccordionTrigger>
            <AccordionContent>
              You can create private rooms and invite your friends to compete in real-time typing races. You can also compare your scores on our global and friend leaderboards.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>How can I improve my typing speed?</AccordionTrigger>
            <AccordionContent>
              Regular practice is key to improving your typing speed. Use our daily challenges, personalized practice sessions, and themed tests to work on your weaknesses. Also, focus on accuracy first, and speed will naturally follow with consistent practice.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
      
    </div>
  )
}