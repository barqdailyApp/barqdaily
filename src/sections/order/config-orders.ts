import { LabelColor } from "@/components/label";

export const orderStatuses = [
  { label: "All Orders", value: "all-orders" },
  { label: "Confirmed", value: "confirmed" },
  { label: "On Process", value: "on-process" },
  { label: "Out for Delivery", value: "out-for-delivery" },
  { label: "Delivered", value: "delivered" },
  { label: "Canceled", value: "canceled" },
  { label: "Returned", value: "returned" },
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
    label: "processing",
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
