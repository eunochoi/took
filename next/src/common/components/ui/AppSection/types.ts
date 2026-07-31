import { HTMLAttributes } from "react";

export type DivProps = HTMLAttributes<HTMLDivElement>;
export type ParagraphProps = HTMLAttributes<HTMLParagraphElement>;

export type AppSectionProps = HTMLAttributes<HTMLElement>;

export interface AppCardGridProps extends DivProps {
  columns?: 1 | 2 | 3;
}
