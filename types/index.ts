export interface UploadedImage {
  file: File;
  preview: string;
}

export interface DetectedComponent {
  type: string;
  description: string;
  position?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface VisionAnalysis {
  components: DetectedComponent[];
  layout: string;
  description: string;
}

export interface GeneratedCode {
  code: string;
  language: string;
  framework: string;
}
