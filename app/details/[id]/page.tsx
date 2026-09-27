import Image from "next/image";
import Link from "next/link";
import type { Workout } from "../../types/api";
import AddToPlanButton from "../../components/AddToPlanButton";
import SaveForLaterButton from "../../components/SaveForLaterButton";

export default async function WorkoutDetails({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const res = await fetch(
        `https://api.abcz.workers.dev/api/fitlog/${id}`,
        {
            cache: "force-cache",
        }
    );

    if (!res.ok) {
        throw new Error("Workout not found");
    }

    const workout: Workout = await res.json();

    return (
        <section className="min-h-screen bg-[#0b0d10] px-4 py-8 text-white sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1400px]">
                <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
                    {/* Left Image */}
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#15181e]">
                        <Image
                            src={workout.image}
                            alt={workout.name}
                            width={900}
                            height={1100}
                            priority
                            className="h-full min-h-[420px] w-full object-cover sm:min-h-[520px] lg:min-h-[700px]"
                        />
                    </div>

                    {/* Right Content */}
                    <div className="flex flex-col">
                        {/* Title */}
                        <h1 className="text-3xl font-black uppercase leading-tight tracking-tight sm:text-4xl">
                            {workout.name}
                        </h1>

                        {/* Description */}
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50 sm:text-base">
                            {workout.description}
                        </p>

                        {/* Muscle Tags */}
                        <div className="mt-4 flex flex-wrap gap-2">
                            {workout.muscleGroups.map((group) => (
                                <span
                                    key={group}
                                    className="rounded-full bg-lime-400 px-3 py-1 text-[10px] font-extrabold uppercase text-black"
                                >
                                    {group}
                                </span>
                            ))}
                        </div>

                        {/* Stats Table */}
                        <div className="mt-7 overflow-hidden rounded-2xl border border-white/10 bg-[#151922]">
                            <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
                                <span className="text-[11px] font-bold uppercase tracking-wide text-white/40">
                                    Equipment
                                </span>

                                <span className="text-sm text-white/80">
                                    {workout.equipment}
                                </span>
                            </div>

                            <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
                                <span className="text-[11px] font-bold uppercase tracking-wide text-white/40">
                                    Difficulty
                                </span>

                                <span className="text-sm text-white/80">
                                    {workout.difficulty}
                                </span>
                            </div>

                            <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
                                <span className="text-[11px] font-bold uppercase tracking-wide text-white/40">
                                    Sets
                                </span>

                                <span className="text-sm text-white/80">
                                    {workout.sets}
                                </span>
                            </div>

                            <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
                                <span className="text-[11px] font-bold uppercase tracking-wide text-white/40">
                                    Reps
                                </span>

                                <span className="text-sm text-white/80">
                                    {workout.reps}
                                </span>
                            </div>

                            <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
                                <span className="text-[11px] font-bold uppercase tracking-wide text-white/40">
                                    Duration
                                </span>

                                <span className="text-sm text-white/80">
                                    {workout.duration} min
                                </span>
                            </div>

                            <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
                                <span className="text-[11px] font-bold uppercase tracking-wide text-white/40">
                                    Calories
                                </span>

                                <span className="text-sm text-white/80">
                                    {workout.caloriesBurned} kcal
                                </span>
                            </div>

                            <div className="flex items-center justify-between px-5 py-4">
                                <span className="text-[11px] font-bold uppercase tracking-wide text-white/40">
                                    Rating
                                </span>

                                <span className="text-sm text-white/80">
                                    {workout.rating}
                                </span>
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className="mt-8">
                            <h2 className="text-base font-black uppercase tracking-wide">
                                Instructions
                            </h2>

                            <ol className="mt-4 space-y-3">
                                {workout.instructions.map((instruction, index) => (
                                    <li
                                        key={index}
                                        className="flex gap-3 text-sm leading-6 text-white/55"
                                    >
                                        <span className="shrink-0 text-white/30">
                                            {index + 1}.
                                        </span>

                                        <span>{instruction}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        {/* Buttons */}
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <AddToPlanButton workout={workout} />
                            <SaveForLaterButton workout={workout} />
                        </div>

                        {/* Back Link */}
                        <Link
                            href="/"
                            className="mt-6 inline-block text-sm text-white/35 transition hover:text-lime-400"
                        >
                            ← Back to workout library
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}