import { HTMLAttributes } from "react";

export type DivProps = HTMLAttributes<HTMLDivElement>;
export type ParagraphProps = HTMLAttributes<HTMLParagraphElement>;

export interface AppSectionProps extends HTMLAttributes<HTMLElement> {
  $gap?: number;
}

export interface AppCardGridProps extends DivProps {
  $columns?: number;
}
