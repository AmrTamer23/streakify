# ⚡ Streakify - Habit Tracking App

Streakify is a habit tracking application designed to help users build good habits and break bad ones. With features to track progress, visualize streaks, and stay motivated, Streakify aims to enhance your productivity and personal growth.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)

## Features

- **Track Your Habits**: Monitor your daily habits and visualize your progress.
- **Stay Motivated**: Get reminders and insights to keep you on track.
- **Build Good Habits**: Set targets and track your achievements.
- **Break Bad Habits**: Identify and reduce negative behaviors.

## Technologies Used

- **Frontend**: Vue3, Nuxt.js, Tailwind CSS
- **Backend**: Nuxt.js, Prisma ORM
- **Database**: PostgreSQL (on Neon)
- **Authentication**: Supabase
- **Deployment**: Vercel

## Contributing

First you need to craete a .env file and add the following:

- SUPABASE_URL
- SUPABASE_KEY
- DATABASE_URL (neon is recommended)

Make sure to install the dependencies:

```bash
npm install
```

Run prisma init to create prisma client:

```bash
npx prisma init
```

Then run prisma migrate on the database:

```bash
npx prisma migrate dev
```

To run the app:

```bash
npm run dev
```

Open your browser and visit http://localhost:3000 to see the app.

Feel free to contribute to this project by submitting pull requests or reporting issues.

---
