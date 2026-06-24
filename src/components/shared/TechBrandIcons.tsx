import { cn } from "@/lib/utils";

interface IconProps {
  className?: string;
  size?: number;
}

// ── Brand Icon SVG Components ──────────────────────────────────────────────

export function PythonIcon({ className, size = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
      <path d="M11.913 2C7.257 2 7.5 3.993 7.5 3.993L7.505 6.06h4.489v.625H5.578S2 6.278 2 10.987s3.11 4.544 3.11 4.544H6.97v-2.187s-.1-3.11 3.06-3.11h5.26s2.96.048 2.96-2.857V5.65S18.793 2 11.913 2zM9.768 3.99a.95.95 0 1 1 0 1.9.95.95 0 0 1 0-1.9z" fill="#3776AB"/>
      <path d="M12.087 22c4.656 0 4.413-1.993 4.413-1.993L16.495 17.94H12.006v-.625h6.416S22 17.722 22 13.013s-3.11-4.544-3.11-4.544H17.03v2.187s.1 3.11-3.06 3.11H8.71S5.75 13.718 5.75 16.623V18.35S5.207 22 12.087 22zm2.145-1.99a.95.95 0 1 1 0-1.9.95.95 0 0 1 0 1.9z" fill="#FFD43B"/>
    </svg>
  );
}

export function JavaScriptIcon({ className, size = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
      <rect width="24" height="24" rx="2" fill="#F7DF1E"/>
      <path d="M6.23 18.6c.4.66 1 1.17 1.97 1.17 1.03 0 1.68-.5 1.68-1.2 0-.82-.66-1.12-1.77-1.6l-.61-.26C5.98 16.2 5 15.4 5 13.68c0-1.6 1.22-2.82 3.12-2.82 1.35 0 2.33.47 3.03 1.7l-1.66 1.07c-.36-.66-.75-.92-1.37-.92-.62 0-1.02.4-1.02.92 0 .64.4.9 1.33 1.3l.61.26c1.8.77 2.78 1.55 2.78 3.3C11.82 20 10.4 21 8.4 21c-1.96 0-3.22-1-3.83-2.28zm7.73.25c.46.82 1.1 1.33 2.2 1.33 1.26 0 1.9-.62 1.9-1.47 0-1.02-.73-1.4-1.98-2l-.48-.22c-1.42-.61-2.33-1.37-2.33-2.99 0-1.49 1.14-2.63 2.92-2.63 1.27 0 2.18.44 2.83 1.6L17.3 13.5c-.33-.6-.68-.83-1.23-.83-.56 0-.92.37-.92.83 0 .58.35.82 1.17 1.18l.48.21c1.68.72 2.6 1.45 2.6 3.1C19.4 19.95 18 21 16 21c-1.97 0-3.23-1-3.82-2.3z" fill="#000"/>
    </svg>
  );
}

export function TypeScriptIcon({ className, size = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
      <rect width="24" height="24" rx="2" fill="#3178C6"/>
      <path d="M13.4 14.48v1.28c.21.1.46.18.76.24.3.06.62.09.94.09.32 0 .62-.03.9-.1a2 2 0 0 0 .73-.32c.21-.15.37-.34.49-.58.12-.24.18-.53.18-.87 0-.25-.04-.47-.11-.66a1.49 1.49 0 0 0-.33-.5 2.1 2.1 0 0 0-.53-.38c-.2-.11-.43-.22-.68-.33a4.2 4.2 0 0 1-.44-.2.9.9 0 0 1-.27-.19.37.37 0 0 1-.09-.25c0-.09.02-.17.07-.24a.57.57 0 0 1 .2-.17.9.9 0 0 1 .3-.1 1.5 1.5 0 0 1 .37-.03c.1 0 .2 0 .3.02.12.01.23.04.35.08l.34.14c.1.06.2.12.28.19v-1.2a3.8 3.8 0 0 0-.67-.17 4.64 4.64 0 0 0-.77-.06c-.31 0-.6.04-.88.11a2 2 0 0 0-.71.33c-.2.15-.36.34-.48.57a1.83 1.83 0 0 0-.17.82c0 .41.12.76.35 1.03.23.27.58.5 1.05.69.17.07.33.14.48.2.15.07.28.14.39.22.1.08.19.17.25.27a.67.67 0 0 1-.03.7.58.58 0 0 1-.22.18 1.1 1.1 0 0 1-.33.1 2.2 2.2 0 0 1-.41.03 2.7 2.7 0 0 1-.87-.14 2.3 2.3 0 0 1-.75-.42zm-2.37-3.13H13v-1.1H8.5v1.1h1.55v4.8h1.48z" fill="#fff"/>
    </svg>
  );
}

