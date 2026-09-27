<div align="center">

<img src="public/logo.png" alt="FitLog logo" width="72" />

# FitLog — Workout Library

**Train with intent. Log every set.**

A dark, no-nonsense gym companion: browse a library of lifts, lock them into today's plan, and keep a list of workouts to try later.

**[🔗 Live Demo](https://assignment-06-b14.netlify.app/)**

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![daisyUI](https://img.shields.io/badge/daisyUI-5-5A0EF8?logo=daisyui&logoColor=white)

</div>

---

## Table of Contents

- [FitLog — Workout Library](#fitlog--workout-library)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [Live Demo](#live-demo)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Pages and Routes](#pages-and-routes)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Production Build](#production-build)
  - [Available Scripts](#available-scripts)
  - [Project Structure](#project-structure)
  - [How It Works](#how-it-works)
    - [Fetching data](#fetching-data)
    - [Saving in the browser](#saving-in-the-browser)
    - [Keeping the UI in sync](#keeping-the-ui-in-sync)
  - [Data Source](#data-source)
  - [Author](#author)

## About

FitLog is a workout library built with the Next.js App Router. It pulls a catalogue of exercises from a remote API and shows each one as a card with its target muscle groups, equipment, duration, calories burned and rating. From a workout's detail page you can add it to **today's plan** or **save it for later**. Your plan and saved list are stored in the browser, so they are still there when you come back.

This project was built as **Assignment 06 (Batch 14)** for [Programming Hero](https://www.programming-hero.com/).

## Live Demo

The app is deployed on Netlify: **[assignment-06-b14.netlify.app](https://assignment-06-b14.netlify.app/)**

## Features

- **Workout library.** A responsive grid of workout cards, rendered on the server and fetched from a remote API.
- **Detailed workout pages.** Each workout has its own page with a description, muscle-group tags, a stats table (equipment, difficulty, sets, reps, duration, calories, rating) and step-by-step instructions.
- **Today's plan.** Add workouts to a daily plan. Duplicates are detected, so a workout is only added once.
- **Save for later.** Keep a separate list of workouts you want to try another day.
- **Plan summary.** See the total number of exercises, minutes and calories in today's plan at a glance.
- **Sorting.** Sort both lists by duration, calories or rating.
- **Mark as done.** Clear finished workouts from today's plan with one click.
- **Live navbar counters.** The Plan and Saved badges in the navbar update as soon as you add or remove a workout.
- **Toast notifications.** Every action gives instant feedback through `react-toastify`.
- **Saved in the browser.** Your plan and saved workouts are kept in `localStorage` and survive page reloads.
- **Responsive, dark UI.** Built with Tailwind CSS and daisyUI, and designed to work from mobile up to wide desktop screens.
- **Custom 404 page.** Unknown routes show a friendly "Page Not Found" screen.

## Tech Stack

| Category        | Technology                                                                        |
| --------------- | --------------------------------------------------------------------------------- |
| Framework       | [Next.js 16](https://nextjs.org/) (App Router)                                    |
| UI library      | [React 19](https://react.dev/)                                                    |
| Language        | [TypeScript 5](https://www.typescriptlang.org/)                                   |
| Styling         | [Tailwind CSS 4](https://tailwindcss.com/) + [daisyUI 5](https://daisyui.com/)    |
| Notifications   | [React-Toastify 11](https://fkhadra.github.io/react-toastify/)                    |
| Fonts           | [Geist](https://vercel.com/font) via `next/font`                                  |
| Images          | `next/image` with remote image optimization                                       |
| Linting         | ESLint 9 + `eslint-config-next`                                                   |
| Hosting         | [Netlify](https://www.netlify.com/)                                               |

## Pages and Routes

| Route           | Description                                                                         | Rendering        |
| --------------- | ----------------------------------------------------------------------------------- | ---------------- |
| `/`             | Home page with the hero banner and the full workout library                         | Server Component |
| `/details/[id]` | Full details for one workout, with **Add to plan** and **Save for later** buttons   | Server Component |
| `/my-plan`      | Today's plan and saved workouts, in tabs, with a summary and sorting                | Client Component |
| `*`             | Custom 404 page for unknown routes                                                  | Server Component |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) **20.9.0 or later**
- npm (comes with Node.js)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Razibul-Hasan/Assignment-06-B14.git
   cd Assignment-06-B14
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

No environment variables are needed. The workout data comes from a public API.

### Production Build

```bash
npm run build
npm run start
```

## Available Scripts

| Command         | Description                                  |
| --------------- | -------------------------------------------- |
| `npm run dev`   | Start the development server                 |
| `npm run build` | Create an optimized production build         |
| `npm run start` | Serve the production build                   |
| `npm run lint`  | Run ESLint across the project                |

## Project Structure

```text
assignment-06-b14/
├── app/
│   ├── components/
│   │   ├── AddToPlanButton.tsx     # Adds a workout to today's plan (client)
│   │   ├── SaveForLaterButton.tsx  # Saves a workout for later (client)
│   │   ├── hero.tsx                # Landing hero banner
│   │   ├── herocard.tsx            # Workout library grid (fetches data on the server)
│   │   ├── navbar.tsx              # Navigation with live Plan/Saved counters (client)
│   │   ├── footer.tsx              # Site footer
│   │   └── toast-wrapper.tsx       # Global toast container (client)
│   ├── details/
│   │   └── [id]/
│   │       └── page.tsx            # Workout details page
│   ├── my-plan/
│   │   └── page.tsx                # Today's plan and saved workouts
│   ├── types/
│   │   └── api.ts                  # Workout type definition
│   ├── globals.css                 # Tailwind CSS and daisyUI setup
│   ├── layout.tsx                  # Root layout (navbar, footer, toasts, fonts)
│   ├── not-found.tsx               # Custom 404 page
│   └── page.tsx                    # Home page
├── public/
│   ├── banner.png                  # Hero image
│   └── logo.png                    # Brand logo
├── next.config.ts                  # Next.js config (remote image domains)
├── package.json
└── tsconfig.json
```

## How It Works

### Fetching data

The home page and the detail pages are **async Server Components**. They fetch workout data on the server with `cache: "force-cache"`, so repeat visits are served from the Next.js data cache instead of calling the API again.

### Saving in the browser

User-specific state lives in `localStorage` under two keys:

| Key             | Contents                                   |
| --------------- | ------------------------------------------ |
| `todaysPlan`    | Array of workouts added to today's plan    |
| `savedWorkouts` | Array of workouts saved for later          |

### Keeping the UI in sync

When a workout is added, removed or marked as done, the component updates `localStorage` and then sends a custom `workout-storage-updated` event on `window`. The navbar listens for this event and recounts both lists, so its badges stay correct without a page reload or a global state library.

```ts
localStorage.setItem("todaysPlan", JSON.stringify(updatedPlan));
window.dispatchEvent(new Event("workout-storage-updated"));
```

## Data Source

Workout data is served by a public REST API:

| Endpoint                                      | Returns                  |
| --------------------------------------------- | ------------------------ |
| `GET https://api.abcz.workers.dev/api/fitlog`     | All workouts             |
| `GET https://api.abcz.workers.dev/api/fitlog/:id` | A single workout by ID   |

Each workout has this shape (see [`app/types/api.ts`](app/types/api.ts)):

```ts
type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;       // minutes
  caloriesBurned: number; // kcal
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};
```

Workout images are hosted on `img.magnific.com`, which is allowed in [`next.config.ts`](next.config.ts) so `next/image` can optimize them.

## Author

**Razibul Hasan**

- GitHub: [@Razibul-Hasan](https://github.com/Razibul-Hasan)

---

<div align="center">

Built with Next.js as part of the Programming Hero Web Development course.

</div>
