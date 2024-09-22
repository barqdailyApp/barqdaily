export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type FilterParams = Record<
  string,
  string | number | boolean | undefined
>;

export type QueryParams = PaginationParams & FilterParams;

export function buildQueryString(params: QueryParams): string {
  const query = Object.entries(params)
    .filter(([_, value]) => value !== undefined)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join("&");
  return query ? `?${query}` : "";
}
