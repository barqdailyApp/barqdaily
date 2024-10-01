import { LabelColor } from "@/components/label";

export const orderStatuses = [
  { label: "all-orders", value: "all-orders" },
  { label: "confirmed", value: "confirmed" },
  { label: "delivered", value: "delivered" },
  { label: "picked_up", value: "picked_up" },
  { label: "ready_for_pickup", value: "ready_for_pickup" },
  { label: "processing", value: "processing" },
  { label: "canceled", value: "canceled" },
  { label: "returned", value: "returned" },
];

export const WEEK_DAYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export const icons = [
  {
    icon: "material-symbols:check",
    color: "success",
  },
  {
    icon: "ph:gift",
    color: "warning",
  },
  {
    icon: "mdi:truck-outline",
    color: "secondary",
  },
  {
    icon: "lucide:smile",
    color: "primary",
  },
];

export const STATUS_SETTINGS: Record<
  string,
  { index: number; label: string; color: LabelColor }
> = {
  CANCELED: {
    index: -1,
    label: "canceled",
    color: "error",
  },
  PENDING: {
    index: -1,
    label: "pending",
    color: "default",
  },
  RETURNED: {
    index: -1,
    label: "returned",
    color: "warning",
  },
  CONFIRMED: {
    index: 0,
    label: "confirmed",
    color: "success",
  },
  PROCESSING: {
    index: 1,
    label: "processing",
    color: "warning",
  },
  READY_FOR_PICKUP: {
    index: 1,
    label: "ready_for_pickup",
    color: "warning",
  },
  PICKED_UP: {
    index: 2,
    label: "picked_up",
    color: "secondary",
  },
  DELIVERED: {
    index: 3,
    label: "delivered",
    color: "primary",
  },
  COMPLETED: {
    index: 3,
    label: "delivered",
    color: "primary",
  },
};
