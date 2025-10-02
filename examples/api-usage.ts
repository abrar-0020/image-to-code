// Example usage of the Image-to-Code Pipeline APIs

// 1. Upload and analyze image
const uploadAndAnalyze = async (imageFile: File) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  
  const response = await fetch('/api/vision', {
    method: 'POST',
    body: formData,
  });
  
  const visionResult = await response.json();
  return visionResult;
};

// 2. Generate code from vision result
const generateCode = async (visionResult: any) => {
  const response = await fetch('/api/generate-code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ visionResult }),
  });
  
  const { code } = await response.json();
  return code;
};

// 3. Complete pipeline
const imageToCode = async (imageFile: File) => {
  try {
    // Step 1: Analyze image
    console.log('Analyzing image...');
    const visionResult = await uploadAndAnalyze(imageFile);
    console.log('Vision result:', visionResult);
    
    // Step 2: Generate code
    console.log('Generating code...');
    const code = await generateCode(visionResult);
    console.log('Generated code:', code);
    
    return { visionResult, code };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Usage example
const handleImageUpload = async (file: File) => {
  const result = await imageToCode(file);
  // result.visionResult contains component analysis
  // result.code contains generated React + Tailwind code
};
