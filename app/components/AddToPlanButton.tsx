"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import type { Workout } from "../types/api";

type Props = {
    workout: Workout;
};

export default function AddToPlanButton({ workout }: Props) {
    const [added, setAdded] = useState(false);

    const handleAddToPlan = () => {
        const storedPlan = localStorage.getItem("todaysPlan");

        const todaysPlan: Workout[] = storedPlan
            ? JSON.parse(storedPlan)
            : [];

        const alreadyAdded = todaysPlan.some(
            (item) => item.id === workout.id
        );

        if (alreadyAdded) {
            toast.info("Workout is already in today's plan");
            setAdded(true);
            return;
        }

        const updatedPlan = [...todaysPlan, workout];

        localStorage.setItem(
            "todaysPlan",
            JSON.stringify(updatedPlan)
        );

        window.dispatchEvent(new Event("workout-storage-updated"));

        setAdded(true);

        toast.success("Workout added to today's plan");
    };

    return (
        <button
            type="button"
            onClick={handleAddToPlan}
            className="rounded-lg bg-lime-400 px-6 py-3 text-sm font-bold text-black"
        >
            {added ? "Added to Plan" : "Add to today's plan"}
        </button>
    );
}