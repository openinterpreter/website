export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 29 123"
      fill="currentColor"
      className={className}
      aria-label="Workstation logo"
    >
      {/* circle: 29×29 | gap: 12 | pill: 29×82 | total: 29×123 */}
      <circle cx="14.5" cy="14.5" r="14.5" />
      <rect x="0" y="41" width="29" height="82" rx="14.5" />
    </svg>
  );
}
