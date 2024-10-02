import { useState, useCallback } from "react";
import { Tab, Tabs } from "@mui/material";
import { orderStatuses } from "./config-orders";
import { useTranslations } from "next-intl";

interface Props {
  initialStatus?: string;
  onStatusChange: (status: string) => void; // Notify parent of the status change
}

export default function StatusFilter({ initialStatus, onStatusChange }: Props) {
  const [selectedStatus, setSelectedStatus] = useState(
    initialStatus || "all-orders"
  );

  const handleChange = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setSelectedStatus(newValue);
      onStatusChange(newValue); // Notify parent of the status change
    },
    [onStatusChange]
  );

  const t = useTranslations("Pages.Order.Status");

  return (
    <Tabs
      value={selectedStatus}
      onChange={handleChange}
      aria-label="Order Status Navigation"
    >
      {orderStatuses.map((status) => (
        <Tab
          label={t(`${status.label}`)}
          key={status.value}
          value={status.value}
          sx={{ px: 2 }}
        />
      ))}
    </Tabs>
  );
}
