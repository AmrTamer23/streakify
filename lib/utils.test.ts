import { calculateCompletionRate, calculateStreakCompletion } from "./utils";
import dayjs from "dayjs";

const today = dayjs().startOf("day");
const yesterday = today.subtract(1, "day");
const twoDaysAgo = today.subtract(2, "day");

const testHabits: Habit[] = [
  {
    id: 81,
    title: "LL",
    icon: "...",
    currStreak: 0,
    longestStreak: 0,
    weeklyTarget: 4,
    activities: [
      {
        id: 112,
        habitId: 81,
        x: 1,
        y: 1,
        date: today.valueOf().toString(),
      },
      {
        id: 113,
        habitId: 81,
        x: 1,
        y: 1,
        date: yesterday.valueOf().toString(),
      },
    ],
  },
  {
    id: 82,
    title: "Test Habit",
    icon: "...",
    currStreak: 0,
    longestStreak: 0,
    weeklyTarget: 3,
    activities: [
      {
        id: 114,
        habitId: 82,
        x: 1,
        y: 1,
        date: twoDaysAgo.valueOf().toString(),
      },
    ],
  },
];

describe("calculateCompletionRate", () => {
  it("should return 0 for empty habits array", () => {
    expect(calculateCompletionRate([])).toBe(0);
  });

  it("should calculate correct completion rate", () => {
    const result = calculateCompletionRate(testHabits);
    expect(result).toBe(50);
  });

  it("should return 0 when no habits are completed today", () => {
    const noCompletionHabits = testHabits.map((habit) => ({
      ...habit,
      activities: habit.activities.map((activity) => ({
        ...activity,
        date: yesterday.valueOf().toString(),
      })),
    }));
    expect(calculateCompletionRate(noCompletionHabits)).toBe(0);
  });

  it("should return 100 when all habits are completed today", () => {
    const allCompletedHabits = testHabits.map((habit) => ({
      ...habit,
      activities: [
        {
          id: 0,
          habitId: habit.id,
          date: today.valueOf().toString(),
          x: 0,
          y: 0,
        },
      ],
    }));
    expect(calculateCompletionRate(allCompletedHabits)).toBe(100);
  });
});

describe("calculateStreakCompletion", () => {
  it("should return 0 for empty habits array", () => {
    expect(calculateStreakCompletion([])).toBe(0);
  });

  it("should return 0 if total weekly target is 0", () => {
    const habitsWithZeroTarget = [{ ...testHabits[0], weeklyTarget: 0 }];
    expect(calculateStreakCompletion(habitsWithZeroTarget)).toBe(0);
  });

  it("should calculate streak completion correctly", () => {
    expect(calculateStreakCompletion(testHabits)).toBe(43); // (3 activities / 7 weekly target) * 100 ≈ 43
  });

  it("should only count activities from current week", () => {
    const lastWeek = today.subtract(1, "week");
    const habitsWithOldActivity = [
      {
        ...testHabits[0],
        activities: [
          ...testHabits[0].activities,
          {
            id: 4,
            habitId: 81,
            x: 1,
            y: 1,
            date: lastWeek.valueOf().toString(),
          },
        ],
      },
      testHabits[1],
    ];
    expect(calculateStreakCompletion(habitsWithOldActivity)).toBe(43); // Should be the same as the previous test
  });
});
