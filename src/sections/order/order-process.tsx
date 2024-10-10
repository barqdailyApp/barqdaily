import * as React from "react";

import Timeline from "@mui/lab/Timeline";
import TimelineContent from "@mui/lab/TimelineContent";
import { Box, Stack, Typography } from "@mui/material";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";

import Iconify from "@/components/iconify";

export function OrderProcessCard() {
  return (
    <Stack spacing={1}>
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        <TimelineItem>
          <TimelineSeparator>
            <Box
              sx={{
                border: "solid 1px",
                borderColor: "success.main",
                borderRadius: "50px",
                padding: 0.75,
                color: "success.main",
              }}
            >
              <Iconify icon="material-symbols:check" width={12} />
            </Box>
            <TimelineConnector />
          </TimelineSeparator>
          <Stack direction="row" justifyContent="space-between" width="100%">
            <TimelineContent>
              <Typography variant="body2">Order Confirmed</Typography>
              <Typography variant="caption" fontWeight="400">
                Sep 29, 2021
              </Typography>
            </TimelineContent>
            <TimelineContent sx={{ textAlign: "right" }}>
              <Typography variant="caption" fontWeight="400">
                8:00 PM
              </Typography>
            </TimelineContent>
          </Stack>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <Box
              sx={{
                border: "solid 1px",
                borderColor: "warning.main",
                borderRadius: "50px",
                padding: 0.75,
                color: "warning.main",
              }}
            >
              <Iconify icon="ph:gift" width={12} />
            </Box>
            <TimelineConnector />
          </TimelineSeparator>
          <Stack direction="row" justifyContent="space-between" width="100%">
            <TimelineContent>
              <Typography variant="body2">Order in Process</Typography>
              <Typography variant="caption" fontWeight="400">
                Sep 30, 2021
              </Typography>
            </TimelineContent>
            <TimelineContent sx={{ textAlign: "right" }}>
              <Typography variant="caption" fontWeight="400">
                7:00 AM
              </Typography>
            </TimelineContent>
          </Stack>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <Box
              sx={{
                border: "solid 1px",
                borderColor: "secondary.main",
                borderRadius: "50px",
                padding: 0.75,
                color: "secondary.main",
              }}
            >
              <Iconify icon="mdi:truck-outline" width={12} />
            </Box>
            <TimelineConnector />
          </TimelineSeparator>
          <Stack direction="row" justifyContent="space-between" width="100%">
            <TimelineContent>
              <Typography variant="body2">Order Shipped</Typography>
              <Typography variant="caption" fontWeight="400">
                Sep 30, 2021
              </Typography>
            </TimelineContent>
            <TimelineContent sx={{ textAlign: "right" }}>
              <Typography variant="caption" fontWeight="400">
                7:30 PM
              </Typography>
            </TimelineContent>
          </Stack>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <Box
              sx={{
                border: "solid 1px",
                borderColor: "primary.main",
                borderRadius: "50px",
                padding: 0.75,
                color: "primary.main",
              }}
            >
              <Iconify icon="lucide:smile" width={12} />
            </Box>
            <TimelineConnector />
          </TimelineSeparator>
          <Stack direction="row" justifyContent="space-between" width="100%">
            <TimelineContent>
              <Typography variant="body2">Order Delivered</Typography>
              <Typography variant="caption" fontWeight="400">
                Sep 30, 2021
              </Typography>
            </TimelineContent>
            <TimelineContent sx={{ textAlign: "right" }}>
              <Typography variant="caption" fontWeight="400">
                8:00 AM
              </Typography>
            </TimelineContent>
          </Stack>
        </TimelineItem>
      </Timeline>
    </Stack>
  );
}
