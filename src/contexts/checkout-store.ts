import { create } from "zustand";

import { TimeSlot } from "@/types/cart";
import { Address } from "@/types/profile";

type DeliveryType = "FAST" | "WAREHOUSE_PICKUP" | "SCHEDULED";
interface CheckoutState {
  step: number;
  setStep: (step: number | ((prev: number) => number)) => void;

  deliveryTypes: DeliveryType[];
  choosenDeliveryType: DeliveryType | null;
  setDeliveryTypes: (deliveryTypes: DeliveryType[]) => void;
  setChoosenDeliveryType: (deliveryType: DeliveryType | null) => void;

  addresses: Address[];
  choosenAddress: Address | null;
  setAddresses: (addresses: Address[]) => void;
  setChoosenAddress: (address: Address | null) => void;

  timeSlot: TimeSlot | null;
  setTimeSlot: (timeSlot: TimeSlot | null) => void;
}

export const usecheckoutStore = create<CheckoutState>()((set) => ({
  step: 0,
  setStep: (step) =>
    set((state) => ({
      step: typeof step === "number" ? step : step(state.step),
    })),

  deliveryTypes: [],
  choosenDeliveryType: null,
  setDeliveryTypes: (deliveryTypes) =>
    set(() => ({
      deliveryTypes,
      choosenDeliveryType: deliveryTypes[0],
    })),
  setChoosenDeliveryType: (deliveryType) =>
    set(() => ({ choosenDeliveryType: deliveryType })),

  addresses: [],
  choosenAddress: null,
  setAddresses: (addresses) =>
    set(() => ({
      addresses,
      choosenAddress: addresses[0],
    })),
  setChoosenAddress: (address) => set(() => ({ choosenAddress: address })),

  timeSlot: null,
  setTimeSlot: (timeSlot) => set(() => ({ timeSlot })),
}));
