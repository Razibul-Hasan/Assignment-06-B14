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
            window.removeEventListener("workout-storage-updated", updateCounts);
        };
    }, []);

    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0c0d0f]">
            <div className="navbar mx-auto min-h-[68px] max-w-[1440px] px-4 sm:px-6 lg:px-8">
                <div className="navbar-start">
                    <div className="dropdown lg:hidden">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle text-white"
                            aria-label="Open menu"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu dropdown-content z-[50] mt-3 w-56 rounded-box border border-white/10 bg-[#151922] p-2 shadow-xl"
                        >
                            <li>
                                <Link href="/" className="text-lime-400">
                                    Workouts
                                </Link>
                            </li>

                            <li>
                                <Link href="/my-plan">My Plan</Link>
                            </li>

                            <li>
                                <Link
                                    href="/my-plan"
                                    className="flex items-center justify-between"
                                >
                                    <span>Plan</span>

                                    <span className="badge border-0 bg-lime-400 text-black">
                                        {planCount}
                                    </span>
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/my-plan"
                                    className="flex items-center justify-between"
                                >
                                    <span>Saved</span>

                                    <span className="badge badge-outline border-white/20 text-white/60">
                                        {savedCount}
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <Link href="/" className="ml-2 flex items-center lg:ml-0">
                        <Image
                            src="/logo.png"
                            alt="Fitlog Logo"
                            width={30}
                            height={30}
                            className="h-[30px] w-[30px]"
                        />
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal items-center gap-2 px-1">
                        <li>
                            <Link
                                href="/"
                                className="rounded-full bg-lime-400/10 px-5 py-2 text-sm font-semibold text-lime-400 hover:bg-lime-400/15"
                            >
                                Workouts
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/my-plan"
                                className="rounded-full px-5 py-2 text-sm font-medium text-white/50 hover:bg-white/5 hover:text-white"
                            >
                                My Plan
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="navbar-end gap-3 sm:gap-6">
                    <Link
                        href="/my-plan"
                        className="flex items-center gap-1.5 text-xs text-white/80 transition hover:text-white sm:gap-2 sm:text-sm"
                    >
                        <span>Plan</span>

                        <span className="badge border-0 bg-lime-400 px-2 text-xs font-bold text-black">
                            {planCount}
                        </span>
                    </Link>

                    <Link
                        href="/my-plan"
                        className="hidden items-center gap-2 text-sm text-white/50 transition hover:text-white sm:flex"
                    >
                        <span>Saved</span>

                        <span className="badge badge-outline border-white/20 px-2 text-[10px] text-white/60">
                            {savedCount}
                        </span>
                    </Link>
                </div>
            </div>
        </header>
    );
}
