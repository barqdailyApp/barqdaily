import { create } from "zustand";

import { Address } from "@/types/profile";
import { Payment, TimeSlot } from "@/types/cart";

type DeliveryType = "FAST" | "WAREHOUSE_PICKUP" | "SCHEDULED";

interface PaymentForm {
  transaction_number?: string;
  notes: string;
  terms?: boolean;
}

interface InitialState {
  step: number;

  deliveryTypes: DeliveryType[];
  choosenDeliveryType: DeliveryType | null;

  addresses: Address[];
  choosenAddress: Address | null;

  day: Date;

  timeSlot: TimeSlot | null;

  payments: Payment[];

  choosenPayment: Payment | null;

  paymentForm: PaymentForm;
}

interface CheckoutStateActions {
  initCheckout: VoidFunction;

  setStep: (step: number | ((prev: number) => number)) => void;

  setDeliveryTypes: (deliveryTypes: DeliveryType[]) => void;
  setChoosenDeliveryType: (deliveryType: DeliveryType | null) => void;

  setAddresses: (
    addresses: Address[] | ((prev: Address[]) => Address[])
  ) => void;
  setChoosenAddress: (address: Address | null) => void;

  setDay: (day: Date) => void;
  setTimeSlot: (timeSlot: TimeSlot | null) => void;

  setPayments: (payments: Payment[]) => void;
  setChoosenPayment: (payment: Payment | null) => void;

  setPaymentForm: (
    paymentForm: PaymentForm | ((prev: PaymentForm) => PaymentForm)
  ) => void;
}

const initialState: InitialState = {
  step: 0,

  deliveryTypes: [],
  choosenDeliveryType: null,

  addresses: [],
  choosenAddress: null,

  day: new Date(),

  timeSlot: null,

  payments: [],

  choosenPayment: null,

  paymentForm: { notes: "" },
};

export const usecheckoutStore = create<InitialState & CheckoutStateActions>()(
  (set) => ({
    ...initialState,
    initCheckout: () => set({ ...initialState }),
    setStep: (step) =>
      set((state) => ({
        step: typeof step === "number" ? step : step(state.step),
      })),
    setDeliveryTypes: (deliveryTypes) =>
      set(() => ({
        deliveryTypes,
        choosenDeliveryType: deliveryTypes[0],
      })),
    setChoosenDeliveryType: (deliveryType) =>
      set(() => ({ choosenDeliveryType: deliveryType })),
    setAddresses: (addresses) =>
      set((state) => {
        const newAddresses =
          typeof addresses === "function"
            ? addresses(state.addresses)
            : addresses;
        return {
          addresses: newAddresses,
          choosenAddress: state.choosenAddress || newAddresses[0],
        };
      }),
    setChoosenAddress: (address) => set(() => ({ choosenAddress: address })),

    setDay: (day) => set(() => ({ day })),
    setTimeSlot: (timeSlot) => set(() => ({ timeSlot })),

    setPayments: (payments) => set(() => ({ payments })),
    setChoosenPayment: (payment) => set(() => ({ choosenPayment: payment })),

    setPaymentForm: (paymentForm) =>
      set((state) => ({
        paymentForm:
          typeof paymentForm === "function"
            ? paymentForm(state.paymentForm)
            : paymentForm,
      })),
  })
);
