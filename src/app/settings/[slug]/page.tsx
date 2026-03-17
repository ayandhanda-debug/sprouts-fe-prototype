export default function SettingsPlaceholderPage({
  params,
}: {
  params: { slug: string };
}) {
  const title = params.slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

  return (
    <div
      className="rounded-xl border bg-[#f7f8f9] p-8"
      style={{ borderColor: '#dfe2e5' }}
    >
      <h2 className="text-[22px] leading-none font-semibold" style={{ color: '#2a3f4b' }}>
        {title}
      </h2>
      <p className="mt-2 text-[14px] leading-none" style={{ color: '#788590' }}>
        This section is part of the Settings prototype and can be refined next.
      </p>
    </div>
  );
}
