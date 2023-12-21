export const perPage = 10;
export function formatCurrency(amount: number): string {
  return `$ ${amount.toFixed(2)}`;
}
