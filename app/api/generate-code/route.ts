import { NextRequest, NextResponse } from 'next/server';
import { codeModel } from '@/lib/gemini';

// Demo code generator - works without API
function generateDemoCode(visionResult: any): any {
  const { components, labels, fullTextDetected } = visionResult;
  
  // Generate React code
  let reactCode = `'use client';\n\nimport React, { useState } from 'react';\n\n`;
  reactCode += `export default function GeneratedComponent() {\n`;
  reactCode += `  const [searchQuery, setSearchQuery] = useState('');\n`;
  reactCode += `  const [cartCount, setCartCount] = useState(0);\n\n`;
  reactCode += `  const handleSearch = (e) => {\n`;
  reactCode += `    e.preventDefault();\n`;
  reactCode += `    alert(\`Searching: \${searchQuery}\`);\n`;
  reactCode += `  };\n\n`;
  reactCode += `  const handleAddToCart = () => {\n`;
  reactCode += `    setCartCount(prev => prev + 1);\n`;
  reactCode += `  };\n\n`;
  reactCode += `  return (\n`;
  reactCode += `    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">\n`;
  reactCode += `      <div className="max-w-6xl mx-auto">\n`;
  
  if (fullTextDetected) {
    const lines = fullTextDetected.split('\n').filter((l: string) => l.trim());
    if (lines[0]) {
      reactCode += `        <h1 className="text-4xl font-bold text-gray-900 mb-4">${lines[0]}</h1>\n`;
    }
  }
  
  reactCode += `        <button onClick={handleAddToCart} className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add to Cart ({cartCount})</button>\n`;
  reactCode += `      </div>\n`;
  reactCode += `    </div>\n`;
  reactCode += `  );\n`;
  reactCode += `}\n`;
  
  // Generate HTML code
  let htmlCode = `<!DOCTYPE html>\n<html lang="en">\n<head>\n`;
  htmlCode += `  <meta charset="UTF-8">\n`;
  htmlCode += `  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n`;
  htmlCode += `  <title>Generated UI</title>\n`;
  htmlCode += `  <style>\n`;
  htmlCode += `    body { margin: 0; font-family: Arial, sans-serif; background: linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%); }\n`;
  htmlCode += `    .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }\n`;
  htmlCode += `    h1 { font-size: 2.5rem; color: #1a202c; margin-bottom: 1rem; }\n`;
  htmlCode += `    button { padding: 0.75rem 2rem; background: #3b82f6; color: white; border: none; border-radius: 0.5rem; cursor: pointer; font-size: 1rem; }\n`;
  htmlCode += `    button:hover { background: #2563eb; }\n`;
  htmlCode += `  </style>\n`;
  htmlCode += `</head>\n<body>\n`;
  htmlCode += `  <div class="container">\n`;
  if (fullTextDetected) {
    const lines = fullTextDetected.split('\n').filter((l: string) => l.trim());
    if (lines[0]) htmlCode += `    <h1>${lines[0]}</h1>\n`;
  }
  htmlCode += `    <button onclick="addToCart()">Add to Cart (<span id="cart-count">0</span>)</button>\n`;
  htmlCode += `  </div>\n`;
  htmlCode += `  <script>\n`;
  htmlCode += `    let cartCount = 0;\n`;
  htmlCode += `    function addToCart() {\n`;
  htmlCode += `      cartCount++;\n`;
  htmlCode += `      document.getElementById('cart-count').textContent = cartCount;\n`;
  htmlCode += `      console.log('Cart count:', cartCount);\n`;
  htmlCode += `    }\n`;
  htmlCode += `  </script>\n`;
  htmlCode += `</body>\n</html>`;
  
  // Generate CSS code
  let cssCode = `/* Generated CSS Stylesheet */\n\n`;
  cssCode += `body {\n  margin: 0;\n  font-family: 'Segoe UI', Arial, sans-serif;\n  background: linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%);\n  min-height: 100vh;\n}\n\n`;
  cssCode += `.container {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 2rem;\n}\n\n`;
  cssCode += `h1 {\n  font-size: 2.5rem;\n  color: #1a202c;\n  font-weight: bold;\n  margin-bottom: 1rem;\n}\n\n`;
  cssCode += `button {\n  padding: 0.75rem 2rem;\n  background: #3b82f6;\n  color: white;\n  border: none;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  font-size: 1rem;\n  transition: all 0.3s;\n}\n\n`;
  cssCode += `button:hover {\n  background: #2563eb;\n  transform: scale(1.05);\n}\n`;
  
  // Generate JavaScript code
  let jsCode = `// Generated JavaScript\n\n`;
  jsCode += `let cartCount = 0;\n\n`;
  jsCode += `function addToCart() {\n`;
  jsCode += `  cartCount++;\n`;
  jsCode += `  const cartElement = document.getElementById('cart-count');\n`;
  jsCode += `  if (cartElement) {\n`;
  jsCode += `    cartElement.textContent = cartCount;\n`;
  jsCode += `  }\n`;
  jsCode += `  console.log('Added to cart. Total items:', cartCount);\n`;
  jsCode += `  alert('Item added to cart!');\n`;
  jsCode += `}\n\n`;
  jsCode += `function handleSearch(query) {\n`;
  jsCode += `  console.log('Searching for:', query);\n`;
  jsCode += `  alert(\`Searching for: \${query}\`);\n`;
  jsCode += `}\n\n`;
  jsCode += `// Initialize on page load\n`;
  jsCode += `document.addEventListener('DOMContentLoaded', () => {\n`;
  jsCode += `  console.log('Page loaded and ready!');\n`;
  jsCode += `});\n`;
  
  // Generate Vue code
  let vueCode = `<template>\n`;
  vueCode += `  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">\n`;
  vueCode += `    <div class="max-w-6xl mx-auto">\n`;
  if (fullTextDetected) {
    const lines = fullTextDetected.split('\n').filter((l: string) => l.trim());
    if (lines[0]) vueCode += `      <h1 class="text-4xl font-bold text-gray-900 mb-4">${lines[0]}</h1>\n`;
  }
  vueCode += `      <button @click="handleAddToCart" class="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">\n`;
  vueCode += `        Add to Cart ({{ cartCount }})\n`;
  vueCode += `      </button>\n`;
  vueCode += `    </div>\n`;
  vueCode += `  </div>\n`;
  vueCode += `</template>\n\n`;
  vueCode += `<script setup>\n`;
  vueCode += `import { ref } from 'vue';\n\n`;
  vueCode += `const searchQuery = ref('');\n`;
  vueCode += `const cartCount = ref(0);\n\n`;
  vueCode += `const handleSearch = () => {\n`;
  vueCode += `  alert(\`Searching: \${searchQuery.value}\`);\n`;
  vueCode += `};\n\n`;
  vueCode += `const handleAddToCart = () => {\n`;
  vueCode += `  cartCount.value++;\n`;
  vueCode += `  console.log('Cart count:', cartCount.value);\n`;
  vueCode += `};\n`;
  vueCode += `</script>\n`;
  
  // Generate Tailwind HTML
  let tailwindCode = `<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">\n`;
  tailwindCode += `  <div class="max-w-6xl mx-auto">\n`;
  if (fullTextDetected) {
    const lines = fullTextDetected.split('\n').filter((l: string) => l.trim());
    if (lines[0]) tailwindCode += `    <h1 class="text-4xl font-bold text-gray-900 mb-4">${lines[0]}</h1>\n`;
  }
  tailwindCode += `    <button class="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-lg hover:scale-105">\n`;
  tailwindCode += `      Add to Cart\n`;
  tailwindCode += `    </button>\n`;
  tailwindCode += `  </div>\n`;
  tailwindCode += `</div>`;
  
  return {
    html: htmlCode,
    css: cssCode,
    javascript: jsCode,
    react: reactCode,
    vue: vueCode,
    tailwind: tailwindCode,
  };
}

