import { Agent } from '@mastra/core';
import { model } from '../../config';
import { cryptoPriceTool, cryptoPriceToolSchema } from './crypto-tool';

export const cryptoAgent = new Agent({
  name: 'crypto-agent',
  instructions: `You are a cryptocurrency price assistant.
    You can fetch current prices for various cryptocurrencies.
    When users ask about crypto prices, use the crypto price tool to get the latest information.
    Always mention the price, 24-hour change, and format prices clearly.
    Available symbols include: BTC, ETH, SOL, USDC, BNB, XRP, ADA, DOGE, MATIC.`,
  model,
  tools: {
    getCryptoPrice: {
      id: 'getCryptoPrice',
      description: 'Get the current price of a cryptocurrency',
      inputSchema: cryptoPriceToolSchema,
      execute: cryptoPriceTool,
    },
  },
});