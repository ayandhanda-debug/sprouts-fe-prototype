'use client';

interface GeneratingMessagesModalProps {
  isOpen: boolean;
}

export default function GeneratingMessagesModal({ isOpen }: GeneratingMessagesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl px-12 py-10 flex flex-col items-center">
        {/* AI Icon with Animation */}
        <div className="mb-6 relative">
          {/* Outer rotating circle */}
          <div className="absolute inset-0 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" style={{ width: '80px', height: '80px' }}></div>

          {/* Inner icon */}
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#dbeafe' }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1c64f2" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2" style={{ color: '#111928' }}>
          <span className="inline-block w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
          Generating Messages
        </h3>

        {/* Subtitle */}
        <p className="text-sm mb-1" style={{ color: '#706f69' }}>
          Generating messages for you...
        </p>

        {/* Message */}
        <p className="text-xs" style={{ color: '#9ca3af' }}>
          This may take a moment.
        </p>
      </div>
    </div>
  );
}
