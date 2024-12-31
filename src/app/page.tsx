import { Hero } from '@/components/custom/Hero'
import { ThemeProvider } from '@/components/theme-providers'

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className="mx-auto px-4 py-12">
        <Hero />    
      </main>
    </ThemeProvider>
  )
}