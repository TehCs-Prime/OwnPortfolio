import type { ReactNode, CSSProperties } from "react";

interface LayoutProps {
  children: ReactNode;
  contentMaxWidth?: string;
}

type CustomCSSproperties = CSSProperties & {
  "--space"?: string;
  "--space-md"?: string;
  "--content-max-width"?: string;
};

export default function Layout({ children, contentMaxWidth }: LayoutProps) {
  const customCSSProperties: CustomCSSproperties = {
    "--space": "1rem",
    "--space-md": "2rem",
    "--content-max-width": contentMaxWidth ?? "0",
  };

  return (
    <div className="wrapper" aria-label="Web site content">
      <main
        aria-label="Principal content of the web page."
        className="
          grid flex justify-center
          [grid-template-columns:1fr_min(var(--content-max-width),calc(100%-var(--space-md)*2))_1fr]
          [&>*]:[grid-column:2]
          [&>*+*]:mt-[var(--space)]
        "
        style={customCSSProperties}
      >
        {children}
      </main>
    </div>
  );
}
