'use client';

import { X } from 'lucide-react';

interface CreditConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedContactsCount: number;
  totalCredits: number;
  availableCredits: number;
}

export default function CreditConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  selectedContactsCount,
  totalCredits,
  availableCredits,
}: CreditConfirmationModalProps) {
  if (!isOpen) return null;

  const creditsPerContact = 5;
  const totalRequired = selectedContactsCount * creditsPerContact;
  const usagePercentage = (totalRequired / availableCredits) * 100;

  const messageTypes = [
    { name: 'Email', icon: '📧', credits: 1 },
    { name: 'Follow-up', icon: '📧', credits: 1 },
    { name: 'Second Follow-up', icon: '📧', credits: 1 },
    { name: 'Connection Request', icon: '🔗', credits: 1 },
    { name: 'Post Connection', icon: '🔗', credits: 1 },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: '#e7e7e6' }}>
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold" style={{ color: '#111928' }}>
              Credit Confirmation
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="px-3 py-1 text-xs font-medium rounded-full"
              style={{ backgroundColor: '#f3f5f5', color: '#706f69' }}
            >
              👤 {selectedContactsCount} Selected
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-gray-100"
              style={{ color: '#706f69' }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Credits Usage Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium" style={{ color: '#111928' }}>
                Credits usage:
              </span>
              <span className="text-sm font-medium" style={{ color: '#111928' }}>
                {totalRequired}/{availableCredits}
              </span>
            </div>
            <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#e7e7e6' }}>
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${Math.min(usagePercentage, 100)}%`,
                  backgroundColor: '#1c64f2',
                }}
              />
            </div>
          </div>

          {/* Credits Breakdown */}
          <div>
            <h3 className="text-sm font-medium mb-3" style={{ color: '#111928' }}>
              Credits breakdown:
            </h3>
            <div className="space-y-2">
              {messageTypes.map((type, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-4 py-3 rounded-lg"
                  style={{ backgroundColor: '#f9fafb' }}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={true}
                      readOnly
                      className="rounded"
                      style={{ accentColor: '#1c64f2' }}
                    />
                    <span className="text-sm font-medium" style={{ color: '#111928' }}>
                      {type.name}
                    </span>
                    <span className="text-sm">{type.icon}</span>
                  </div>
                  <div className="flex items-center gap-1" style={{ color: '#706f69' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    <span className="text-sm font-medium">{type.credits}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Note */}
          <div className="p-4 rounded-lg" style={{ backgroundColor: '#fef3c7' }}>
            <p className="text-xs" style={{ color: '#92400e' }}>
              <span className="font-semibold">Note:</span> Only fresh messages will consume credits. Already generated messages are skipped.
            </p>
          </div>

          {/* Total Credits */}
          <div className="pt-4 border-t flex items-center justify-between" style={{ borderColor: '#e7e7e6' }}>
            <span className="text-base font-semibold" style={{ color: '#111928' }}>
              Total Credits
            </span>
            <div className="flex items-center gap-1" style={{ color: '#111928' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <span className="text-lg font-bold">{creditsPerContact}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex items-center justify-end gap-3" style={{ borderColor: '#e7e7e6' }}>
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-medium rounded-lg border hover:bg-gray-50 transition-colors"
            style={{ borderColor: '#e7e7e6', color: '#706f69' }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#1c64f2' }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
