'use client';

import { useState, useRef } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { uploadToPinata } from '../lib/pinata';

interface UploadSectionProps {
  onImageUploaded: (imageUrl: string) => void;
}

export function UploadSection({ onImageUploaded }: UploadSectionProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    setIsUploading(true);
    try {
      const imageUrl = await uploadToPinata(file);
      onImageUploaded(imageUrl);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <div className="glass-effect rounded-lg p-8">
      <h2 className="text-xl font-semibold mb-6 text-center">Upload Product Image</h2>
      
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
          ${isDragging ? 'border-accent bg-accent/10' : 'border-border hover:border-accent/50'}
          ${isUploading ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}
        `}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />
        
        {isUploading ? (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-foreground/70">Uploading to IPFS...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
              {isDragging ? <Upload className="w-8 h-8 text-accent" /> : <ImageIcon className="w-8 h-8 text-accent" />}
            </div>
            <h3 className="text-lg font-medium mb-2">
              {isDragging ? 'Drop your image here' : 'Choose product image'}
            </h3>
            <p className="text-foreground/70 text-sm mb-4">
              Drag and drop or click to select
            </p>
            <div className="text-xs text-foreground/50">
              Supports JPG, PNG, GIF up to 10MB
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
