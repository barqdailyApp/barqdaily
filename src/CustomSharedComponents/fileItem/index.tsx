import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";

import { fData } from "@/utils/format-number";
import { fDateTime } from "@/utils/format-time";

import Iconify from "@/components/iconify";
import FileThumbnail from "@/components/file-thumbnail";

function FileItem({ file, onClick }: { file: File; onClick: VoidFunction }) {
  return (
    <Card
      sx={{
        p: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        backgroundColor: "trasnparent",
        mb: 3,
      }}
    >
      <FileThumbnail
        file={file.type.split("/")[1]}
        sx={{ width: 36, height: 36, mr: 1 }}
      />
      <ListItemText
        primary={file.name}
        secondary={
          <>
            {fData(file.size)}
            <Box
              sx={{
                mx: 0.75,
                width: 2,
                height: 2,
                borderRadius: "50%",
                bgcolor: "currentColor",
              }}
            />
            {fDateTime(new Date(), "dd-MM-yyyy - hh:mm a")}
          </>
        }
        primaryTypographyProps={{
          noWrap: true,
          typography: "subtitle2",
        }}
        secondaryTypographyProps={{
          mt: 0.5,
          component: "span",
          alignItems: "center",
          typography: "caption",
          color: "text.disabled",
          display: "inline-flex",
        }}
      />
      <IconButton color="error">
        <Iconify icon="pajamas:remove" onClick={onClick} />
      </IconButton>
    </Card>
  );
}

export default FileItem;
