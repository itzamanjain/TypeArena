"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ArrowRight, Menu } from 'lucide-react'
import useAuthStore from '@/store/useStore'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const NavItems = () => (
  <>
    <Link href="/playground" className="text-gray-600 dark:text-white hover:text-gray-900 transition-colors">
      Play Now
    </Link>
    <Link href="/lobby" className="text-gray-600 dark:text-white hover:text-gray-900 transition-colors">
      Play with friends
    </Link>
  </>
)

export function Navbar() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuthStore()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async () => {
    // api call for logout 
    const response = await axios.get('/api/logout')
    console.log("response:", response.data)
    // Call the logout function from your auth store
    logout()

    router.push('/login')
  }

  return (
    <header className="container mx-auto px-4 py-6 border-b ">
      <nav className="flex justify-between items-center">
        <h1 className="text-2xl dark:text-white font-bold text-gray-900">
        <Link href="/" className="text-2xl font-semibold text-teal-500">
            TypeArena
          </Link>
        </h1>
        <div className="hidden md:flex justify-center items-center space-x-6">
          <NavItems />
          {/* Conditional Rendering for Auth Button */}
          {isAuthenticated ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <Link
            href="/signup"
            className="text-sm bg-teal-500 text-white px-4 py-2 rounded-full hover:bg-teal-600 transition-colors flex items-center"
          >
            Join Now
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
          )}
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
              {/* Conditional Rendering for Auth Button */}
              {isAuthenticated ? (
                <Button onClick={handleLogout}>Logout</Button>
              ) : (
                <Link href="/signup">Join Now</Link>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