export function VueIcon({ className, size = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
      <path d="M2 3h3.5L12 15 18.5 3H22L12 21 2 3z" fill="#42B883"/>
      <path d="M6.5 3h3L12 8l2.5-5h3L12 15 6.5 3z" fill="#35495E"/>
    </svg>
  );
}

export function ReactIcon({ className, size = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
      <circle cx="12" cy="11.94" r="2.09" fill="#61DAFB"/>
      <g stroke="#61DAFB" fill="none" strokeWidth="1.1">
        <ellipse rx="7" ry="2.75" cx="12" cy="11.94"/>
        <ellipse rx="7" ry="2.75" cx="12" cy="11.94" transform="rotate(60 12 11.94)"/>
        <ellipse rx="7" ry="2.75" cx="12" cy="11.94" transform="rotate(120 12 11.94)"/>
      </g>
    </svg>
  );
}

export function NextJsIcon({ className, size = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
      <circle cx="12" cy="12" r="10" fill="#000"/>
      <path d="M7 17.5V7l9 11h-2l-7-9v8.5H7zm8.5-4.5L14 11.5V7h1.5v6z" fill="#fff"/>
    </svg>
  );
}

export function PostgreSQLIcon({ className, size = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
      <path d="M17.13 2.05c-1.1-.28-2.5.18-3.7.9-.65-.18-1.35-.27-2.1-.23C8.95 2.55 7 3.9 5.78 5.84c-.5.8-.84 1.68-1 2.6-.18 1.05-.12 2.2.23 3.28.15.46.36.9.62 1.3-.18.36-.3.73-.38 1.1-.33 1.65.1 3.2 1.08 4.15.72.7 1.72 1.03 2.83.9.5-.06 1-.2 1.46-.43.62.55 1.38.93 2.25.93 1.2 0 2.3-.62 3.06-1.65.5.1 1.02.1 1.52 0 2-.42 3.5-2.2 3.72-4.36.13-1.2-.1-2.4-.65-3.36.1-.5.14-1.03.12-1.55-.05-3.04-1.6-5.87-3.53-6.7z" fill="#336791"/>
      <path d="M16.8 9.15c0 .18-.01.36-.03.52-.27-.06-.53-.1-.8-.12.18-.35.3-.73.35-1.14.5.1.52.46.48.74zm-1.93-1.44c-.53-.06-1.06-.06-1.6 0-.05-.17-.1-.33-.18-.49.13-.4.48-.6.86-.5.35.1.6.45.55.8l.37.19zm-3.55.82c-.55.17-1.08.44-1.56.78-.15-.25-.28-.52-.38-.8.4-.12.82-.18 1.24-.18.24 0 .48.02.7.07v.13zm1.96 8.36c-.66.3-1.38.36-2.05.18.1-.22.2-.44.28-.67.5.27 1.07.38 1.63.3.04.06.07.13.1.19h.04zm2.97-1.45c-.16.42-.4.82-.7 1.14-.22-.06-.44-.14-.65-.24.2-.46.37-.95.47-1.45.23.12.46.26.66.43l.22.12zm.56-3.34c.04.5.02 1-.04 1.48-.27-.08-.55-.14-.84-.16.07-.44.1-.9.07-1.37.28.01.54.03.8.05z" fill="#fff" opacity=".7"/>
    </svg>
  );
}

