import { z } from 'zod';

export const cryptoPriceToolSchema = z.object({
  symbol: z.string().describe('Cryptocurrency symbol (e.g., BTC, ETH, SOL)'),
  currency: z.string().default('USD').describe('Fiat currency for price (default: USD)'),
});

export type CryptoPriceToolInput = z.infer<typeof cryptoPriceToolSchema>;

// Simple mock data for demonstration
// In production, replace with actual API call to CoinGecko, CoinMarketCap, etc.
const mockPrices: Record<string, number> = {
  BTC: 42500.50,
  ETH: 2250.75,
  SOL: 98.25,
  USDC: 1.00,
  USDT: 1.00,
  BNB: 315.40,
  XRP: 0.62,
  ADA: 0.45,
  DOGE: 0.085,
  MATIC: 0.92,
};

export const cryptoPriceTool = async ({ symbol, currency = 'USD' }: CryptoPriceToolInput) => {
  const upperSymbol = symbol.toUpperCase();
  
  // For the 3-hour challenge, using mock data
  // Replace this with actual API call:
  // const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=${currency}`);
  // const data = await response.json();
  
  const price = mockPrices[upperSymbol];
  
  if (!price) {
    return {
      error: `Price not found for ${upperSymbol}`,
      availableSymbols: Object.keys(mockPrices).join(', ')
    };
  }
  
  // Calculate 24h change (mock data)
  const change24h = (Math.random() - 0.5) * 10; // Random change between -5% and +5%
  const previousPrice = price / (1 + change24h / 100);
  
  return {
    symbol: upperSymbol,
    price,
    currency,
    change24h: change24h.toFixed(2),
    change24hUSD: (price - previousPrice).toFixed(2),
    timestamp: new Date().toISOString(),
    formatted: `${upperSymbol} is currently $${price.toFixed(2)} ${currency} (${change24h > 0 ? '+' : ''}${change24h.toFixed(2)}%)`
  };
};