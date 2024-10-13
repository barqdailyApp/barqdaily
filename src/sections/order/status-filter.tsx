import { useTranslations } from "next-intl";
import { useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";

import { Tab, Tabs } from "@mui/material";

import { useQueryString } from "@/hooks/use-queryString";

import { ALL_ORDER_STATUS } from "./config-orders";

export default function StatusFilter() {
  const t = useTranslations("Pages.Orders.Status");
  const { createQueryString } = useQueryString();
  const searshParams = useSearchParams();

  const [currentStatus, setCurrentState] = useState(
    searshParams.get("status") || ""
  );

  const handleChange = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setCurrentState(newValue);
      createQueryString([
        { name: "status", value: newValue },
        { name: "page" },
      ]);
    },
    [createQueryString]
  );

  return (
    <Tabs
      value={currentStatus}
      onChange={handleChange}
      aria-label="Order Status Navigation"
    >
      {ALL_ORDER_STATUS.map((status) => (
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