export function MySQLIcon({ className, size = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
      <path d="M2 17.5c.5 0 .9-.1 1.2-.4.3-.2.5-.6.5-1.1s-.2-.9-.5-1.1c-.3-.3-.7-.4-1.2-.4H1V17.5h1zm0-2.1h.3c.3 0 .5.1.7.2.1.2.2.4.2.7 0 .3-.1.5-.2.7-.2.1-.4.2-.7.2H2v-1.8zM5.6 17.6c.5 0 .9-.2 1.2-.5.3-.3.5-.7.5-1.1 0-.4-.2-.8-.5-1.1-.3-.3-.7-.5-1.2-.5-.5 0-.9.2-1.2.5-.3.3-.5.7-.5 1.1 0 .4.2.8.5 1.1.3.3.7.5 1.2.5zm0-.8c-.3 0-.5-.1-.7-.3-.2-.2-.2-.4-.2-.6 0-.2.1-.4.2-.6.2-.2.4-.3.7-.3s.5.1.7.3c.2.2.2.4.2.6 0 .2-.1.4-.2.6-.2.2-.4.3-.7.3z" fill="#4479A1"/>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5H9.5V11H11v5.5zm3.5 0H13V11h1.5v5.5zm-1.75-7a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill="#00758F"/>
    </svg>
  );
}

export function AWSIcon({ className, size = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
      <path d="M6.76 10.47c0 .25.03.45.08.6.05.14.13.3.24.47.04.06.06.12.06.17 0 .08-.04.15-.13.22l-.44.29c-.06.04-.13.06-.18.06-.08 0-.15-.04-.22-.11a2.3 2.3 0 0 1-.26-.34 5.7 5.7 0 0 1-.22-.43c-.56.66-1.26.99-2.1.99-.6 0-1.08-.17-1.43-.51-.35-.34-.53-.8-.53-1.36 0-.6.21-1.09.64-1.45.43-.36 1-.54 1.74-.54.24 0 .49.02.75.06.26.04.53.1.8.18v-.51c0-.53-.11-.9-.33-1.12-.23-.22-.61-.33-1.16-.33-.25 0-.5.03-.77.09a5.8 5.8 0 0 0-.77.24l-.22.08c-.06.02-.11.03-.14.03-.12 0-.18-.09-.18-.26v-.4c0-.13.02-.23.07-.29.05-.06.14-.12.27-.18.25-.13.55-.24.9-.33A4.3 4.3 0 0 1 4.3 6c.82 0 1.42.18 1.8.56.38.37.57.94.57 1.71v2.2zm-2.9.77c.23 0 .47-.04.72-.13.25-.09.47-.25.66-.47.11-.13.19-.28.24-.44.04-.17.07-.36.07-.59V9.3a5.8 5.8 0 0 0-.65-.07 5.93 5.93 0 0 0-.63-.04c-.45 0-.78.09-1 .27-.22.18-.33.43-.33.76 0 .31.08.54.25.7.16.16.4.24.67.24zm5.43.74c-.15 0-.25-.02-.31-.08-.07-.05-.12-.16-.17-.31l-1.9-6.26c-.05-.16-.07-.26-.07-.32 0-.13.06-.2.19-.2H7.5c.15 0 .26.02.32.08.07.05.11.16.16.31l1.36 5.35 1.26-5.35c.04-.16.09-.26.16-.31.07-.06.18-.08.33-.08h.64c.16 0 .26.02.33.08.06.05.12.16.15.31l1.28 5.41 1.4-5.41c.05-.16.1-.26.16-.31.07-.06.17-.08.32-.08h.82c.13 0 .2.07.2.2 0 .04-.01.08-.02.13s-.03.1-.06.18l-1.95 6.26c-.05.16-.1.26-.17.31-.07.06-.17.08-.31.08h-.7c-.15 0-.25-.02-.33-.08-.07-.06-.12-.17-.15-.32L11 6.68l-1.27 4.9c-.04.16-.09.27-.15.33-.07.06-.18.08-.33.08h-.7zm10.72.16a4.96 4.96 0 0 1-1.15-.13 3.43 3.43 0 0 1-.87-.32c-.12-.07-.21-.14-.25-.21a.53.53 0 0 1-.06-.24v-.42c0-.17.07-.25.2-.25.05 0 .1 0 .15.02l.22.08c.3.13.62.24.97.31.35.07.7.11 1.05.11.55 0 .98-.1 1.28-.3.3-.2.45-.48.45-.85 0-.25-.08-.45-.24-.62-.16-.17-.46-.32-.9-.46l-1.3-.4c-.66-.2-1.15-.51-1.46-.9-.31-.4-.47-.84-.47-1.32 0-.38.08-.72.25-1.01.17-.29.4-.54.68-.74.29-.2.61-.35.98-.45.37-.1.76-.14 1.17-.14.2 0 .41.01.62.04.21.03.4.07.59.12.18.05.35.1.5.17.16.06.28.12.37.18.13.08.22.16.28.24.05.08.08.18.08.3v.39c0 .17-.06.25-.18.25-.07 0-.17-.03-.32-.1a3.8 3.8 0 0 0-1.62-.33c-.5 0-.9.08-1.18.25-.28.17-.42.43-.42.8 0 .25.09.46.27.63.18.17.5.34 1 .49l1.27.4c.65.2 1.12.5 1.42.87.29.38.44.8.44 1.27 0 .39-.08.74-.23 1.04-.16.3-.37.57-.65.78-.28.21-.61.37-1 .48-.4.1-.83.15-1.3.15z" fill="#FF9900"/>
    </svg>
  );
}

