'use client';

import { useState } from 'react';
import { Share2, BarChart3, RefreshCw } from 'lucide-react';
import { AdCard } from './AdCard';

interface AdVariationsDisplayProps {
  variations: any[];
  generationStatus: 'idle' | 'generating' | 'posting' | 'complete';
  onStartOver: () => void;
}

export function AdVariationsDisplay({ 
  variations, 
  generationStatus,
  onStartOver 
}: AdVariationsDisplayProps) {
  const [selectedVariation, setSelectedVariation] = useState<number | null>(null);

  if (generationStatus === 'generating') {
    return (
      <div className="glass-effect rounded-lg p-8 text-center">
        <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Generating AI Variations</h2>
        <p className="text-foreground/70">
          Our AI is creating unique ad variations for your product...
        </p>
      </div>
    );
  }

  if (generationStatus === 'posting') {
    return (
      <div className="glass-effect rounded-lg p-8 text-center">
        <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Auto-Posting to Farcaster</h2>
        <p className="text-foreground/70">
          Publishing your ad variations to social platforms...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="glass-effect rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Generated Variations</h2>
            <p className="text-foreground/70">
              {variations.length} variations ready for testing
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onStartOver}
              className="
                bg-surface hover:bg-border text-foreground
                px-4 py-2 rounded-lg transition-all duration-200
                flex items-center gap-2
              "
            >
              <RefreshCw className="w-4 h-4" />
              New Product
            </button>
          </div>
        </div>
      </div>

      {/* Variations Grid */}
      <div className="grid gap-4">
        {variations.map((variation, index) => (
          <AdCard
            key={index}
            variation={variation}
            index={index}
            isSelected={selectedVariation === index}
            onClick={() => setSelectedVariation(selectedVariation === index ? null : index)}
            variant={generationStatus === 'complete' ? 'posted' : 'preview'}
          />
        ))}
      </div>

      {/* Performance Tracking Placeholder */}
      <div className="glass-effect rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-accent" />
          <h3 className="font-semibold">Performance Tracking</h3>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-surface rounded-lg">
            <div className="text-2xl font-bold text-accent">-</div>
            <div className="text-sm text-foreground/70">Views</div>
          </div>
          <div className="p-3 bg-surface rounded-lg">
            <div className="text-2xl font-bold text-accent">-</div>
            <div className="text-sm text-foreground/70">Likes</div>
          </div>
          <div className="p-3 bg-surface rounded-lg">
            <div className="text-2xl font-bold text-accent">-</div>
            <div className="text-sm text-foreground/70">Shares</div>
          </div>
        </div>
        <p className="text-xs text-foreground/50 mt-4 text-center">
          Performance data will be available after posting
        </p>
      </div>
    </div>
  );
}
