import type { SVGProps } from "react";

export function GeoNexusLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

export function RockHammerIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M15.24 8.43l-6.8 6.8" />
            <path d="M13.88 15.2l-1.42-1.42" />
            <path d="M12.18 5.48L6.4 11.26a1 1 0 000 1.42l5.65 5.65a1 1 0 001.42 0l5.78-5.78" />
            <path d="M19.94 6.32a1 1 0 00-1.42 0L14.8 10.04" />
            <path d="M4.06 17.68l1.42-1.42" />
        </svg>
    )
}
