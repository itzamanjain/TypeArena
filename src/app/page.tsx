import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Keyboard, Timer, Trophy, Users, BarChart, Target, Zap, Coffee } from 'lucide-react'

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 via-pink-500 to-red-500">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">TypeArena</h1>
          <div className="space-x-4">
            <Link href="/playground" className="text-white hover:text-yellow-300 transition-colors">
              Play Now
            </Link>
            <Link href="/leaderboard" className="text-white hover:text-yellow-300 transition-colors">
              Leaderboard
            </Link>
            <Link href="/profile" className="text-white hover:text-yellow-300 transition-colors">
              Profile
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">Master Your Typing Skills</h2>
          <p className="text-xl text-white mb-8">Challenge yourself, compete with friends, and become a typing legend!</p>
          <Link href='/playground'>
          <Button size="lg" className="bg-yellow-400 text-gray-800 hover:bg-yellow-500">
            Start Typing Now
          </Button>
          </Link>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="bg-white/90 backdrop-blur-lg">
            <CardHeader>
              <Keyboard className="w-10 h-10 text-purple-500 mb-2" />
              <CardTitle>Real-Time Typing</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Experience the thrill of live typing competitions with players worldwide.</p>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-lg">
            <CardHeader>
              <Timer className="w-10 h-10 text-pink-500 mb-2" />
              <CardTitle>Time Challenges</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Test your speed and accuracy against the clock in various timed modes.</p>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-lg">
            <CardHeader>
              <Trophy className="w-10 h-10 text-yellow-500 mb-2" />
              <CardTitle>Leaderboards</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Climb the ranks and showcase your typing prowess on global leaderboards.</p>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-lg">
            <CardHeader>
              <Users className="w-10 h-10 text-green-500 mb-2" />
              <CardTitle>Multiplayer Rooms</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Create or join typing rooms to compete directly with friends and rivals.</p>
            </CardContent>
          </Card>
        </section>

        <section className="bg-white/90 backdrop-blur-lg rounded-lg p-8 mb-16">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Why Choose TypeArena?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <BarChart className="w-8 h-8 text-blue-500 mr-4 flex-shrink-0" />
              <div>
                <h4 className="text-xl font-semibold mb-2">Detailed Analytics</h4>
                <p>Track your progress with in-depth statistics and performance graphs.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Target className="w-8 h-8 text-red-500 mr-4 flex-shrink-0" />
              <div>
                <h4 className="text-xl font-semibold mb-2">Personalized Goals</h4>
                <p>Set and achieve custom typing goals tailored to your skill level.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Zap className="w-8 h-8 text-yellow-500 mr-4 flex-shrink-0" />
              <div>
                <h4 className="text-xl font-semibold mb-2">Daily Challenges</h4>
                <p>Take on new typing challenges every day to keep your skills sharp.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Coffee className="w-8 h-8 text-green-500 mr-4 flex-shrink-0" />
              <div>
                <h4 className="text-xl font-semibold mb-2">Typing Breaks</h4>
                <p>Learn proper typing posture and take regular breaks to prevent fatigue.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center mb-16">
          <h3 className="text-3xl font-bold text-white mb-6">Join Thousands of Happy Typists</h3>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-purple-500">
                  {String.fromCharCode(65 + i)}
                </span>
              </div>
            ))}
          </div>
          <p className="text-white text-xl mb-8">
            &quot;TypeArena has transformed my typing speed and accuracy. I&apos;ve never had so much fun improving my skills!&quot;
          </p>
          <Button variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white hover:text-purple-500">
            Read Success Stories
          </Button>
        </section>

        <section className="bg-white/90 backdrop-blur-lg rounded-lg p-8 text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Ready to Become a Typing Master?</h3>
          <p className="text-xl text-gray-600 mb-8">Join our community of fast and accurate typists today. It&apos;s free to start!</p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-purple-500 text-white hover:bg-purple-600">
              Sign Up Now
            </Button>
            <Button size="lg" variant="outline" className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white">
              Learn More
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h4 className="text-2xl font-bold mb-4">TypeArena</h4>
              <p>Empowering typists worldwide to achieve their full potential.</p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h5 className="text-xl font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-yellow-300 transition-colors">About Us</Link></li>
                <li><Link href="/faq" className="hover:text-yellow-300 transition-colors">FAQ</Link></li>
                <li><Link href="/contact" className="hover:text-yellow-300 transition-colors">Contact</Link></li>
                <li><Link href="/terms" className="hover:text-yellow-300 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h5 className="text-xl font-semibold mb-4">Connect With Us</h5>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-yellow-300 transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-yellow-300 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-yellow-300 transition-colors">
                  <span className="sr-only">GitHub</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2023 TypeArena. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}