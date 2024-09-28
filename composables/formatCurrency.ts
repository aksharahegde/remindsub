export default function (
  amount: number | bigint,
  locale = "en-IN",
  currency = "INR"
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
