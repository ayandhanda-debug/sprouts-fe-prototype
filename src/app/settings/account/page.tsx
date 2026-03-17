import { SquarePen } from 'lucide-react';

function FieldRow({ label, value, link }: { label: string; value: string; link?: boolean }) {
  return (
    <div className="grid grid-cols-[280px_1fr] gap-3 py-0.5">
      <span className="text-[14px] leading-[1.3]" style={{ color: '#8d98a1' }}>
        {label}
      </span>
      <span
        className="text-[14px] leading-[1.3] font-medium"
        style={{ color: link ? '#3b82f6' : '#45535e' }}
      >
        {value}
      </span>
    </div>
  );
}

export default function SettingsAccountPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-[36px] leading-none font-semibold" style={{ color: '#273c48' }}>
          Account details
        </h2>
        <p className="mt-1 text-[13px] leading-none" style={{ color: '#73808a' }}>
          Manage all your account and profile information in one place.
        </p>
      </div>

      <section
        className="rounded-xl border bg-[#f7f8f9] p-7"
        style={{ borderColor: '#e0e3e6' }}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-6">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-[28px] font-semibold"
              style={{ backgroundColor: '#c3d0da', color: '#1f3441' }}
            >
              AN
            </div>

            <div>
              <h3 className="text-[24px] leading-none font-semibold" style={{ color: '#293f4b' }}>
                Avinash Nagla
              </h3>
              <div className="mt-4">
                <FieldRow label="Primary Email ID" value="avi@sprouts.ai" />
                <FieldRow label="Alias Email IDs" value="N/A" />
                <FieldRow label="Designated Geo" value="US" />
                <FieldRow label="Role" value="N/A" />
              </div>
            </div>
          </div>

          <button className="inline-flex items-center gap-1.5 text-[14px] leading-none font-medium" style={{ color: '#58707f' }}>
            <SquarePen size={18} />
            Edit
          </button>
        </div>
      </section>

      <section
        className="rounded-xl border bg-[#f7f8f9] p-7"
        style={{ borderColor: '#e0e3e6' }}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#56b946' }}>
              <span className="text-white text-[32px] font-bold">S</span>
            </div>

            <div className="min-w-[700px]">
              <h3 className="text-[24px] leading-none font-semibold" style={{ color: '#293f4b' }}>
                Sprouts.ai
              </h3>
              <div className="mt-4">
                <FieldRow label="Domain" value="sprouts.ai/dashboard" link />
                <FieldRow label="Phone" value="+919164409734" />
                <FieldRow label="Time Zone" value="UTC" />
              </div>

              <div className="mt-6 mb-3 flex items-center gap-3">
                <h4 className="text-[14px] leading-none font-semibold" style={{ color: '#313f49' }}>
                  Billing information
                </h4>
                <div className="h-px flex-1" style={{ backgroundColor: '#d9dde1' }} />
              </div>

              <FieldRow label="Address" value="2626 Hanover St." />
              <FieldRow label="City" value="Palo Alto" />
              <FieldRow label="State" value="Seattle" />
              <FieldRow label="Country" value="United States" />
              <FieldRow label="Pincode" value="94304" />
              <FieldRow label="Billing Currency" value="N/A" />
            </div>
          </div>

          <button className="inline-flex items-center gap-1.5 text-[14px] leading-none font-medium" style={{ color: '#58707f' }}>
            <SquarePen size={18} />
            Edit
          </button>
        </div>
      </section>
    </div>
  );
}
