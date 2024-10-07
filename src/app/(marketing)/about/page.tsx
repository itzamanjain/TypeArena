
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About TypeArena</h1>
        <div className="space-y-6 text-gray-600">
          <p>
            TypeArena is a cutting-edge platform designed to help individuals improve their typing skills through engaging challenges and competitions. Our mission is to make typing practice fun, social, and rewarding.
          </p>
          <p>
            Founded in 2023, TypeArena has quickly grown to become a favorite among typing enthusiasts, students, and professionals looking to enhance their keyboard proficiency. Our team of dedicated developers and typing experts work tirelessly to create new challenges, improve user experience, and foster a supportive community.
          </p>
          <p>
            At TypeArena, we believe that strong typing skills are essential in today's digital world. Whether you're a beginner looking to increase your typing speed or an expert aiming to break records, TypeArena offers a range of features to help you achieve your goals.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Features</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Real-time multiplayer typing races</li>
            <li>Personalized practice sessions</li>
            <li>Daily challenges and leaderboards</li>
            <li>Detailed performance analytics</li>
            <li>Typing games and themed challenges</li>
          </ul>
        </div>
      </main>
      
    </div>
  )
}