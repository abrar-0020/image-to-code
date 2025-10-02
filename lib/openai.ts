import OpenAI from 'openai';

// Initialize OpenRouter client (OpenAI-compatible API)
export const openrouter = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:3001',
    'X-Title': 'Image-to-Code Pipeline',
  },
});

// Helper function to convert buffer to base64 data URL
export function bufferToBase64(buffer: Buffer, mimeType: string): string {
  return `data:${mimeType};base64,${buffer.toString('base64')}`;
}
