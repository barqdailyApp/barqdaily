import { LabelColor } from "@/components/label";

export const ALL_ORDER_STATUS = [
  { label: "all", value: "" },
  { label: "pending", value: "PENDING" },
  { label: "confirmed", value: "CONFIRMED" },
  { label: "processing", value: "PROCESSING" },
  // { label: "ready_for_pickup", value: "READY_FOR_PICKUP" },
  { label: "picked_up", value: "PICKED_UP" },
  { label: "delivered", value: "DELIVERED" },
  { label: "completed", value: "COMPLETED" },
  { label: "returned", value: "RETRUNED" },
  { label: "canceled", value: "CANCELED" },
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

export const ICONS = [
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

// Index for displaying the status progress
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
    color: "info",
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