export function GitIcon({ className, size = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
      <path d="M23.15 10.84 13.16.85a2.9 2.9 0 0 0-4.1 0L6.92 3l2.6 2.6a3.44 3.44 0 0 1 4.37 4.38l2.5 2.5a3.44 3.44 0 1 1-1.06 1.06l-2.34-2.34v6.15a3.44 3.44 0 1 1-1.42-.02V11.1A3.44 3.44 0 0 1 9.7 7.2L7.16 4.67 1.1 10.73a2.9 2.9 0 0 0 0 4.1l9.99 9.98a2.9 2.9 0 0 0 4.1 0l9.96-9.97a2.9 2.9 0 0 0 0-4z" fill="#F05032"/>
    </svg>
  );
}

export function PandasIcon({ className, size = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
      <path d="M10.03 2h-2v5.5h2V2zm5.94 0h-2v5.5h2V2zm-5.94 7.5h-2v5h2v-5zm5.94 0h-2v5h2v-5zm-5.94 7h-2V22h2v-5.5zm5.94 0h-2V22h2v-5.5z" fill="#150458"/>
      <rect x="8" y="9" width="8" height="5" rx="1" fill="#E70488" opacity=".7"/>
    </svg>
  );
}

export function StreamlitIcon({ className, size = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
      <path d="M22 9.6 12.36 4 2 9.99l4.32 2.49 6.1-3.52 6.1 3.52L22 9.6z" fill="#FF4B4B"/>
      <path d="M12.42 14.51l-6.1-3.52-4.32 2.5 10.36 5.98 10.35-5.99-4.19-2.49-6.1 3.52z" fill="#FF4B4B" opacity=".65"/>
    </svg>
  );
}

export function JenkinsIcon({ className, size = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#D33833"/>
      <path d="M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8z" fill="#EF3D3A"/>
      <path d="M12 6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6z" fill="#F0D6B7"/>
      <circle cx="12" cy="10" r="1.5" fill="#335061"/>
      <path d="M9.5 13h5c0 1.38-1.12 2.5-2.5 2.5S9.5 14.38 9.5 13z" fill="#335061"/>
    </svg>
  );
}

