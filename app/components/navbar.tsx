"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [planCount, setPlanCount] = useState(0);
    const [savedCount, setSavedCount] = useState(0);

    const updateCounts = () => {
        const storedPlan = localStorage.getItem("todaysPlan");
        const storedSaved = localStorage.getItem("savedWorkouts");

        const plan = storedPlan ? JSON.parse(storedPlan) : [];
        const saved = storedSaved ? JSON.parse(storedSaved) : [];

        setPlanCount(plan.length);
        setSavedCount(saved.length);
    };

    useEffect(() => {
        updateCounts();

        window.addEventListener("workout-storage-updated", updateCounts);

        return () => {
            window.removeEventListener(
                "workout-storage-updated",
                updateCounts
            );
        };
    }, []);

    return (
        <div className="border-b border-white/10 bg-[#0c0d0f]">
            <div className="mx-auto flex min-h-[68px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center">
                    <Image
                        src="/logo.png"
                        alt="Fitlog Logo"
                        width={30}
                        height={30}
                        className="h-[30px] w-[30px]"
                    />
                </Link>

                <nav className="flex items-center gap-2 sm:gap-4 lg:gap-6">
                    <Link
                        href="/"
                        className="rounded-full bg-lime-400/10 px-3 py-2 text-xs font-semibold text-lime-400 sm:px-5 sm:text-sm"
                    >
                        Workouts
                    </Link>

                    <Link
                        href="/my-plan"
                        className="hidden px-3 py-2 text-xs font-medium text-white/50 sm:block sm:text-sm"
                    >
                        My Plan
                    </Link>
                </nav>

                <div className="flex items-center gap-3 sm:gap-6">
                    <Link
                        href="/my-plan"
                        className="flex items-center gap-1.5 text-xs text-white/80 sm:gap-2 sm:text-sm"
                    >
                        <span>Plan</span>

                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-lime-400 px-1 text-[10px] font-bold text-black sm:text-xs">
                            {planCount}
                        </span>
                    </Link>

                    <Link
                        href="/my-plan"
                        className="hidden items-center gap-2 text-sm text-white/50 sm:flex"
                    >
                        <span>Saved</span>

                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-white/20 px-1 text-[10px] text-white/60">
                            {savedCount}
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}