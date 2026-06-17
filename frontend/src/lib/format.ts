/**
 * =====================================================
 * FILE: src/lib/format.ts
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Formatting helpers used across the website.
 * =====================================================
 */

/**
 * -----------------------------------------------------
 * FORMAT AED PRICE
 * -----------------------------------------------------
 * Converts number into UAE Dirham currency format.
 *
 * Example:
 * 1200000 → AED 1,200,000
 * -----------------------------------------------------
 */
export function formatAED(price?: number | null) {
  if (!price) {
    return "Price on request";
  }

  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(price);
}