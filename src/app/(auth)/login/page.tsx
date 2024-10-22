'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import useAuthStore from '@/store/useStore' // Import your auth store

export default function LoginPage() {

  const router = useRouter();
  const { login } = useAuthStore(); // Access the login function from the store

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload on form submit
    setLoading(true); // Set loading to true while processing the request

    try {
      const response = await axios.post('/api/login', user);
      console.log("response:", response.data);
      
      // Assuming the response contains user data in the format { id, name, email }
      const userData = response.data.user; // Extract the user data from the response

      // Set user as authenticated in the store
      login(userData); // Call the login function from your auth store

      // Redirect to lobby page after successful login
      router.push('/lobby');
      
    } catch (error: any) {
      console.error("Error during login:", error);
      // Handle login error here (e.g., show an error message to the user)

    } finally {
      setLoading(false); // Set loading back to false after request completes
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 p-10 bg-white rounded-xl shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-gray-600 mt-2">Log in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input 
                onChange={handleChange} 
                id="email" 
                name="email" 
                type="email" 
                required 
                className="mt-1" 
                placeholder="john@example.com" 
                value={user.email} 
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input 
                onChange={handleChange} 
                id="password" 
                name="password" 
                type="password" 
                required 
                className="mt-1" 
                value={user.password} 
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input 
                id="remember-me" 
                name="remember-me" 
                type="checkbox" 
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" 
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-teal-600 hover:text-teal-500">
                Forgot your password?
              </Link>
            </div>
          </div>
          <Button type="submit" className="w-full text-white hover:bg-teal-600 bg-teal-500" disabled={loading}>
            {loading ? 'Logging in...' : 'Log in'}
          </Button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="font-medium text-teal-600 hover:text-teal-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
