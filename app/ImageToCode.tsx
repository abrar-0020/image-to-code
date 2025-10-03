'use client';

import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';

interface GeneratedCodeResponse {
  html: string;
  css: string;
  javascript: string;
  react: string;
  vue: string;
  tailwind: string;
}

export default function ImageToCode() {
  const [visionResult, setVisionResult] = useState<any>(null);
  const [generatedCode, setGeneratedCode] = useState<GeneratedCodeResponse | null>(null);
  const [activeTab, setActiveTab] = useState<string>('react');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Call AI code generation API
  const handleGenerateCode = async () => {
    if (!visionResult) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/generate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visionResult }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.details || errorData.error || 'AI code generation error');
      }
      const data = await res.json();
      setGeneratedCode(data);
      setActiveTab('react'); // Default to React tab
    } catch (err: any) {
      console.error('Code generation error:', err);
      setError(err.message || 'Failed to generate code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Image to Code
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform UI screenshots into production-ready React + Tailwind CSS code using AI
          </p>
        </div>

        {/* Upload Section */}
        <div className="max-w-3xl mx-auto mb-8">
          <ImageUpload onImageProcessed={setVisionResult} />
        </div>

        {/* Generate Code Button */}
        {visionResult && (
          <div className="max-w-3xl mx-auto mb-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Analysis Complete!</h3>
                  <p className="text-sm text-gray-500">
                    Found {visionResult.components?.length || 0} UI components
                  </p>
                </div>
                <button
                  onClick={handleGenerateCode}
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      <span>Generate Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="max-w-3xl mx-auto mb-8">
            <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-red-800 font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Code & Preview Section */}
        {generatedCode && (
          <div className="space-y-6">
            {/* Code Tabs Section */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Tab Headers */}
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  <h2 className="text-white font-semibold">Generated Code - Select Format</h2>
                </div>
                
                {/* Tab Navigation */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {[
                    { id: 'react', label: 'React + Tailwind', icon: '⚛️' },
                    { id: 'html', label: 'HTML', icon: '🌐' },
                    { id: 'css', label: 'CSS', icon: '🎨' },
                    { id: 'javascript', label: 'JavaScript', icon: '⚡' },
                    { id: 'vue', label: 'Vue.js', icon: '💚' },
                    { id: 'tailwind', label: 'Tailwind Only', icon: '🌊' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                        activeTab === tab.id
                          ? 'bg-white text-gray-900 shadow-lg'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      <span>{tab.icon}</span>
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Code Display */}
              <div className="p-6 bg-gray-50">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">
                      {activeTab === 'html' && 'Complete HTML Document - Standalone file ready to use'}
                      {activeTab === 'css' && 'Pure CSS Stylesheet - Copy to your style.css file'}
                      {activeTab === 'javascript' && 'Vanilla JavaScript - Add to your <script> tag'}
                      {activeTab === 'react' && 'React Component with Tailwind - JSX/TSX file'}
                      {activeTab === 'vue' && 'Vue.js Component - Single File Component (.vue)'}
                      {activeTab === 'tailwind' && 'HTML with Tailwind Classes - Pure utility classes'}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      const currentCode = activeTab === 'html' ? generatedCode.html :
                                        activeTab === 'css' ? generatedCode.css :
                                        activeTab === 'javascript' ? generatedCode.javascript :
                                        activeTab === 'react' ? generatedCode.react :
                                        activeTab === 'vue' ? generatedCode.vue :
                                        generatedCode.tailwind;
                      navigator.clipboard.writeText(currentCode);
                      alert('Code copied to clipboard! ✓');
                    }}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy Code
                  </button>
                </div>
                
                <pre className="w-full h-[500px] p-4 font-mono text-sm bg-gray-900 text-gray-100 border-2 border-gray-700 rounded-xl overflow-auto">
                  <code>
                    {activeTab === 'html' && generatedCode.html}
                    {activeTab === 'css' && generatedCode.css}
                    {activeTab === 'javascript' && generatedCode.javascript}
                    {activeTab === 'react' && generatedCode.react}
                    {activeTab === 'vue' && generatedCode.vue}
                    {activeTab === 'tailwind' && generatedCode.tailwind}
                  </code>
                </pre>
              </div>
            </div>

            {/* Live Preview */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      <h2 className="text-white font-semibold">Live Preview - Browser View</h2>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white text-xs bg-white/20 px-2 py-1 rounded">
                      Interactive
                    </span>
                    <span className="text-white text-xs bg-white/20 px-2 py-1 rounded">
                      Full UI
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                  <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-white/80 text-sm font-mono">localhost:preview</span>
                </div>
              </div>
              <div className="bg-gradient-to-b from-gray-50 to-gray-100 p-4">
                <div className="bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200" style={{ height: '600px' }}>
                  {/* Combined HTML + CSS for proper rendering */}
                  <iframe
                    srcDoc={`
                      <!DOCTYPE html>
                      <html>
                        <head>
                          <meta charset="UTF-8">
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <style>
                            ${generatedCode.css || ''}
                          </style>
                        </head>
                        <body>
                          ${generatedCode.html || ''}
                          <script>
                            ${generatedCode.javascript || ''}
                          </script>
                        </body>
                      </html>
                    `}
                    className="w-full h-full border-0"
                    title="Live Preview - Complete Working UI"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-popups"
                    style={{ 
                      backgroundColor: 'white',
                      colorScheme: 'light'
                    }}
                  />
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Fully functional UI with working interactions</span>
                  </div>
                  <span className="text-gray-400">HTML + CSS + JavaScript combined</span>
                </div>
              </div>
            </div>
          </div>
        )}


      </div>
    </div>
  );
}
