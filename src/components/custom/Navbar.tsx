"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from 'lucide-react'

const NavItems = () => (
  <>
    <Link href="/playground" className="text-gray-600 dark:text-white hover:text-gray-900 transition-colors">
      Play Now
    </Link>
    <Link href="/leaderboard" className="text-gray-600 dark:text-white hover:text-gray-900 transition-colors">
      Leaderboard
    </Link>
    <Link href="/signup" className="text-gray-600 dark:text-white hover:text-gray-900 transition-colors">
      Join Now
    </Link>
  </>
)

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="container mx-auto px-4 py-6 border-b">
      <nav className="flex justify-between items-center">
        <h1 className="text-2xl dark:text-white  font-bold text-gray-900"><Link href='/'>TypeArena</Link></h1>
        <div className="hidden md:flex space-x-6">
          <NavItems />
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Menu">
              <Menu className="h-6 w-6 text-gray-600" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[240px] sm:w-[300px]">
            <nav className="flex flex-col space-y-4 mt-8">
              <NavItems />
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}