export function DockerIcon({ className, size = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
      <path d="M13.98 11H12v-2h1.98V11zm-3 0H9v-2h1.98V11zm-3 0H6v-2h1.98V11zm-3 0H3v-2h1.98V11zm6-3H9V6h1.98V8zm-3 0H6V6h1.98V8zm-3 0H3V6h1.98V8zm6-3H9V3h1.98V5zm-3 0H6V3h1.98V5z" fill="#2496ED"/>
      <path d="M22.2 11.26c-.5-.35-1.65-.48-2.53-.3-.1-.85-.6-1.6-1.4-2.1l-.47-.28-.3.47c-.4.6-.5 1.6-.17 2.28-.24.12-.7.3-1.33.28H.35l-.04.43C.18 13.5.58 15 1.6 16.08c1 1.05 2.5 1.6 4.4 1.6 4.2 0 7.32-1.94 8.8-5.46.57.01 1.8.01 2.44-1.2.02-.03.16-.3.2-.4z" fill="#2496ED"/>
    </svg>
  );
}

export function FastAPIIcon({ className, size = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#009688"/>
      <path d="M13 5l-5 7h4l-1 7 5-7h-4z" fill="#fff"/>
    </svg>
  );
}

export function TableauIcon({ className, size = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
      <path d="M11.5 7v10M7 9v6M16 9v6M9 5v14M14 5v14M11.5 2v3M11.5 19v3M4 11.5h3M17 11.5h3" stroke="#E97627" strokeWidth="2" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

export function PowerBIIcon({ className, size = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
      <rect x="4" y="8" width="4" height="12" rx="1" fill="#F2C811"/>
      <rect x="10" y="5" width="4" height="15" rx="1" fill="#F2C811" opacity=".85"/>
      <rect x="16" y="2" width="4" height="18" rx="1" fill="#F2C811" opacity=".7"/>
    </svg>
  );
}

export function SQLIcon({ className, size = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
      <ellipse cx="12" cy="6" rx="8" ry="3" fill="none" stroke="#336791" strokeWidth="2"/>
      <path d="M4 6v4c0 1.66 3.58 3 8 3s8-1.34 8-3V6" fill="#336791" opacity=".3" stroke="#336791" strokeWidth="2"/>
      <path d="M4 10v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4" fill="#336791" opacity=".2" stroke="#336791" strokeWidth="2"/>
      <path d="M4 14v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4" fill="#336791" opacity=".1" stroke="#336791" strokeWidth="2"/>
    </svg>
  );
}

export function JavaIcon({ className, size = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
      <path d="M8.85 16.65s-.76.44.54.59c1.58.18 2.38.16 4.12-.18 0 0 .46.29 1.1.54-3.9 1.67-8.83-.1-5.76-.95zM8.33 14.3s-.85.62.45.76c1.68.17 3 .18 5.3-.25 0 0 .32.32.83.5-4.7 1.37-9.93.12-6.58-.01z" fill="#0074BD"/>
      <path d="M12.93 10.26c.96 1.1-.25 2.08-.25 2.08s2.43-1.25 1.31-2.82c-1.04-1.47-1.84-2.2 2.49-4.73 0 0-6.8 1.7-3.55 5.47z" fill="#EA2D2E"/>
      <path d="M17.6 17.93s.56.46-.62.82c-2.23.67-9.27.87-11.22.03-.7-.31.62-.73 1.03-.82.43-.1.68-.08.68-.08-.78-.55-5.04 1.08-2.16 1.54 7.84 1.27 14.29-.57 12.29-1.49zM9.12 12.05s-3.57.85-1.27 1.16c.98.13 2.93.1 4.75-.05 1.49-.12 2.98-.38 2.98-.38s-.52.23-.9.49c-3.63.95-10.63.51-8.62-.47 1.72-.82 3.06-.75 3.06-.75zM15.87 15.6c3.69-1.92 1.99-3.76.79-3.51-.29.06-.42.12-.42.12s.11-.17.32-.24c2.37-.83 4.2 2.46-1.27 4.8 0 0 .09-.08.58-.17z" fill="#0074BD"/>
      <path d="M14.03 2s2.04 2.04-1.93 5.18c-3.18 2.51-.73 3.95 0 5.58-1.86-1.67-3.22-3.15-2.3-4.52 1.34-2.01 5.04-2.99 4.23-6.24z" fill="#EA2D2E"/>
      <path d="M9.47 21.3c3.54.23 8.97-.13 9.1-1.83 0 0-.25.63-2.93 1.13-3.01.56-6.72.5-8.92.13 0 0 .45.37 2.75.57z" fill="#0074BD"/>
    </svg>
  );
}

export function NodeJSIcon({ className, size = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
      <path d="M12 2.09L2 7.69v9.18L12 22l10-5.13V7.69L12 2.09z" fill="#339933"/>
      <path d="M12 4.33l7.46 3.94v7.46L12 19.67l-7.46-3.94V8.27L12 4.33z" fill="#fff" opacity=".1"/>
      <path d="M12 6.17l-4 2.1v4.46L12 14.9l4-2.17V8.27L12 6.17zm0 2.17l1.92 1.01-1.92 1.04L10.08 9.35 12 8.34z" fill="#fff" opacity=".8"/>
    </svg>
  );
}

export function HTMLIcon({ className, size = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
      <path d="M4 2l1.5 17L12 21l6.5-2L20 2H4z" fill="#E44D26"/>
      <path d="M12 19.5l5.3-1.5L18.5 5H12z" fill="#F16529"/>
      <path d="M9 13h3l.3 3.3L12 17l-.3-1H9.3L9 13zm-.4-4H12v-2H8.2L7.5 7H16.5l-.2 2H12V9H8.6z" fill="#fff" opacity=".9"/>
    </svg>
  );
}

export function CSSIcon({ className, size = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
      <path d="M4 2l1.5 17L12 21l6.5-2L20 2H4z" fill="#1572B6"/>
      <path d="M12 19.5l5.3-1.5L18.5 5H12z" fill="#33A9DC"/>
      <path d="M12 9H8.6L8.8 11H12v2H9.3l.3 3.3L12 17l2.4-.7.3-3.3H12V9z" fill="#fff" opacity=".9"/>
    </svg>
  );
}

export function ScikitLearnIcon({ className, size = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
      <circle cx="12" cy="12" r="10" fill="#F7931E" opacity=".15"/>
      <text x="12" y="15.5" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#F7931E" fontFamily="sans-serif">sklearn</text>
    </svg>
  );
}

// Map of skill name to icon component
export type TechIconName = string;

export const techIconMap: Record<string, React.ComponentType<IconProps>> = {
  "Python": PythonIcon,
  "JavaScript": JavaScriptIcon,
  "TypeScript": TypeScriptIcon,
  "Vue.js": VueIcon,
  "React": ReactIcon,
  "Next.js": NextJsIcon,
  "PostgreSQL": PostgreSQLIcon,
  "MySQL": MySQLIcon,
  "SQL": SQLIcon,
  "Java": JavaIcon,
  "AWS": AWSIcon,
  "Git / GitHub": GitIcon,
  "Pandas": PandasIcon,
  "Streamlit": StreamlitIcon,
  "Jenkins": JenkinsIcon,
  "Docker": DockerIcon,
  "FastAPI": FastAPIIcon,
  "Tableau": TableauIcon,
  "Power BI": PowerBIIcon,
  "Node.js": NodeJSIcon,
  "HTML5": HTMLIcon,
  "CSS3": CSSIcon,
  "Scikit-learn": ScikitLearnIcon,
};
