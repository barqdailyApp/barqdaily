import { CircularStatus } from "@/theme/overrides/components/circular-status";

import Iconify from "@/components/iconify";

import { ICONS, STATUS_SETTINGS } from "./config-orders";

export default function orderStatusCircles(currentStatus: string) {
  const status = STATUS_SETTINGS[currentStatus];
  const [staticStatusColor, staticStatusVariant] = [
    "CANCELED",
    "RETURNED",
  ].includes(currentStatus)
    ? [STATUS_SETTINGS[currentStatus].color, "soft" as "soft"]
    : [undefined, undefined];

  return ICONS.map((item, iconIndex) => {
    const statusIndex = status.index;

    return (
      <CircularStatus
        color={
          staticStatusColor ||
          (iconIndex <= statusIndex ? (item.color as "primary") : "default")
        }
        variant={
          staticStatusVariant ||
          (iconIndex >= statusIndex ? "outlined" : "soft")
        }
        key={iconIndex}
      >
        <Iconify icon={item.icon} width={15} />
      </CircularStatus>
    );
  });
}
