import React from 'react';

interface MessageStepperProps {
  currentStep: 1 | 2;
}

export default function MessageStepper({ currentStep }: MessageStepperProps) {
  return (
    <div className="flex items-center gap-2">
      {/* Step 1: Preview */}
      <div className="flex items-center gap-2">
        <div
          className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold"
          style={{
            backgroundColor: currentStep === 1 ? '#1c64f2' : '#e7e7e6',
            color: currentStep === 1 ? '#ffffff' : '#706f69',
          }}
        >
          1
        </div>
        <span
          className="text-sm font-medium"
          style={{ color: currentStep === 1 ? '#1c64f2' : '#706f69' }}
        >
          Preview
        </span>
      </div>

      {/* Progress Line */}
      <div
        className="h-0.5 w-16 mx-2"
        style={{ backgroundColor: currentStep === 2 ? '#1c64f2' : '#e7e7e6' }}
      />

      {/* Step 2: Sync to Campaign Manager */}
      <div className="flex items-center gap-2">
        <div
          className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold"
          style={{
            backgroundColor: currentStep === 2 ? '#1c64f2' : '#e7e7e6',
            color: currentStep === 2 ? '#ffffff' : '#706f69',
          }}
        >
          2
        </div>
        <span
          className="text-sm font-medium"
          style={{ color: currentStep === 2 ? '#1c64f2' : '#706f69' }}
        >
          Sync to Campaign Manager
        </span>
      </div>
    </div>
  );
}
