import smileImg from "@/assets/pito.webp";
import blankImg from "@/assets/pito-blank.webp";
import { cn } from "@/lib/utils";

// smile: the original artwork. The other three are drawn onto a copy of it with the face cleared.
export type PitoMood = "smile" | "ask" | "think" | "cheer";

const glow = "#7fd0ff";
const fade = "transition-opacity duration-500 ease-out";

export function Pito({ mood = "smile", className }: { mood?: PitoMood; className?: string }) {
  const show = (m: PitoMood) => cn(fade, mood === m ? "opacity-100" : "opacity-0");

  return (
    <span
      className={cn(
        "relative block shrink-0 overflow-hidden rounded-full border border-glass-border bg-white",
        className,
      )}
    >
      <img src={blankImg} alt="" width={400} height={400} className="size-full object-cover" />
      <img
        src={smileImg}
        alt=""
        width={400}
        height={400}
        className={cn("absolute inset-0 size-full object-cover", show("smile"))}
      />
      <svg
        viewBox="0 0 400 400"
        aria-hidden
        className="absolute inset-0 size-full"
        fill="none"
        stroke={glow}
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 0 5px ${glow})` }}
      >
        {/* The screen sits at a slight tilt; faces are drawn around its centre. */}
        <g transform="translate(189 205) rotate(-8)">
          {/* Asking: eyes wide open, a small curious mouth. */}
          <g className={show("ask")}>
            <ellipse cx="-50" cy="-2" rx="11" ry="16" fill={glow} stroke="none" />
            <ellipse cx="50" cy="-2" rx="11" ry="16" fill={glow} stroke="none" />
            <path d="M-12 30q12 9 24 0" />
          </g>
          {/* Thinking: eyes glancing up, mouth set to one side. */}
          <g className={show("think")}>
            <circle cx="-42" cy="-12" r="10" fill={glow} stroke="none" />
            <circle cx="58" cy="-12" r="10" fill={glow} stroke="none" />
            <path d="M-4 30h22" />
          </g>
          {/* Cheering: squeezed-shut happy eyes and an open grin. */}
          <g className={show("cheer")}>
            <path d="M-68 4l18-14 18 14" />
            <path d="M32 4l18-14 18 14" />
            <path d="M-20 22h40a20 20 0 0 1-40 0z" fill={glow} />
          </g>
        </g>
      </svg>
    </span>
  );
}
