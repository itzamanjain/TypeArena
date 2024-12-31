'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Award, Clock, Target, Trophy, Loader2 } from 'lucide-react';
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type User = {
  _id: string;
  fullname: string;
  username: string;
  bio: string;
  profilePicUrl: string;
  testAttempted: number;
  topSpeed: number;
  avgSpeed: number | null;
  history: {
    _id: string;
    speed: number;
    accuracy: number;
    testPlayed: string;
  }[];
  achievement: string[];
}

async function getProfileData(username: string): Promise<User | null> {
  try {
    const response = await axios.get(`/api/player-profile?username=${username}`);
    toast.success('Profile fetched successfully');
    return response.data.user;
  } catch (error) {
    console.error('Failed to fetch profile data:', error);
    toast.error('failde to fetch profile')
    return null;
  }
}

export default function ProfilePage({ params }: { params: { username: string } }) {
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getProfileData(params.username);
      setUserData(data);
      setIsLoading(false);
    }
    fetchData();
  }, [params.username]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin text-yellow-500" />
      </div>
    );
  }

  if (!userData) {
    return <div className="text-center mt-8">User not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1 space-y-4">
          <UserInfo user={userData} />
          <UserStats user={userData} />
          <Achievements achievements={userData.achievement} />
        </div>
        <div className="md:col-span-2">
          <RecentActivity history={userData.history} />
        </div>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}

function UserInfo({ user }: { user: User }) {
  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src={user.profilePicUrl} alt={user.fullname} />
            <AvatarFallback>{user.fullname.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold">{user.fullname}</h2>
          <p className="text-muted-foreground">@{user.username}</p>
          <p className="mt-2 text-center">{user.bio || "No bio available"}</p>
          <p className="mt-2 text-center">
            Last Online: {user.history.length > 0 ? new Date(user.history[user.history.length - 1].testPlayed).toLocaleString() : 'No data available'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function UserStats({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="mr-2" />
          Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="flex items-center"><Target className="mr-2" /> Tests Attempted</span>
            <span className="font-semibold">{user.testAttempted}</span>
          </div>
          <div className="flex justify-between">
            <span className="flex items-center"><Trophy className="mr-2" /> Top Speed</span>
            <span className="font-semibold">{user.topSpeed} WPM</span>
          </div>
          <div className="flex justify-between">
            <span className="flex items-center"><Activity className="mr-2" /> Average Speed</span>
            <span className="font-semibold">{user.avgSpeed ? `${user.avgSpeed.toFixed(2).slice(0,2)} WPM` : 'N/A'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RecentActivity({ history }: { history: User['history'] }) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="mr-2" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {history.slice(-8).reverse().map((test) => (
            <div key={test._id} className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{test.speed} WPM</p>
                <p className="text-sm text-muted-foreground">Accuracy: {test.accuracy.toFixed(2)}%</p>
              </div>
              <p className="text-sm text-muted-foreground">
                {new Date(test.testPlayed).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function Achievements({ achievements }: { achievements: string[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Award className="mr-2" />
          Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        {achievements.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center">
                <Award className="mr-2" />
                <span>{achievement}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No achievements yet. Keep practicing!</p>
        )}
      </CardContent>
    </Card>
  );
}

