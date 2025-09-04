'use client';

import { useState } from 'react';
import { Sparkles, Coins, Wand2 } from 'lucide-react';
import { generateAdVariations } from '../lib/openai';
import Image from 'next/image';

interface GeneratorOptionsProps {
  productImage: string;
  onGenerationStart: () => void;
  onGenerationComplete: (variations: any[]) => void;
  onPostingStart: () => void;
}

export function GeneratorOptions({ 
  productImage, 
  onGenerationStart, 
  onGenerationComplete,
  onPostingStart 
}: GeneratorOptionsProps) {
  const [selectedCount, setSelectedCount] = useState(3);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    onGenerationStart();
    
    try {
      // Generate variations using OpenAI
      const variations = await generateAdVariations(productImage, selectedCount);
      onGenerationComplete(variations);
      
      // Auto-post to Farcaster
      onPostingStart();
      // In a real app, this would post to Farcaster via Neynar API
      setTimeout(() => {
        console.log('Posted to Farcaster');
      }, 2000);
      
    } catch (error) {
      console.error('Generation failed:', error);
      alert('Generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const cost = selectedCount * 0.5;

  return (
    <div className="space-y-6">
      {/* Product Preview */}
      <div className="glass-effect rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Product Preview</h2>
        <div className="relative w-full h-48 rounded-lg overflow-hidden bg-surface">
          <Image
            src={productImage}
            alt="Product"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Generation Options */}
      <div className="glass-effect rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-accent" />
          Generation Options
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Number of Variations
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[3, 5, 8].map((count) => (
                <button
                  key={count}
                  onClick={() => setSelectedCount(count)}
                  className={`
                    p-3 rounded-lg border transition-all duration-200
                    ${selectedCount === count 
                      ? 'border-accent bg-accent/20 text-accent' 
                      : 'border-border hover:border-accent/50'
                    }
                  `}
                >
                  <div className="text-lg font-bold">{count}</div>
                  <div className="text-xs opacity-70">${(count * 0.5).toFixed(2)}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-accent" />
              <span className="font-medium">Total Cost</span>
            </div>
            <span className="text-xl font-bold text-accent">${cost.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="
          w-full bg-accent hover:bg-accent/80 disabled:opacity-50 disabled:cursor-not-allowed
          text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200
          flex items-center justify-center gap-2
        "
      >
        {isGenerating ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Generating Variations...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Generate {selectedCount} Variations
          </>
        )}
      </button>
    </div>
  );
}
