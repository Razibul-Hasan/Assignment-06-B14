"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import type { Workout } from "../types/api";

type Props = {
    workout: Workout;
};

export default function SaveForLaterButton({
    workout,
}: Props) {
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        const storedSaved = localStorage.getItem("savedWorkouts");

        const savedWorkouts: Workout[] = storedSaved
            ? JSON.parse(storedSaved)
            : [];

        const alreadySaved = savedWorkouts.some(
            (item) => item.id === workout.id
        );

        if (alreadySaved) {
            toast.info("Workout is already saved");
            setSaved(true);
            return;
        }

        const updatedSaved = [...savedWorkouts, workout];

        localStorage.setItem(
            "savedWorkouts",
            JSON.stringify(updatedSaved)
        );

        window.dispatchEvent(new Event("workout-storage-updated"));

        setSaved(true);

        toast.success("Workout saved for later");
    };

    return (
        <button
            type="button"
            onClick={handleSave}
            className="rounded-lg border border-white/10 px-6 py-3 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
        >
            {saved ? "Saved" : "Save for later"}
        </button>
    );
}