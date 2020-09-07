export function getFormattedCurrency(num: number) {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'symbol',
    minimumFractionDigits: 0,
    maximumFractionDigits: 6,
  }).format(num);
}
export function getFormattedNumber(
  num: number,
  maximumFractionDigits: number = 6
) {
  return Intl.NumberFormat(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits,
  }).format(num);
}
