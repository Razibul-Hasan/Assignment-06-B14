import Image from "next/image";
import Link from "next/link";
import type { Workout } from "../types/api";

async function getWorkouts(): Promise<Workout[]> {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
        cache: "force-cache",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch workouts");
    }

    return res.json();
}

export default async function HeroCard() {
    const workouts = await getWorkouts();

    return (
        <section className="bg-[#0b0c0e] px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1440px]">
                <div className="mb-8">
                    <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
                        The Library
                    </h2>

                    <p className="mt-1 text-sm text-white/45 sm:text-base">
                        Twelve lifts covering every major muscle group.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {workouts.map((workout) => (
                        <Link
                            key={workout.id}
                            href={`/details/${workout.id}`}
                            className="block"
                        >
                            <article
                                key={workout.id}
                                className="overflow-hidden rounded-2xl border border-white/10 bg-[#17191e]"
                            >
                                <div className="aspect-[16/8] overflow-hidden bg-[#111318]">
                                    <Image
                                        src={workout.image}
                                        alt={workout.name}
                                        width={500}
                                        height={500}
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                <div className="p-5">
                                    <div className="mb-4 flex flex-wrap gap-2">
                                        {workout.muscleGroups.map((group) => (
                                            <span
                                                key={group}
                                                className="rounded-full bg-lime-400 px-3 py-1 text-[10px] font-extrabold uppercase text-black"
                                            >
                                                {group}
                                            </span>
                                        ))}
                                    </div>

                                    <h3 className="text-xl font-black uppercase tracking-tight text-white">
                                        {workout.name}
                                    </h3>

                                    <p className="mt-1 text-sm text-white/40">
                                        {workout.equipment}
                                    </p>

                                    <div className="my-5 h-px bg-white/10" />

                                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/45 sm:text-sm">
                                        <span>◷ {workout.duration} min</span>

                                        <span>● {workout.caloriesBurned} kcal</span>

                                        <span>☆ {workout.rating}</span>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
