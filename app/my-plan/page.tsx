"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import type { Workout } from "../types/api";

type SortOption = "duration" | "calories" | "rating";

export default function MyPlanPage() {
    const [todaysPlan, setTodaysPlan] = useState<Workout[]>([]);
    const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);
    const [sortBy, setSortBy] = useState<SortOption>("duration");


    useEffect(() => {
        const storedPlan = localStorage.getItem("todaysPlan");
        const storedSaved = localStorage.getItem("savedWorkouts");

        if (storedPlan) {
            try {
                const parsedPlan: Workout[] = JSON.parse(storedPlan);
                setTodaysPlan(parsedPlan);
            } catch {
                setTodaysPlan([]);
            }
        }

        if (storedSaved) {
            try {
                const parsedSaved: Workout[] = JSON.parse(storedSaved);
                setSavedWorkouts(parsedSaved);
            } catch {
                setSavedWorkouts([]);
            }
        }
    }, []);

    // Summary
    const totalMinutes = todaysPlan.reduce(
        (total, workout) => total + workout.duration,
        0
    );

    const totalCalories = todaysPlan.reduce(
        (total, workout) => total + workout.caloriesBurned,
        0
    );

    // Sort
    const sortWorkouts = (workouts: Workout[]) => {
        return [...workouts].sort((a, b) => {
            switch (sortBy) {
                case "duration":
                    return a.duration - b.duration;

                case "calories":
                    return b.caloriesBurned - a.caloriesBurned;

                case "rating":
                    return b.rating - a.rating;

                default:
                    return 0;
            }
        });
    };

    const sortedPlan = sortWorkouts(todaysPlan);
    const sortedSaved = sortWorkouts(savedWorkouts);

    // Remove from today's plan
    const removeFromPlan = (id: number) => {
        const updatedPlan = todaysPlan.filter(
            (workout) => workout.id !== id
        );

        setTodaysPlan(updatedPlan);

        localStorage.setItem(
            "todaysPlan",
            JSON.stringify(updatedPlan)
        );

        window.dispatchEvent(new Event("workout-storage-updated"));

        toast.error("Workout removed from today's plan");
    };

    // Remove from saved
    const removeFromSaved = (id: number) => {
        const updatedSaved = savedWorkouts.filter(
            (workout) => workout.id !== id
        );

        setSavedWorkouts(updatedSaved);

        localStorage.setItem(
            "savedWorkouts",
            JSON.stringify(updatedSaved)
        );

        window.dispatchEvent(new Event("workout-storage-updated"));

        toast.error("Workout removed from saved workouts");
    };

    // Mark as done
    const markAsDone = (id: number) => {
        const updatedPlan = todaysPlan.filter(
            (workout) => workout.id !== id
        );

        setTodaysPlan(updatedPlan);

        localStorage.setItem(
            "todaysPlan",
            JSON.stringify(updatedPlan)
        );

        window.dispatchEvent(new Event("workout-storage-updated"));

        toast.success("Workout marked as done");
    };

    return (
        <section className="min-h-screen bg-[#0b0d10] px-4 py-8 text-white sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1200px]">
                {/* Heading */}
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">
                        My Plan
                    </h1>

                    <p className="mt-1 text-sm text-white/40">
                        Cap of five lifts for today. Finish them, then load more.
                    </p>
                </div>

                {/* Summary */}
                <div className="mt-6 grid grid-cols-1 overflow-hidden rounded-2xl border border-white/10 bg-[#151922] sm:grid-cols-3">
                    <div className="px-5 py-5">
                        <p className="text-xs text-white/30">
                            Exercises
                        </p>

                        <p className="mt-1 text-3xl font-black text-lime-400">
                            {todaysPlan.length}
                        </p>
                    </div>

                    <div className="border-white/10 px-5 py-5 sm:border-l">
                        <p className="text-xs text-white/30">
                            Minutes
                        </p>

                        <p className="mt-1 text-3xl font-black">
                            {totalMinutes}
                        </p>
                    </div>

                    <div className="border-white/10 px-5 py-5 sm:border-l">
                        <p className="text-xs text-white/30">
                            Calories
                        </p>

                        <p className="mt-1 text-3xl font-black">
                            {totalCalories}
                        </p>
                    </div>
                </div>

                {/* Tabs + Sort */}
                <div className="mt-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

                        {/* DaisyUI Tabs */}
                        <div className="tabs tabs-border w-full">

                            {/* Today's Plan */}
                            <input
                                type="radio"
                                name="plan_tabs"
                                className="tab"
                                aria-label="Today's Plan"
                                defaultChecked
                            />

                            <div className="tab-content bg-transparent pt-5">
                                <div className="space-y-4">

                                    {/* Empty Plan */}
                                    {sortedPlan.length === 0 && (
                                        <div className="rounded-2xl border border-white/10 bg-[#151922] p-8 text-center">
                                            <p className="text-sm font-medium text-white/60">
                                                Your plan is empty.
                                            </p>

                                            <p className="mt-1 text-xs text-white/30">
                                                Add workouts from the workout details page.
                                            </p>

                                            <Link
                                                href="/"
                                                className="mt-5 inline-flex rounded-full bg-lime-400 px-5 py-2 text-xs font-bold text-black transition hover:bg-lime-300"
                                            >
                                                Browse Workouts
                                            </Link>
                                        </div>
                                    )}

                                    {/* Today's Workout Cards */}
                                    {sortedPlan.map((workout) => (
                                        <div
                                            key={workout.id}
                                            className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#151922] p-4 transition hover:border-white/20 sm:flex-row sm:items-center sm:justify-between"
                                        >
                                            {/* Left */}
                                            <div className="flex items-center gap-4">
                                                <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-[#111318]">
                                                    <Image
                                                        src={workout.image}
                                                        alt={workout.name}
                                                        fill
                                                        sizes="96px"
                                                        className="object-cover"
                                                    />
                                                </div>

                                                <div>
                                                    <h3 className="text-sm font-black uppercase text-white">
                                                        {workout.name}
                                                    </h3>

                                                    <p className="mt-1 text-xs text-white/40">
                                                        {workout.equipment}
                                                    </p>

                                                    <div className="mt-2 flex flex-wrap gap-3 text-[11px] text-white/50">
                                                        <span>
                                                            {workout.duration} min
                                                        </span>

                                                        <span>
                                                            {workout.caloriesBurned} kcal
                                                        </span>

                                                        <span>
                                                            ★ {workout.rating}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right */}
                                            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                                                <Link
                                                    href={`/details/${workout.id}`}
                                                    className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/70 transition hover:bg-white/5 hover:text-white"
                                                >
                                                    View Details
                                                </Link>

                                                <button
                                                    type="button"
                                                    onClick={() => markAsDone(workout.id)}
                                                    className="rounded-full bg-lime-400 px-4 py-2 text-xs font-bold text-black transition hover:bg-lime-300"
                                                >
                                                    Mark as Done
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeFromPlan(workout.id)
                                                    }
                                                    className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-white/30 transition hover:bg-red-500/10 hover:text-red-400"
                                                    aria-label={`Remove ${workout.name}`}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Saved */}
                            <input
                                type="radio"
                                name="plan_tabs"
                                className="tab"
                                aria-label="Saved"
                            />

                            <div className="tab-content bg-transparent pt-5">
                                <div className="space-y-4">

                                    {/* Empty Saved */}
                                    {sortedSaved.length === 0 && (
                                        <div className="rounded-2xl border border-white/10 bg-[#151922] p-8 text-center">
                                            <p className="text-sm font-medium text-white/60">
                                                No saved workouts yet.
                                            </p>

                                            <p className="mt-1 text-xs text-white/30">
                                                Use &quot;Save for later&quot; from a workout details page.
                                            </p>

                                            <Link
                                                href="/"
                                                className="mt-5 inline-flex rounded-full border border-white/10 px-5 py-2 text-xs font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
                                            >
                                                Browse Workouts
                                            </Link>
                                        </div>
                                    )}

                                    {/* Saved Cards */}
                                    {sortedSaved.map((workout) => (
                                        <div
                                            key={workout.id}
                                            className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#151922] p-4 transition hover:border-white/20 sm:flex-row sm:items-center sm:justify-between"
                                        >
                                            {/* Left */}
                                            <div className="flex items-center gap-4">
                                                <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-[#111318]">
                                                    <Image
                                                        src={workout.image}
                                                        alt={workout.name}
                                                        fill
                                                        sizes="96px"
                                                        className="object-cover"
                                                    />
                                                </div>

                                                <div>
                                                    <h3 className="text-sm font-black uppercase text-white">
                                                        {workout.name}
                                                    </h3>

                                                    <p className="mt-1 text-xs text-white/40">
                                                        {workout.equipment}
                                                    </p>

                                                    <div className="mt-2 flex flex-wrap gap-3 text-[11px] text-white/50">
                                                        <span>
                                                            {workout.duration} min
                                                        </span>

                                                        <span>
                                                            {workout.caloriesBurned} kcal
                                                        </span>

                                                        <span>
                                                            ★ {workout.rating}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right */}
                                            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                                                <Link
                                                    href={`/details/${workout.id}`}
                                                    className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/70 transition hover:bg-white/5 hover:text-white"
                                                >
                                                    View Details
                                                </Link>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeFromSaved(workout.id)
                                                    }
                                                    className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-white/30 transition hover:bg-red-500/10 hover:text-red-400"
                                                    aria-label={`Remove ${workout.name}`}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sort */}
                        <div className="flex shrink-0 items-center gap-2 lg:pt-1">
                            <span className="text-xs text-white/30">
                                Sort By
                            </span>

                            <select
                                value={sortBy}
                                onChange={(event) =>
                                    setSortBy(event.target.value as SortOption)
                                }
                                className="select select-sm border-white/10 bg-[#11151b] text-white/70 focus:outline-none"
                            >
                                <option value="duration">
                                    Duration
                                </option>

                                <option value="calories">
                                    Calories
                                </option>

                                <option value="rating">
                                    Rating
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}