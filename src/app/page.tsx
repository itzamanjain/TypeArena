import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Keyboard, Timer, Trophy, Users, BarChart, Target, Zap, Coffee } from 'lucide-react'
import { Navbar } from "@/components/custom/Navbar"
import { Footer } from "@/components/custom/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      
      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Master Your Typing Skills</h2>
          <p className="text-xl text-gray-600 mb-8">Challenge yourself, compete with friends, and become a typing legend!</p>
          <Link href='/playground'>
            <Button size="lg" className="bg-gray-900 text-white hover:bg-gray-800">
              Start Typing Now
            </Button>
          </Link>
        </section>

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

        <section className="bg-gray-50 rounded-lg p-8 mb-16">
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
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-gray-600">
                  {String.fromCharCode(65 + i)}
                </span>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-xl mb-8">
            &quot;TypeArena has transformed my typing speed and accuracy. I&apos;ve never had so much fun improving my skills!&quot;
          </p>
          <Button variant="outline" size="lg" className="border-gray-300 text-gray-600 hover:bg-gray-50">
            Read Success Stories
          </Button>
        </section>

        <section className="bg-gray-50 rounded-lg p-8 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Ready to Become a Typing Master?</h3>
          <p className="text-xl text-gray-600 mb-8">Join our community of fast and accurate typists today. It&apos;s free to start!</p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-gray-900 text-white hover:bg-gray-800">
              <Link href='/signup'>Sign Up Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-50">
              Learn More
            </Button>
          </div>
        </section>
      </main>

      
    </div>
  )
}