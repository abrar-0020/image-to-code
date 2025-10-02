# Image-to-Code with Google Gemini 2.5 Pro 🎨→💻

Convert UI screenshots into production-ready code using Google Gemini 2.5 Pro AI!

## ✨ Features

- 🖼️ **Image Upload** - Drag & drop or click to upload (PNG/JPG, max 10MB)
- 👁️ **Vision Analysis** - Gemini 2.5 detects UI components, text, and layout
- 💻 **Multi-Format Generation** - 6 code formats in one click:
  - React (with Tailwind CSS)
  - HTML (standalone with inline CSS/JS)
  - CSS (complete stylesheet)
  - JavaScript (vanilla JS with DOM manipulation)
  - Vue 3 (Composition API)
  - Tailwind (pure utility classes)
- 🎨 **Live Preview** - Real-time browser preview of generated UI
- 💰 **100% FREE** - Google Gemini API (1500 requests/day, 15/minute)

## 🚀 Quick Start

### 1. Get Gemini API Key
1. Visit https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Copy your key (starts with `AIzaSy...`)

### 2. Configure
Open `.env.local` and add your key:
```bash
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### 3. Install & Run
```bash
npm install
npm run dev
```

### 4. Use It!
Open http://localhost:3006 and start converting! 🎉

## 📋 Requirements

- Node.js 18+ 
- npm or yarn
- Google Gemini API key


## 🏗️ Tech Stack

- **Framework**: Next.js 15.5.4 (App Router + Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **AI**: Google Gemini 2.5 Pro & Gemini 2.5 Flash
- **API**: Direct REST API calls (v1 endpoint)

## 🎯 How It Works

1. **Upload** - User uploads UI screenshot (PNG/JPG, max 10MB)
2. **Analyze** - Gemini 2.5 Flash detects components, text, colors, layout
3. **Generate** - Gemini 2.5 Pro creates code in 6 formats simultaneously
4. **Preview** - Live browser preview with complete working UI

## 📁 Project Structure

```
image-to-code/
├── app/
│   ├── api/
│   │   ├── vision/route.ts          # Vision analysis endpoint
│   │   └── generate-code/route.ts   # Code generation endpoint
│   ├── components/
│   │   └── ImageUpload.tsx          # Image upload component
│   ├── ImageToCode.tsx              # Main UI component
│   ├── components/
│   │   └── ImageUpload.tsx          # Image upload component
│   ├── page.tsx                     # Home page
│   └── globals.css                  # Global styles
├── lib/
│   └── gemini.ts                    # Gemini API client
├── types/
│   └── index.ts                     # TypeScript types
└── .env.local                       # API key (git-ignored)
```

## 🎨 Supported Image Formats

- ✅ PNG
- ✅ JPEG/JPG
- Max size: 10MB
- Recommended: Clear, high-resolution UI screenshots

## 🎯 API Endpoints

### POST `/api/vision`
Analyzes UI screenshot and detects components.

**Input**: FormData with `image` file  
**Output**: JSON with components, layout, colors, text

```json
{
  "layoutType": "landing page",
  "components": [...],
  "labels": ["Login Form", "Authentication"],
  "colors": {
    "primary": "#3b82f6",
    "background": "#ffffff"
  }
}
```

### POST `/api/generate-code`
Generates code in 6 formats from vision analysis.

**Input**: JSON with `visionResult`  
**Output**: JSON with `code` string

## 🔧 Customization

### Change AI Model

Edit the API routes to use different Claude models:

**Input**: Vision result JSON  
**Output**: Code in 6 formats

```json
{
  "html": "<!DOCTYPE html>...",
  "css": "body { margin: 0; }...",
  "javascript": "function handleSubmit()...",
  "react": "'use client';\nimport React...",
  "vue": "<template>...",
  "tailwind": "<div class='flex items-center'..."
}
```

## ⚙️ Customization

### Change AI Models

Edit `lib/gemini.ts` to use different Gemini models:

```typescript
// For faster responses
const visionModel = 'gemini-2.5-flash';  // Current

// For higher quality
const codeModel = 'gemini-2.5-pro';      // Current
```

### Modify Code Generation Prompt

Edit `app/api/generate-code/route.ts` to customize output:

```typescript
const prompt = `Your custom instructions for code generation...`;
```

### Adjust Vision Analysis

Edit `app/api/vision/route.ts` to change component detection behavior.

## 🐛 Troubleshooting

### Demo Mode Always Shows
- ✅ Check API key is in `.env.local`
- ✅ Restart dev server: Stop (Ctrl+C) and run `npm run dev`
- ✅ Verify API is enabled at Google Cloud Console

### API Errors
- ✅ Check format: `GEMINI_API_KEY=AIzaSy...`
- ✅ No quotes or extra spaces
- ✅ Enable Generative Language API in Google Cloud

### Port Already in Use
- ✅ Server auto-switches to available port (check terminal output)

## 🎓 Learn More

- [Google AI Studio](https://aistudio.google.com/)
- [Gemini API Docs](https://ai.google.dev/gemini-api/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)

## 📝 License

MIT License - Feel free to use for personal or commercial projects!

## 🎉 Ready to Go!

1. ✅ Get your Gemini API key
2. ✅ Add it to `.env.local`
3. ✅ Run `npm run dev`
4. ✅ Open http://localhost:3006
5. ✅ Upload an image and watch the magic! 🪄

---

**Built with ❤️ using Google Gemini 2.5 Pro**

Happy coding! 🚀✨
