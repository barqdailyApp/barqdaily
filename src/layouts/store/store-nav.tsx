import { useEffect } from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import { usePathname } from "@/routes/hooks";

import { useAuthContext } from "@/auth/hooks";

import Logo from "@/components/logo";
import Scrollbar from "@/components/scrollbar";
import { NavSectionVertical } from "@/components/nav-section";

import { NAV } from "../config-layout";
import { useNavData } from "./config-navigation";
import NavToggleButton from "../common/nav-toggle-button";

// ----------------------------------------------------------------------

type Props = {
  openNav: boolean;
  onCloseNav: VoidFunction;
};

export default function StoreNav({ openNav, onCloseNav }: Props) {
  const { user } = useAuthContext();

  const pathname = usePathname();

  const navData = useNavData();

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Logo sx={{ mt: 3, ml: 4, mb: 1 }} />

      <NavSectionVertical
        data={navData}
        slotProps={{
          currentRole: user?.role,
        }}
      />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_VERTICAL },
      }}
    >
      <Drawer
        open={openNav}
        onClose={onCloseNav}
        PaperProps={{
          sx: {
            width: NAV.W_VERTICAL,
          },
        }}
      >
        {renderContent}
      </Drawer>
    </Box>
  );
}
