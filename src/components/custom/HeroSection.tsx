'use client'

import Link from 'next/link'
import { Keyboard, Timer, Trophy, Users, BarChart, Target, Zap, Coffee, ArrowRight } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedTooltipPreview } from './AnimatedTooltip'
import { motion } from 'framer-motion'
import { Spotlight } from '../ui/Spotlight'

const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

export default function TypeArenaLanding() {
  return (
    <motion.div 
      initial="initial"
      animate="animate"
      className="min-h-screen w-full flex flex-col bg-white dark:bg-background relative overflow-hidden"
    >
      {/* <SpotlightPreview /> */}
      <Spotlight
        className="-top-40 hidden dark:flex left-0 md:left-60 md:-top-20"
        fill="gray"
      />
      {/* Background elements */}
      <div className="absolute dark:hidden inset-0 z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="dotted-pattern" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#e5e7eb" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotted-pattern)" />
        </svg>
      </div>

      <div className="absolute dark:hidden inset-0 z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="grid-pattern" width="64" height="64" patternUnits="userSpaceOnUse">
              <path d="M 64 0 L 0 0 0 64" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <div className="absolute dark:hidden inset-x-0 top-0 h-32 z-0">
        <svg className="w-full h-full" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
          <path fill="none" stroke="#e5e7eb" strokeWidth="1" d="M0,160 C320,300,520,0,1440,160 L1440,0 L0,0 Z"></path>
        </svg>
      </div>
      <div className="absolute dark:hidden inset-x-0 bottom-0 h-32 z-0">
        <svg className="w-full h-full" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
          <path fill="none" stroke="#e5e7eb" strokeWidth="1" d="M0,160 C320,20,520,320,1440,160 L1440,320 L0,320 Z"></path>
        </svg>
      </div>

      {/* Main content */}
      <motion.main 
        variants={stagger}
        className="flex-grow dark:text-white flex flex-col items-center justify-center relative z-10 px-6 py-16"
      >
        <motion.div 
          variants={fadeInUp}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.p 
            variants={fadeInUp}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mx-auto w-[200px] rounded-md mb-2 bg-gray-100 text-md text-gray-900"
          >
            🎉 Introducing TypeArena
          </motion.p>
          <motion.h1 
            variants={fadeInUp}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl w-full text-black dark:text-white font-bold mb-4 leading-tight"
          >
            Maximize Your Typing Speed <br /> with <span className='text-yellow-500'>TypeArena</span>
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mx-auto mt-2 text-lg mb-10 text-gray-800 dark:text-gray-300"
          >
            Compete in real-time with friends and players worldwide. <br /> Track your progress and master every keystroke.
          </motion.p>
          <motion.div 
            variants={fadeInUp}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Link
              href="/playground"
              className="bg-yellow-500 text-white px-8 py-3 rounded-full hover:bg-yellow-600 transition-colors inline-flex items-center text-lg font-medium"
            >
              Start Typing Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.section 
          variants={fadeInUp}
          transition={{ delay: 1, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 md:max-w-6xl"
        >
          {[
            { icon: Timer, title: "Time Challenges", content: "Test your speed and accuracy against the clock in various timed modes." },
            { icon: Trophy, title: "Leaderboards", content: "Climb the ranks and showcase your typing prowess on global leaderboards." },
            { icon: Users, title: "Multiplayer Rooms", content: "Create or join typing rooms to compete directly with friends and rivals." }
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={{
                initial: { opacity: 0, scale: 0.9 },
                animate: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 1.2 + index * 0.2 } }
              }}
            >
              <Card>
                <CardHeader>
                  <item.icon className="w-8 h-8 text-gray-600 mb-2" />
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">{item.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.section>

        <motion.section 
          variants={fadeInUp}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="rounded-lg p-8 mb-16"
        >
          <motion.h3 
            variants={fadeInUp}
            transition={{ delay: 2, duration: 0.8 }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Why Choose TypeArena?
          </motion.h3>
          <motion.div 
            variants={stagger}
            className="grid dark:text-gray-300 grid-cols-1 md:grid-cols-2 gap-8"
          >
            {[
              { icon: BarChart, title: "Detailed Analytics", content: "Track your progress with in-depth statistics and performance graphs." },
              { icon: Target, title: "Personalized Goals", content: "Set and achieve custom typing goals tailored to your skill level." },
              { icon: Zap, title: "Daily Challenges", content: "Take on new typing challenges every day to keep your skills sharp." },
              { icon: Coffee, title: "Typing Breaks", content: "Learn proper typing posture and take regular breaks to prevent fatigue." }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                transition={{ delay: 2.2 + index * 0.2, duration: 0.8 }}
                className="flex items-start"
              >
                <item.icon className="w-6 h-6 text-gray-600 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{item.content}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section 
          variants={fadeInUp}
          transition={{ delay: 3, duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h3 
            variants={fadeInUp}
            transition={{ delay: 3.2, duration: 0.8 }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Join Thousands of Happy Typists
          </motion.h3>
          <motion.div 
            variants={fadeInUp}
            transition={{ delay: 3.4, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <AnimatedTooltipPreview />
          </motion.div>
          <motion.p 
            variants={fadeInUp}
            transition={{ delay: 3.6, duration: 0.8 }}
            className="text-gray-600 dark:text-gray-300 text-xl mb-8"
          >
            &quot;TypeArena has transformed my typing speed and accuracy. I&apos;ve never had so much fun improving my skills!&quot;
          </motion.p>
          <motion.div 
            variants={fadeInUp}
            transition={{ delay: 3.8, duration: 0.8 }}
          >
            <Button variant="outline" size="lg" className="border-gray-300 text-gray-600 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800">
              Read Success Stories
            </Button>
          </motion.div>
        </motion.section>

        <motion.section 
          variants={fadeInUp}
          transition={{ delay: 4, duration: 0.8 }}
          className="rounded-lg p-8 text-center"
        >
          <motion.h3 
            variants={fadeInUp}
            transition={{ delay: 4.2, duration: 0.8 }}
            className="text-3xl font-bold text-gray-900 dark:text-gray-300 mb-6"
          >
            Ready to Become a Typing Master?
          </motion.h3>
          <motion.p 
            variants={fadeInUp}
            transition={{ delay: 4.4, duration: 0.8 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8"
          >
            Join our community of fast and accurate typists today. It&apos;s free to start!
          </motion.p>
          <motion.div 
            variants={fadeInUp}
            transition={{ delay: 4.6, duration: 0.8 }}
            className="flex justify-center gap-4"
          >
            <Button size="lg" className="bg-gray-900 text-white hover:bg-gray-800">
              <Link href='/signup'>Sign Up Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-gray-300 text-gray-600 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800">
              <Link href='/about'>Learn More</Link>
            </Button>
          </motion.div>
        </motion.section>
      </motion.main>
    </motion.div>
  )
}

