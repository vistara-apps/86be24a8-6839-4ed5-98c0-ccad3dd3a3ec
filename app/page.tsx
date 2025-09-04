'use client';

import { useState } from 'react';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { Identity } from '@coinbase/onchainkit/identity';
import { useAccount } from 'wagmi';
import { UploadSection } from './components/UploadSection';
import { GeneratorOptions } from './components/GeneratorOptions';
import { AdVariationsDisplay } from './components/AdVariationsDisplay';
import { ProgressIndicator } from './components/ProgressIndicator';
import { Sparkles, Zap } from 'lucide-react';

export default function HomePage() {
  const { address, isConnected } = useAccount();
  const [currentStep, setCurrentStep] = useState<'upload' | 'generate' | 'results'>('upload');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generationProgress, setGenerationProgress] = useState<'idle' | 'generating' | 'posting' | 'complete'>('idle');
  const [adVariations, setAdVariations] = useState<any[]>([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background">
      <div className="container py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-accent" />
            <h1 className="text-3xl font-bold gradient-text">AdRemixr</h1>
          </div>
          <p className="text-foreground/70 text-base">
            Spin AI-powered ad variations and auto-post them for rapid testing
          </p>
        </header>

        {/* Connection State */}
        {!isConnected ? (
          <div className="glass-effect rounded-lg p-8 text-center mb-8">
            <Zap className="w-12 h-12 text-accent mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-4">Connect to Get Started</h2>
            <p className="text-foreground/70 mb-6">
              Connect your wallet to start generating AI-powered ad variations
            </p>
            <ConnectWallet />
          </div>
        ) : (
          <div className="space-y-6">
            {/* User Identity */}
            <div className="glass-effect rounded-lg p-4 flex items-center justify-between">
              <Identity address={address} />
              <ConnectWallet />
            </div>

            {/* Progress Indicator */}
            <ProgressIndicator 
              currentStep={currentStep}
              generationStatus={generationProgress}
            />

            {/* Main Content */}
            {currentStep === 'upload' && (
              <UploadSection 
                onImageUploaded={(imageUrl) => {
                  setUploadedImage(imageUrl);
                  setCurrentStep('generate');
                }}
              />
            )}

            {currentStep === 'generate' && uploadedImage && (
              <GeneratorOptions
                productImage={uploadedImage}
                onGenerationStart={() => {
                  setGenerationProgress('generating');
                  setCurrentStep('results');
                }}
                onGenerationComplete={(variations) => {
                  setAdVariations(variations);
                  setGenerationProgress('complete');
                }}
                onPostingStart={() => setGenerationProgress('posting')}
              />
            )}

            {currentStep === 'results' && (
              <AdVariationsDisplay
                variations={adVariations}
                generationStatus={generationProgress}
                onStartOver={() => {
                  setCurrentStep('upload');
                  setUploadedImage(null);
                  setAdVariations([]);
                  setGenerationProgress('idle');
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
