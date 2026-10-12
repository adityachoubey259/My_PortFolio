import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <header className="page-header">
      <div>
        {eyebrow ? <span className="os-eyebrow">{eyebrow}</span> : null}
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
      </div>
      {actions ? <div className="page-header-actions">{actions}</div> : null}
    </header>
  );
}

export function GlassPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={cn("glass-panel", className)}>{children}</section>;
}

export function GlossyCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <article className={cn("glossy-card", className)}>{children}</article>;
}

export function PremiumButton({
  children,
  href,
  variant = "primary",
  download,
}: {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  download?: string;
}) {
  return (
    <a className={cn("premium-button", variant === "secondary" && "premium-button--secondary")} href={href} download={download}>
      {children}
    </a>
  );
}
