import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[#0b0c0e]">
            <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
                <Link href="/" className="inline-flex items-center">
                    <Image
                        src="/logo.png"
                        alt="FitLog Logo"
                        width={30}
                        height={30}
                        className="h-auto w-[30px] sm:w-[30px]"
                    />
                </Link>
                <p className="text-xs leading-5 text-white/30 sm:text-sm md:text-right">
                    © 2026 FitLog — Workout Library. Train hard, log honest.
                </p>
            </div>
        </footer>
    );
}