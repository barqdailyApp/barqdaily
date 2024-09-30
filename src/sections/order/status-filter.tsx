"use client";

import { useState, useCallback } from "react";

import { Tab, Tabs } from "@mui/material";

import { orderStatuses } from "./config-orders";

interface Props {
  initialStatus?: string;
}

export default function StatusFilter({ initialStatus }: Props) {
  const [selectedStatus, setSelectedStatus] = useState(
    initialStatus || "all-orders"
  );

  const handleChange = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setSelectedStatus(newValue);
    },
    []
  );
  return (
    <Tabs
      value={selectedStatus}
      onChange={handleChange}
      aria-label="Order Status Navigation"
    >
      {orderStatuses.map((status) => (
        <Tab
          label={status.label}
          key={status.value}
          value={status.value}
          sx={{ px: 2 }}
        />
      ))}
    </Tabs>
  );
}
