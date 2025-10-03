import { NextRequest, NextResponse } from "next/server";
import { codeModel } from "../../../lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { visionResult, format } = await req.json();

    if (!visionResult) {
      return NextResponse.json(
        { error: "No vision result provided" },
        { status: 400 }
      );
    }

    // Build prompt for code generation
    const prompt = `Based on this UI analysis, generate production-ready code.

UI ANALYSIS:
${JSON.stringify(visionResult, null, 2)}

Generate clean, semantic, and accessible code in the following formats:

1. **HTML**: Pure HTML5 with semantic tags
2. **CSS**: Modern CSS with flexbox/grid, responsive design
3. **JavaScript**: Vanilla JS with modern ES6+ syntax
4. **React**: Functional component with hooks
5. **Vue**: Vue 3 composition API with <script setup>
6. **Tailwind**: HTML with Tailwind CSS classes

CRITICAL: Return ONLY a valid JSON object. Do not wrap in markdown code blocks. Do not add any explanation text.

JSON structure:
{
  "html": "complete HTML code",
  "css": "complete CSS code",
  "javascript": "complete JavaScript code",
  "react": "complete React component code",
  "vue": "complete Vue component code",
  "tailwind": "complete HTML with Tailwind classes"
}`;

    // Call Gemini API
    const result = await codeModel.generateContent(prompt);
    let responseText = result.response.text();

    // Remove markdown code blocks if present
    responseText = responseText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();

    // Parse JSON response
    let codeOutput;
    try {
      codeOutput = JSON.parse(responseText);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      console.error("Raw response:", responseText.substring(0, 500));
      throw new Error("Failed to parse AI response");
    }

    return NextResponse.json(codeOutput);
  } catch (error: any) {
    console.error("Code generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate code", details: error.message },
      { status: 500 }
    );
  }
}
