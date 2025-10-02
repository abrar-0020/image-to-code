// Custom Gemini API client for Generative Language API (v1 endpoint)
// Using Gemini 2.5 models (available with this API key)

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1';

// Vision model wrapper - using gemini-2.5-flash (fast multimodal)
export const visionModel = {
  async generateContent(parts: any[]) {
    const response = await fetch(
      `${API_ENDPOINT}/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: parts.map(part => {
              if (typeof part === 'string') {
                return { text: part };
              }
              return part;
            })
          }]
        })
      }
    );
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Gemini API Error: ${response.status} - ${error}`);
    }
    
    const data = await response.json();
    return {
      response: {
        text: () => data.candidates[0]?.content?.parts[0]?.text || ''
      }
    };
  }
};

// Code model wrapper - using gemini-2.5-pro (powerful for code generation)
export const codeModel = {
  async generateContent(prompt: string) {
    const response = await fetch(
      `${API_ENDPOINT}/models/gemini-2.5-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        })
      }
    );
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Gemini API Error: ${response.status} - ${error}`);
    }
    
    const data = await response.json();
    return {
      response: {
        text: () => data.candidates[0]?.content?.parts[0]?.text || ''
      }
    };
  }
};

// Helper to convert buffer to Gemini format
export function bufferToGeminiImage(buffer: Buffer, mimeType: string) {
  return {
    inlineData: {
      data: buffer.toString('base64'),
      mimeType: mimeType,
    },
  };
}
