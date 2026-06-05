// Purpose: Keeps display formatting helpers centralized so money and labels are
// consistent across route pages and reusable tourism components.
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

export function seasonSummary(season: string): string {
  return season.split(";")[0] || season;
}
