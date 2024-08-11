type User = {
  id: string;
  name: string;
  email: string;
  username: string;
  habits: Habit[];
};

type Habit = {
  id: number;
  title: string;
  icon: string;
  currStreak: number;
  longestStreak: number;
  activities: Activity[];
  weeklyTarget: number;
};

type Activity = {
  id: number;
  habitId: number;
  x: number;
  y: number;
  date: string;
};