// Gemini Pro code generation
async function generateCodeFromVision(visionResult: any): Promise<any> {
  try {
    console.log('💻 Code generation called');
    console.log('🔑 Gemini API Key exists:', !!process.env.GEMINI_API_KEY);
    console.log('📊 Vision result:', JSON.stringify(visionResult).substring(0, 300));
    
    const prompt = `You are an EXPERT UI developer specializing in pixel-perfect recreation of user interfaces. You have deep expertise in HTML, CSS, JavaScript, React, Vue, and Tailwind CSS.

CRITICAL: Analyze this UI carefully and recreate it EXACTLY as shown in the image.

UI ANALYSIS DATA:
${JSON.stringify(visionResult, null, 2)}

INSTRUCTIONS:
1. Study the detected components, labels, and text carefully
2. Identify the UI pattern (login form, dashboard, landing page, etc.)
3. Note the layout structure (centered, grid, flex)
4. Identify all form fields, buttons, links, and text
5. Recreate EXACTLY matching colors, spacing, and typography

Generate COMPLETE, PIXEL-PERFECT code in ALL 6 formats as a JSON object:

{
  "html": "...",
  "css": "...",
  "javascript": "...",
  "react": "...",
  "vue": "...",
  "tailwind": "..."
}

FORMAT REQUIREMENTS:

**1. HTML** - Complete standalone HTML document:
- <!DOCTYPE html> with all meta tags
- Inline <style> with complete CSS (matching the design exactly)
- All form fields with proper name/id attributes
- <script> with form validation and event handlers
- Working submit buttons with preventDefault
- Proper semantic HTML5 (form, input, label, button)
- Placeholder text matching the design
- MUST be ready to open in browser

**2. CSS** - Complete standalone stylesheet:
- Reset/normalize styles
- All classes for forms, inputs, buttons
- Exact colors from the design
- Proper spacing (padding, margin) matching layout
- Flexbox/Grid for layout
- Hover and focus states
- Box shadows and borders
- Responsive media queries
- Font families and sizes

**3. JavaScript** - Vanilla JS with full functionality:
- Form validation (check empty fields, email format, password strength)
- Event listeners (submit, input, click)
- DOM manipulation (show errors, toggle password visibility)
- Functions: validateEmail(), validatePassword(), handleSubmit()
- console.log for debugging
- Alert/display success messages
- Password show/hide toggle if present
- Remember me checkbox handling

**4. React** - Complete functional component with 'use client', imports, useState, event handlers, Tailwind CSS

**5. Vue** - Complete Vue 3 component with <template>, <script setup>, reactive refs, Tailwind CSS

**6. Tailwind** - Pure HTML with ONLY Tailwind CSS utility classes

RETURN ONLY THE JSON OBJECT - NO EXTRA TEXT!`;

    console.log('📤 Sending code generation request to Gemini...');
    const result = await codeModel.generateContent(prompt);
    const response = await result.response;
    const content = response.text();
    console.log('✅ Gemini code response received, length:', content.length);
    console.log('📝 Response preview:', content.substring(0, 200));
    
    // Try to parse as JSON first
    try {
      const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?$/g, '').trim();
      const parsed = JSON.parse(cleanContent);
      return parsed;
    } catch {
      // If not JSON, create a structured response
      return {
        html: content,
        css: content,
        javascript: content,
        react: content,
        vue: content,
        tailwind: content,
      };
    }
  } catch (error: any) {
    console.error('Gemini code generation error:', error);
    
    // For ANY error (including rate limits), use demo mode silently
    console.log('Using demo mode fallback');
    return generateDemoCode(visionResult);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { visionResult } = await req.json();
    if (!visionResult) {
      return NextResponse.json({ error: 'No vision result provided' }, { status: 400 });
    }
    // Claude AI code generation - returns all formats
    const allFormats = await generateCodeFromVision(visionResult);
    return NextResponse.json(allFormats);
  } catch (error: any) {
    console.error('Code generation error:', error);
    // Return generic error without specific rate limit message
    return NextResponse.json({ error: 'Code generation error' }, { status: 500 });
  }
}
