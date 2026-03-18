'use client';

import { Clock3, Linkedin, Mail, UserRound, X } from 'lucide-react';

interface CreditConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedContactsCount: number;
  availableCredits: number;
}

export default function CreditConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  selectedContactsCount,
  availableCredits,
}: CreditConfirmationModalProps) {
  if (!isOpen) return null;

  const messageTypes = [
    { name: 'Email', channel: 'email' as const, credits: 1, step: 0 },
    { name: 'Follow-up 1', channel: 'email' as const, credits: 1, step: 1 },
    { name: 'Follow-up 2', channel: 'email' as const, credits: 1, step: 2 },
    { name: 'LinkedIn Message', channel: 'linkedin' as const, credits: 1, step: 0 },
    { name: 'LinkedIn Follow-up 1', channel: 'linkedin' as const, credits: 1, step: 1 },
    { name: 'LinkedIn Follow-up 2', channel: 'linkedin' as const, credits: 1, step: 2 },
  ];
  const creditsPerContact = messageTypes.reduce((sum, messageType) => sum + messageType.credits, 0);
  const totalRequired = selectedContactsCount * creditsPerContact;
  const usagePercentage = availableCredits > 0 ? (totalRequired / availableCredits) * 100 : 0;

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
              <span className="inline-flex items-center gap-1.5">
                <UserRound size={14} />
                {selectedContactsCount} Selected
              </span>
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
                  className={`flex items-center justify-between px-4 py-3 rounded-lg ${type.step > 0 ? 'ml-5' : ''}`}
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
                    {type.step > 0 && (
                      <span className="text-xs font-semibold" style={{ color: '#9aa4ad' }}>
                        ↳
                      </span>
                    )}
                    <span className="text-sm font-medium" style={{ color: '#111928' }}>
                      {type.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3" style={{ color: '#706f69' }}>
                    {type.channel === 'linkedin' ? (
                      <Linkedin size={15} style={{ color: '#1c64f2' }} />
                    ) : (
                      <Mail size={15} style={{ color: '#1c64f2' }} />
                    )}
                    <div className="flex items-center gap-1">
                      <Clock3 size={15} />
                      <span className="text-sm font-medium">{type.credits}</span>
                    </div>
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
              <Clock3 size={20} />
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
