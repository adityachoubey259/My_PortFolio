"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type MagneticLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
};

export function MagneticLink({
  children,
  className,
  variant = "primary",
  disabled,
  onMouseMove,
  onMouseLeave,
  onClick,
  ...props
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <a
      ref={ref}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : props.tabIndex}
      className={cn("magnetic-link", `magnetic-link--${variant}`, disabled && "is-disabled", className)}
      onMouseMove={(event) => {
        if (!disabled && window.matchMedia("(pointer: fine)").matches) {
          const target = ref.current;
          if (target) {
            const rect = target.getBoundingClientRect();
            const x = event.clientX - rect.left - rect.width / 2;
            const y = event.clientY - rect.top - rect.height / 2;
            target.style.transform = `translate3d(${x * 0.08}px, ${y * 0.14}px, 0)`;
          }
        }
        onMouseMove?.(event);
      }}
      onMouseLeave={(event) => {
        if (ref.current) {
          ref.current.style.transform = "translate3d(0, 0, 0)";
        }
        onMouseLeave?.(event);
      }}
      onClick={(event) => {
        if (disabled) {
          event.preventDefault();
        }
        onClick?.(event);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
