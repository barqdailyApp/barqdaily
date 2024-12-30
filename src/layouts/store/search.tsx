import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

import {
  Popper,
  MenuItem,
  TextField,
  ButtonBase,
  Autocomplete,
  TextFieldProps,
} from "@mui/material";

import { paths } from "@/routes/paths";

import { useDebounce } from "@/hooks/use-debounce";

import { searchProducts } from "@/actions/products-actions";

import Iconify from "@/components/iconify";

export default function StoreSearch() {
  const t = useTranslations("Global.Error");
  const router = useRouter();

  const [options, setOptions] = useState<Record<"name" | "id", string>[]>([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 150);

  // Fetch on change
  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const handleSearch = useCallback(
    (value: string) => {
      if (!value) return;
      router.push(`${paths.products}?search=${value}`, { scroll: false });
    },
    [router]
  );

  return (
    <Autocomplete
      options={options}
      renderOption={(props, option) => (
        <MenuItem
          {...props}
          key={option.id}
          onClick={() => {
            router.push(`${paths.products}/${option.id}`, {
              scroll: false,
            });
            setOptions([]);
          }}
        >
          {option.name}
        </MenuItem>
      )}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => {
        delete params.inputProps.value;
        delete params.inputProps.onChange;

        return (
          <SearchInput
            {...params}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") handleSearch(search);
            }}
            onSubmit={() => {
              handleSearch(search);
            }}
          />
        );
      }}
      PopperComponent={(props: {
        open: boolean;
        sx?: any;
        [key: string]: any;
      }) => <Popper {...props} sx={{ ...props.sx, minWidth: "20rem" }} />}
      noOptionsText={t("no_products")}
      inputValue=""
      sx={{ paddingInlineEnd: 1.5 }}
      fullWidth
    />
  );
}

function SearchInput({
  onSubmit,
  ...props
}: { onSubmit: VoidFunction } & TextFieldProps) {
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
      fullWidth
      InputProps={{
        ...props?.InputProps,
        endAdornment: (
          <ButtonBase
            onClick={() => onSubmit()}
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
          </ButtonBase>
        ),
      }}
    />
  );
}
