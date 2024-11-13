import { Fragment } from "react";
import { getTranslations } from "next-intl/server";

import { Box, Container, Typography } from "@mui/material";

import { endpoints } from "@/utils/endpoints";
import { getData } from "@/utils/crud-fetch-api";

import {
  StaticPagesTypes,
  StaticContent as IStaticContent,
} from "@/types/static-content";

interface Props {
  type: StaticPagesTypes;
}

export default async function StaticContent({ type }: Props) {
  const t = await getTranslations("Pages.LegalPages");
  const res = await getData<IStaticContent>(endpoints.staticPage.root(type));

  if ("error" in res) return null;
  const {
    data: { content },
  } = res;

  return (
    <>
      <Box sx={{ bgcolor: "background.neutral", py: 5 }}>
        <Typography variant="h4" textAlign="center">
          {t(type)}
        </Typography>
      </Box>
      <Container sx={{ mt: 3 }}>
        {content.split("\n").map((item, index) => (
          <Fragment key={index}>
            <Typography>{item}</Typography> <br />
          </Fragment>
        ))}
      </Container>
    </>
  );
}
