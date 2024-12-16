import Link from 'next/link'
import { Keyboard, Timer, Trophy, Users, BarChart, Target, Zap, Coffee, ArrowRight } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedTooltipPreview } from './AnimatedTooltip'

export default function TypeArenaLanding() {
  return (
    <div className="min-h-screen -mt-12 w-full flex flex-col bg-white relative overflow-hidden">
      
      {/* Dotted background */}
      <div className="absolute inset-0 z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="dotted-pattern" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#e5e7eb" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotted-pattern)" />
        </svg>
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="grid-pattern" width="64" height="64" patternUnits="userSpaceOnUse">
              <path d="M 64 0 L 0 0 0 64" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      {/* Curved lines */}
      <div className="absolute inset-x-0 top-0 h-32 z-0">
        <svg className="w-full h-full" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
          <path fill="none" stroke="#e5e7eb" strokeWidth="1" d="M0,160 C320,300,520,0,1440,160 L1440,0 L0,0 Z"></path>
        </svg>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-32 z-0">
        <svg className="w-full h-full" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
          <path fill="none" stroke="#e5e7eb" strokeWidth="1" d="M0,160 C320,20,520,320,1440,160 L1440,320 L0,320 Z"></path>
        </svg>
      </div>
     

      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center relative z-10 px-6 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
        <p className="mx-auto w-[200px] rounded-md mb-2 bg-gray-100 text-md text-gray-900">
            🎉 Introducing TypeArena
          </p>
          <h1 className="text-5xl w-full  font-bold mb-4 leading-tight">
           Master Your Typing Skills
          </h1>
          <p className="mx-auto mt-2 text-lg mb-10 text-gray-800 dark:text-black">
          Compete in real-time with friends and players worldwide. <br /> Track your progress and master every keystroke.
          </p>
          <Link
            href="/playground"
            className="bg-teal-500 text-white px-8 py-3 rounded-full hover:bg-teal-600 transition-colors inline-flex items-center text-lg font-medium"
          >
            Start Typing Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        
        {/* Call to Action */}

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card>
            <CardHeader>
              <Keyboard className="w-8 h-8 text-gray-600 mb-2" />
              <CardTitle>Real-Time Typing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Experience the thrill of live typing competitions with players worldwide.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Timer className="w-8 h-8 text-gray-600 mb-2" />
              <CardTitle>Time Challenges</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Test your speed and accuracy against the clock in various timed modes.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Trophy className="w-8 h-8 text-gray-600 mb-2" />
              <CardTitle>Leaderboards</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Climb the ranks and showcase your typing prowess on global leaderboards.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Users className="w-8 h-8 text-gray-600 mb-2" />
              <CardTitle>Multiplayer Rooms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Create or join typing rooms to compete directly with friends and rivals.</p>
            </CardContent>
          </Card>
        </section>

        <section className=" rounded-lg p-8 mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Why Choose TypeArena?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <BarChart className="w-6 h-6 text-gray-600 mr-4 flex-shrink-0" />
              <div>
                <h4 className="text-xl font-semibold mb-2">Detailed Analytics</h4>
                <p className="text-gray-600">Track your progress with in-depth statistics and performance graphs.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Target className="w-6 h-6 text-gray-600 mr-4 flex-shrink-0" />
              <div>
                <h4 className="text-xl font-semibold mb-2">Personalized Goals</h4>
                <p className="text-gray-600">Set and achieve custom typing goals tailored to your skill level.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Zap className="w-6 h-6 text-gray-600 mr-4 flex-shrink-0" />
              <div>
                <h4 className="text-xl font-semibold mb-2">Daily Challenges</h4>
                <p className="text-gray-600">Take on new typing challenges every day to keep your skills sharp.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Coffee className="w-6 h-6 text-gray-600 mr-4 flex-shrink-0" />
              <div>
                <h4 className="text-xl font-semibold mb-2">Typing Breaks</h4>
                <p className="text-gray-600">Learn proper typing posture and take regular breaks to prevent fatigue.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Join Thousands of Happy Typists</h3>
          <div className="flex flex-wrap justify-center gap-4 ">
           <AnimatedTooltipPreview />
          </div>
          <p className="text-gray-600 text-xl mb-8">
            &quot;TypeArena has transformed my typing speed and accuracy. I&apos;ve never had so much fun improving my skills!&quot;
          </p>
          <Button variant="outline" size="lg" className="border-gray-300 text-gray-600 hover:bg-gray-50">
            Read Success Stories
          </Button>
        </section>

        <section className=" rounded-lg p-8 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Ready to Become a Typing Master?</h3>
          <p className="text-xl text-gray-600 mb-8">Join our community of fast and accurate typists today. It&apos;s free to start!</p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-gray-900 text-white hover:bg-gray-800">
              <Link href='/signup'>Sign Up Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-50">
              <Link href='/about'>Learn More</Link>
            </Button>
          </div>
        </section>
        
      </main>
    </div>
  )
}
