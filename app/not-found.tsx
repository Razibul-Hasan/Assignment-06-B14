import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
            <div className="space-y-4">
                <h1 className="text-8xl font-extrabold tracking-widest text-indigo-600 sm:text-9xl">
                    404
                </h1>

                <div className="rounded bg-indigo-200 px-2 text-sm font-semibold text-indigo-800 inline-block">
                    Page Not Found
                </div>

                <p className="text-xl font-medium text-slate-700 sm:text-2xl">
                    Oops! You seem to have wandered off the path.
                </p>

                <p className="max-w-md text-sm text-slate-500 mx-auto">
                    Sorry, the page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                <div className="pt-6">
                    <Link
                        href="/"
                        className="inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all hover:bg-indigo-700 hover:shadow-indigo-200"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}