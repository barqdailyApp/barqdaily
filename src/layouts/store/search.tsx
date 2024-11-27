import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Box,
  Popper,
  MenuItem,
  TextField,
  Autocomplete,
  TextFieldProps,
} from "@mui/material";

import { paths } from "@/routes/paths";

import { useDebounce } from "@/hooks/use-debounce";
import { useQueryString } from "@/hooks/use-queryString";

import { searchProducts } from "@/actions/products-actions";

import Iconify from "@/components/iconify";

export default function StoreSearch() {
  const t = useTranslations("Global.Error");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { createQueryString } = useQueryString();

  const [options, setOptions] = useState<Record<"name" | "id", string>[]>([]);
  const initialSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState(initialSearch);
  const debouncedSearch = useDebounce(search, 150);

  useEffect(() => {
    if (!debouncedSearch) {
      setOptions([]);
      return;
    }

    (async () => {
      const res = await searchProducts(debouncedSearch);
      if (!("error" in res)) {
        setOptions(
          res?.map((item) => ({
            name: item.product_name,
            id: item.product_id,
          })) || []
        );
      }
    })();
  }, [debouncedSearch]);

  return (
    <Autocomplete
      options={options}
      renderOption={(props, option) => (
        <MenuItem
          {...props}
          key={option.id}
          onClick={() => {
            router.push(`${paths.products}/${option.id}?search=${search}`, {
              scroll: false,
            });
            setOptions([]);
          }}
        >
          {option.name}
        </MenuItem>
      )}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <SearchInput
          {...params}
          onChange={(e) => {
            setSearch(e.target.value);
            createQueryString(
              [{ name: "search", value: e.target.value }],
              true
            );
          }}
        />
      )}
      PopperComponent={(props: {
        open: boolean;
        sx?: any;
        [key: string]: any;
      }) => (
        <Popper
          {...props}
          open={!debouncedSearch ? false : props.open}
          sx={{ ...props.sx, minWidth: "20rem" }}
        />
      )}
      noOptionsText={t("no_products")}
      inputValue={search}
      sx={{ paddingInlineEnd: 1.5 }}
      fullWidth
    />
  );
}

function SearchInput({ ...props }: TextFieldProps) {
  const t = useTranslations("Global.Label");
  return (
    <TextField
      {...props}
      sx={{
        mx: 1,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: "8px",
        "& .MuiFilledInput-root": {
          borderRadius: "8px",
          py: "12px !important",
          px: 1.75,
        },
        "& .MuiFilledInput-input": { p: "0 !important" },
      }}
      variant="filled"
      placeholder={t("search")}
      InputProps={{
        ...props?.InputProps,
        endAdornment: (
          <Box
            sx={{
              position: "absolute",
              insetInlineEnd: 0,
              height: { sm: "100%" },
              width: "auto",
              aspectRatio: { xs: 1, sm: "1.2/1" },
              marginInlineEnd: { xs: 1, sm: 0 },
              padding: { xs: 1, sm: 0 },
              bgcolor: "#212B36",
              color: "white",
              borderRadius: { xs: "100%", sm: "8px" },
              display: "grid",
              placeItems: "center",
            }}
          >
            <Iconify
              icon="material-symbols:search"
              width={{ xs: 20, sm: 24 }}
            />
          </Box>
        ),
      }}
    />
  );
}
