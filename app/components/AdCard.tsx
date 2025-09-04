'use client';

import { useState } from 'react';
import { Share2, Eye, Heart, MessageCircle } from 'lucide-react';
import Image from 'next/image';

interface AdCardProps {
  variation: {
    imageUrl: string;
    caption: string;
    promptUsed: string;
  };
  index: number;
  isSelected: boolean;
  onClick: () => void;
  variant: 'preview' | 'posted';
}

export function AdCard({ 
  variation, 
  index, 
  isSelected, 
  onClick, 
  variant 
}: AdCardProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <div
      className={`
        glass-effect rounded-lg p-4 cursor-pointer transition-all duration-200
        ${isSelected ? 'ring-2 ring-accent' : 'hover:bg-surface/50'}
      `}
      onClick={onClick}
    >
      <div className="flex gap-4">
        {/* Image */}
        <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-surface flex-shrink-0">
          {isImageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          <Image
            src={variation.imageUrl}
            alt={`Variation ${index + 1}`}
            fill
            className="object-cover"
            onLoad={() => setIsImageLoading(false)}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Variation {index + 1}</h3>
            {variant === 'posted' && (
              <div className="flex items-center gap-1 text-xs text-green-400">
                <Share2 className="w-3 h-3" />
                Posted
              </div>
            )}
          </div>
          
          <p className="text-sm text-foreground/80 mb-3 line-clamp-2">
            {variation.caption}
          </p>

          {variant === 'posted' && (
            <div className="flex items-center gap-4 text-xs text-foreground/60">
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>{Math.floor(Math.random() * 1000)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                <span>{Math.floor(Math.random() * 100)}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-3 h-3" />
                <span>{Math.floor(Math.random() * 20)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {isSelected && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="text-xs text-foreground/60">
            <strong>Prompt:</strong> {variation.promptUsed}
          </div>
        </div>
      )}
    </div>
  );
}
