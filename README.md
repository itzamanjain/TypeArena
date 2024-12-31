# Type Arena

**Type Arena** is a fast-paced multiplayer typing game that challenges your typing speed and accuracy. Compete with others in real-time to prove you're the fastest typist in the arena!

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [How to Play](#how-to-play)
- [Contributing](#contributing)
- [Technologies Used](#technologies-used)
- [Deployment](#deployment)


## Features

- **Real-Time Multiplayer**: Play against other players in real-time typing matches.
- **Live Scoreboard**: Track your rank and progress during live games.
- **Typing Speed & Accuracy**: Monitor your Words Per Minute (WPM) and accuracy in every game.
- **Leaderboard**: Compare your scores with players worldwide.
- **Custom Game Rooms**: Create personalized game rooms with custom settings such as word length, game duration, and more.
- **Mobile & Desktop Friendly**: Fully responsive design for both desktop and mobile users.
- **Authentication**: Authentication system to signup, login, logout and reset password(to be done)

## to be added

- **Profile**: Profile page to show all the matches played and stats
- **Leaderboard**: Leaderboard page to show the top players and their stats
- **Settings**: Settings page to change the game settings
- **Achievements**: Achievements page to show the achievements and rewards to engaze user
- **Shop**: Shop page to buy the premium features 🤔
- **Friends**: Friends page to add friends and chat with them
- **Chat**: Chat page to chat with other players
- **Notifications**: Notifications page to show the notifications
-

## Getting Started

Follow the instructions below to set up and run Type Arena on your local machine.

### Prerequisites

You will need to have the following installed on your system:

- [Node.js](https://nodejs.org/) (v20 or newer)
- [npm](https://www.npmjs.com/) (or Yarn, pnpm, or bun)
- Git (recommended for cloning the repository)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/type-arena.git
   ```

   ```bash
   cd type-arena
   npm install
   npm run dev
   ```

   Open your browser and navigate to http://localhost:3000 to access the game.

## How to Play

1. **Join or Create a Room**: Enter an existing game room or create a custom one with your preferred settings (e.g., word length, game duration).
2. **Start Typing**: Type the provided text as quickly and accurately as possible once the game begins.
3. **Live Scoreboard**: Track your typing speed (Words Per Minute) and accuracy during the game in real-time.
4. **Win the Game**: The player with the highest WPM and accuracy at the end of the match wins!

## Contributing

We welcome contributions to enhance Type Arena! Here’s how you can contribute:

1. Fork the repository.
2. Create a new branch for your feature or fix:
   
   ```bash
   git checkout -b feature/YourFeatureName
   ```

commit the changes

  ```bash
   git commit -m "Add YourFeatureName"
  ```

3. push to the brach
     ```bash
       git push origin feature/YourFeatureName
     ```
4. Open a pull request, and we will review it.

## Technologies Used

1. Next.js - React-based framework for building the frontend.

2. Socket.io - Enables real-time, bidirectional communication between players.

3. Tailwind CSS - Utility-first CSS framework used for designing the UI.
4. React - JavaScript library for building user interfaces.
5. Vercel - Platform for deploying and hosting the application.

## Deployment 

for frontend deployment we are using vercel and for backend we are figuring out either free or cheap for as of now (for backend we have express and socket io server ) and for auth and all we are using next js api/ route.ts 

