/* The brand is always lowercase "waypoint"; the dot of the "i" is the map-pin
   device, so it renders as a dotless ı with a terracotta dot overlaid. */
export default function Wordmark({ className = "text-2xl" }: { className?: string }) {
  return (
    <a
      href="#/trips"
      aria-label="waypoint — home"
      className={`font-display font-extrabold tracking-tight text-ink ${className}`}
    >
      <span aria-hidden="true">
        waypo
        <span className="relative">
          ı
          <span className="absolute left-1/2 top-[0.06em] size-[0.17em] -translate-x-1/2 rounded-full bg-primary" />
        </span>
        nt
      </span>
    </a>
  );
}
