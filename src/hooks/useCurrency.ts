import { useState, useEffect } from "react";

interface CurrencyInfo {
  code: string;
  symbol: string;
  rate: number; // rate from EUR
}

const CURRENCY_MAP: Record<string, CurrencyInfo> = {
  EUR: { code: "EUR", symbol: "€", rate: 1 },
  USD: { code: "USD", symbol: "$", rate: 1.08 },
  GBP: { code: "GBP", symbol: "£", rate: 0.86 },
  BRL: { code: "BRL", symbol: "R$", rate: 5.45 },
  CHF: { code: "CHF", symbol: "CHF", rate: 0.97 },
  CNY: { code: "CNY", symbol: "¥", rate: 7.85 },
  AED: { code: "AED", symbol: "AED", rate: 3.97 },
};

const COUNTRY_CURRENCY: Record<string, string> = {
  US: "USD", GB: "GBP", BR: "BRL", CH: "CHF", CN: "CNY",
  AE: "AED", PT: "EUR", ES: "EUR", FR: "EUR", DE: "EUR",
  IT: "EUR", NL: "EUR", BE: "EUR", AT: "EUR", IE: "EUR",
  FI: "EUR", GR: "EUR", LU: "EUR", SK: "EUR", SI: "EUR",
  EE: "EUR", LV: "EUR", LT: "EUR", MT: "EUR", CY: "EUR",
  HR: "EUR",
};

export function useCurrency() {
  const [currency, setCurrency] = useState<CurrencyInfo>(CURRENCY_MAP.EUR);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const countryCode = data?.country_code;
        if (countryCode) {
          const currCode = COUNTRY_CURRENCY[countryCode] || "EUR";
          setCurrency(CURRENCY_MAP[currCode] || CURRENCY_MAP.EUR);
        }
      })
      .catch(() => {
        // fallback to EUR
      });
  }, []);

  const formatPrice = (eurPrice: number) => {
    const converted = Math.round(eurPrice * currency.rate);
    return `${converted.toLocaleString("pt-PT")} ${currency.symbol}`;
  };

  return { currency, formatPrice };
}
