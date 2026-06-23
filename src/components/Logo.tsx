export function Logo({ className = "h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 260 64"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Fazenda Microcrédito"
    >
      <circle cx="24" cy="32" r="22" fill="#1A2332" />
      <circle cx="46" cy="32" r="22" fill="#7CB83A" />
      <path
        d="M26 20 h16 v7 h-9 v4 h9 v7 h-9 v8 h-7 z"
        fill="#1A2332"
      />
      <text
        x="80"
        y="34"
        fontFamily="Poppins, Inter, sans-serif"
        fontWeight="800"
        fontSize="22"
        fill="#7CB83A"
        letterSpacing="1"
      >
        FAZENDA
      </text>
      <text
        x="80"
        y="52"
        fontFamily="Poppins, Inter, sans-serif"
        fontWeight="700"
        fontSize="11"
        fill="#1A2332"
        letterSpacing="3"
      >
        MICROCRÉDITO
      </text>
    </svg>
  );
}