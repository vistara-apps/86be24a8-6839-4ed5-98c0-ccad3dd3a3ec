'use client';

import { Check, Upload, Wand2, Share2 } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: 'upload' | 'generate' | 'results';
  generationStatus: 'idle' | 'generating' | 'posting' | 'complete';
}

export function ProgressIndicator({ currentStep, generationStatus }: ProgressIndicatorProps) {
  const steps = [
    { key: 'upload', label: 'Upload', icon: Upload },
    { key: 'generate', label: 'Generate', icon: Wand2 },
    { key: 'results', label: 'Results', icon: Share2 },
  ];

  const getStepStatus = (stepKey: string) => {
    const stepIndex = steps.findIndex(s => s.key === stepKey);
    const currentIndex = steps.findIndex(s => s.key === currentStep);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) {
      if (stepKey === 'results') {
        if (generationStatus === 'complete') return 'completed';
        if (generationStatus === 'generating' || generationStatus === 'posting') return 'active';
      }
      return 'active';
    }
    return 'pending';
  };

  return (
    <div className="glass-effect rounded-lg p-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const status = getStepStatus(step.key);
          const Icon = step.icon;
          
          return (
            <div key={step.key} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200
                    ${status === 'completed' ? 'bg-accent text-white' : 
                      status === 'active' ? 'bg-accent/20 text-accent border-2 border-accent' :
                      'bg-surface text-foreground/50 border border-border'
                    }
                  `}
                >
                  {status === 'completed' ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <span
                  className={`
                    mt-2 text-xs font-medium
                    ${status === 'completed' || status === 'active' ? 'text-foreground' : 'text-foreground/50'}
                  `}
                >
                  {step.label}
                </span>
              </div>
              
              {index < steps.length - 1 && (
                <div
                  className={`
                    w-16 h-0.5 mx-4 transition-all duration-200
                    ${status === 'completed' ? 'bg-accent' : 'bg-border'}
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
