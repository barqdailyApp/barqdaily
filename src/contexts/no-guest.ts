import { create } from "zustand";

interface NoGuestStore {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useNoGuestStore = create<NoGuestStore>()((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
}));
