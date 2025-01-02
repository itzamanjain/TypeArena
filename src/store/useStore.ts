import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the types for the authentication store
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// Define the type for the User (customize based on your requirements)
interface User {
  id?: string;
  fullname?: string;
  email?: string;
  token: string;
  // Add more fields if necessary
}

// Create the zustand store with type annotations and persist middleware
const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (userData: User) => set({ isAuthenticated: true, user: userData }),
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: 'auth-storage', // Unique name for the store
    }
  )
);

export default useAuthStore;
