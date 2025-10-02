import { NextRequest, NextResponse } from 'next/server';
import { visionModel, bufferToGeminiImage } from '@/lib/gemini';

// Demo/Mock mode - works without API
function getDemoUIComponents(): any {
  return {
    components: [
      { type: 'heading', content: 'Welcome to Our App', position: 'top-center' },
      { type: 'text', content: 'This is a demo UI analysis', position: 'center' },
      { type: 'button', content: 'Get Started', position: 'center' },
      { type: 'button', content: 'Learn More', position: 'center' },
      { type: 'input', content: 'Enter your email', position: 'center' },
      { type: 'image', content: 'Hero Image', position: 'top' },
    ],
    labels: ['Web UI', 'Landing Page', 'Call to Action'],
    fullTextDetected: 'Welcome to Our App\nThis is a demo UI analysis\nGet Started\nLearn More\nEnter your email',
    mode: 'demo',
  };
}

// Gemini Flash Vision API
async function detectUIComponents(imageBuffer: Buffer, mimeType: string): Promise<any> {
  try {
    console.log('🔍 Vision API called with image size:', imageBuffer.length, 'bytes');
    console.log('🔑 Gemini API Key exists:', !!process.env.GEMINI_API_KEY);
    console.log('🔑 API Key prefix:', process.env.GEMINI_API_KEY?.substring(0, 20) + '...');
    
    const imagePart = bufferToGeminiImage(imageBuffer, mimeType);

    const prompt = `You are a UI/UX expert analyzing a user interface screenshot. Analyze this image in EXTREME DETAIL.

TASK: Identify EVERY UI element with precise details:

1. **Layout Structure**:
   - Overall layout type (centered form, dashboard, landing page, split-screen, etc.)
   - Container positioning and alignment
   - Grid or flex structure
   - Background colors/gradients

2. **Text Elements**:
   - ALL visible text (headings, labels, buttons, links, placeholders)
   - Font sizes (heading vs body vs small)
   - Font weights (bold, semibold, regular)
   - Text colors

3. **Form Elements** (if present):
   - Input fields (email, password, text, search, etc.)
   - Labels for each input
   - Placeholder text
   - Input field styling (borders, backgrounds, shadows)
   - Password show/hide icon
   - Checkboxes (Remember me, etc.)
   - Radio buttons

4. **Buttons**:
   - Button text
   - Button type (primary, secondary, outline, link)
   - Button colors (background, text, border)
   - Button positioning
   - Icons in buttons

5. **Links**:
   - Link text
   - Link position
   - Link styling (underlined, colored, etc.)

6. **Images/Icons**:
   - Logos
   - Profile pictures
   - Decorative images
   - Icon types (SVG icons, social icons, etc.)

7. **Colors**:
   - Primary color scheme
   - Background colors
   - Text colors
   - Accent colors

8. **Spacing & Layout**:
   - Padding and margins
   - Component gaps
   - Alignment (centered, left, right)

Return a valid JSON object with this EXACT structure (no extra text):

{
  "layoutType": "login form | dashboard | landing page | profile page | etc.",
  "components": [
    {
      "type": "input | button | text | heading | link | checkbox | image | logo | icon",
      "content": "exact text or description",
      "placeholder": "placeholder text if input",
      "inputType": "email | password | text | etc.",
      "position": "top-left | top-center | center | bottom-right | etc.",
      "styling": "color, size, weight details",
      "purpose": "what this element does"
    }
  ],
  "labels": ["Login Form", "Authentication", "Modern UI"],
  "colors": {
    "primary": "#hex",
    "background": "#hex",
    "text": "#hex"
  },
  "fullTextDetected": "ALL text visible in the image separated by newlines"
}

BE THOROUGH - include EVERY element you see!`;

    console.log('📤 Sending request to Gemini API...');
    const result = await visionModel.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();
    console.log('✅ Gemini response received, length:', text.length);
    console.log('📝 Response preview:', text.substring(0, 200));
    
    // Parse JSON from Gemini response
    try {
      const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?$/g, '').trim();
      return JSON.parse(cleanText);
    } catch {
      // If not valid JSON, return structured response
      return {
        components: [],
        labels: ['UI Screenshot'],
        fullTextDetected: text,
      };
    }
  } catch (error: any) {
    console.error('Gemini Vision API error:', error);
    
    // For ANY error (including rate limits), return demo data silently
    console.log('Using demo mode fallback');
    return getDemoUIComponents();
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('image');
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'No image uploaded' }, { status: 400 });
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const mimeType = file.type;
    
    // Claude Vision API
    const result = await detectUIComponents(buffer, mimeType);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Vision API error:', error);
    // Always return demo mode for any error
    return NextResponse.json(getDemoUIComponents());
  }
}
