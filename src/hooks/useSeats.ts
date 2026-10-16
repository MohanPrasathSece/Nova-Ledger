import { useState, useEffect } from "react";

export const TOTAL_SEATS = 30;
export const RESET_SEATS = 10;
export const CYCLE_DURATION_MS = 15 * 60 * 1000; // 15 minutes
export const STORAGE_KEY = "nova_contact_seats_cycle_start";

export function calculateFilledSeats(): number {
  if (typeof window === "undefined") return 20;

  try {
    const now = Date.now();
    const stored = localStorage.getItem(STORAGE_KEY);
    let cycleStart = stored ? parseInt(stored, 10) : NaN;

    if (!cycleStart || isNaN(cycleStart)) {
      // First visit: initialize halfway through 15 min cycle (~7.5 min in),
      // giving ~20 seats filled out of 30 as requested!
      cycleStart = now - Math.floor(CYCLE_DURATION_MS * 0.5);
      localStorage.setItem(STORAGE_KEY, cycleStart.toString());
    }

    let elapsed = now - cycleStart;

    // When 15 minutes pass, reset cycle to 10 seats
    if (elapsed >= CYCLE_DURATION_MS || elapsed < 0) {
      cycleStart = now - (elapsed % CYCLE_DURATION_MS);
      localStorage.setItem(STORAGE_KEY, cycleStart.toString());
      elapsed = now - cycleStart;
    }

    const progress = Math.min(Math.max(elapsed / CYCLE_DURATION_MS, 0), 1);
    // Over the 15 min, seats fill from 10 up to 29 (or 30 before reset)
    const filled = Math.min(
      29,
      RESET_SEATS + Math.floor(progress * (TOTAL_SEATS - RESET_SEATS + 0.99))
    );
    return filled;
  } catch {
    return 20;
  }
}

export function useSeats() {
  const [seats, setSeats] = useState<number>(() => calculateFilledSeats());

  useEffect(() => {
    const updateSeats = () => {
      setSeats(calculateFilledSeats());
    };

    updateSeats();
    const interval = setInterval(updateSeats, 1000);

    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        updateSeats();
      }
    };
    window.addEventListener("storage", onStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return { seats, totalSeats: TOTAL_SEATS, remainingSeats: TOTAL_SEATS - seats };
}
