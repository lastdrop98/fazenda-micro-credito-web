import logoAsset from "@/assets/fazenda-logo.png.asset.json";

export function Logo({ className = "h-10" }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="Fazenda Microcrédito"
      className={className + " w-auto object-contain"}
      loading="eager"
      decoding="async"
    />
  );
}