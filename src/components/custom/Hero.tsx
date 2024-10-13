import Link from "next/link";
import { Button } from "../ui/button";
import { HeroScrollDemo } from "./HeroScroll";

export function Hero() {
  return (
    <div className="w-full ">
      <section className="text-center">
        <h2 className="text-7xl mt-10 font-bold text-gray-900 mb-4">
          Master Your Typing Skills
        </h2>
        <p className="text-2xl text-gray-600 mb-8">
          Challenge yourself, compete with friends, and become a typing legend!
        </p>
        <Link href="/playground">
          <Button
            size="lg"
            className="bg-gray-900 text-white mb-2 hover:bg-gray-800"
          >
            Start Typing Now
          </Button>
        </Link>
        <HeroScrollDemo />
      </section>
    </div>
  );
}
