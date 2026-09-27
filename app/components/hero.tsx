import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="bg-[#0b0c0e] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            <div className="mx-auto max-w-[1440px]">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#16181d]">
                    <div className="grid min-h-[380px] items-center gap-10 px-6 py-10 sm:px-10 lg:grid-cols-2 lg:px-16 lg:py-12">
                        <div className="max-w-[620px]">
                            <p className="mb-5 text-xs font-bold uppercase tracking-wide text-lime-400 sm:text-sm">
                                Workout Library
                            </p>

                            <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
                                Train With Intent. Log Every Set.
                            </h1>

                            <p className="mt-5 max-w-[550px] text-sm leading-6 text-white/50 sm:text-base sm:leading-7">
                                FitLog is a dark, no-nonsense gym companion: pick a lift, lock
                                it into today&apos;s plan, and watch the week&apos;s work add
                                up.
                            </p>

                            <Link
                                href="/workouts"
                                className="mt-7 inline-flex rounded-md bg-lime-400 px-5 py-3 text-xs font-bold uppercase text-black transition hover:bg-lime-300 sm:px-6"
                            >
                                Browse Workouts
                            </Link>
                        </div>

                        <div className="flex items-center justify-center lg:justify-end">
                            <div className="relative h-[250px] w-full max-w-[330px] sm:h-[300px] lg:h-[330px]">
                                <Image
                                    src="/banner.png"
                                    alt="Workout exercise"
                                    fill
                                    priority
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
