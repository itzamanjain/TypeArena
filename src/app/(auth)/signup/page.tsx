'use client'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignupPage() {

  const router = useRouter();

  const [user, setUser] = useState({
    fullname: '',
    username: '',
    email: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form from refreshing the page
    try {
      const response = await axios.post('/api/signup', user);
      console.log(response.data);
      router.push('/login');
    } catch (error: any) {
      console.log("Error while signing up:", error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 p-10 bg-white rounded-xl shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-gray-600 mt-2">Sign up to get started</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullname">Full Name</Label>
              <Input onChange={handleChange} id="fullname" name="fullname" type="text" required className="mt-1" placeholder="John Doe" />
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input onChange={handleChange} id="username" name="username" type="text" required className="mt-1" placeholder="johndoe" />
            </div>
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input onChange={handleChange} id="email" name="email" type="email" required className="mt-1" placeholder="john@example.com" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input onChange={handleChange} id="password" name="password" type="password" required className="mt-1" />
            </div>
          </div>
          <Button type="submit" className="w-full">Sign up</Button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
