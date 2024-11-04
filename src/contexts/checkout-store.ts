import { create } from "zustand";

interface CheckoutState {
  step: number;
  setStep: (step: number | ((prev: number) => number)) => void;
}

export const usecheckoutStore = create<CheckoutState>()((set) => ({
  step: 0,
  setStep: (step) =>
    set((state) => ({
      step: typeof step === "number" ? step : step(state.step),
    })),
}));
