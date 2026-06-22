import {
  HTMLAttributes,
  forwardRef
} from "react";

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

type DivProps = HTMLAttributes<HTMLDivElement>;
type ParagraphProps = HTMLAttributes<HTMLParagraphElement>;

interface AppSectionProps extends HTMLAttributes<HTMLElement> {
  $gap?: number;
}

interface AppCardGridProps extends DivProps {
  $columns?: number;
}

export const AppSection = forwardRef<HTMLElement, AppSectionProps>(
  ({ $gap, className, style, ...props }, ref) => (
    <section
      ref={ref}
      className={cx("m-0 flex w-full flex-col", className)}
      style={{ gap: $gap ?? 16, ...style }}
      {...props}
    />
  ),
);
AppSection.displayName = "AppSection";

export const AppSectionHeader = forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cx("flex items-center justify-between gap-3", className)}
      {...props}
    />
  ),
);
AppSectionHeader.displayName = "AppSectionHeader";

export const AppSectionTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cx("m-0 text-[1.35rem] font-bold text-grey-title", className)}
      {...props}
    />
  ),
);
AppSectionTitle.displayName = "AppSectionTitle";

export const AppSectionMeta = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cx("text-sm font-bold text-theme", className)}
      {...props}
    />
  ),
);
AppSectionMeta.displayName = "AppSectionMeta";

export const AppCardGrid = forwardRef<HTMLDivElement, AppCardGridProps>(
  ({ $columns = 2, className, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cx("grid w-full gap-2 min-[480px]:gap-3", className)}
      style={{
        gridTemplateColumns: `repeat(${$columns}, minmax(0, 1fr))`,
        ...style,
      }}
      {...props}
    />
  ),
);
AppCardGrid.displayName = "AppCardGrid";

const appCardClass =
  "rounded-2xl bg-white/90 shadow-card";

export const AppCard = forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cx(appCardClass, "p-4 min-[480px]:p-5", className)}
      {...props}
    />
  ),
);
AppCard.displayName = "AppCard";

export const AppStatCard = forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cx(
        appCardClass,
        "flex min-h-[100px] flex-col justify-between gap-2 p-3 min-[480px]:min-h-[110px] min-[480px]:p-4",
        className,
      )}
      {...props}
    />
  ),
);
AppStatCard.displayName = "AppStatCard";

export const AppStatLabel = forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cx("m-0 text-[0.8rem] font-bold text-[#8a8da3]", className)}
      {...props}
    />
  ),
);
AppStatLabel.displayName = "AppStatLabel";

export const AppStatValueWrapper = forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cx("flex items-baseline gap-1", className)}
      {...props}
    />
  ),
);
AppStatValueWrapper.displayName = "AppStatValueWrapper";

export const AppStatValue = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cx("text-2xl font-extrabold leading-none text-theme min-[480px]:text-[1.8rem]", className)}
      {...props}
    />
  ),
);
AppStatValue.displayName = "AppStatValue";

export const AppStatUnit = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cx("text-[0.8rem] font-bold text-[#8a8da3]", className)}
      {...props}
    />
  ),
);
AppStatUnit.displayName = "AppStatUnit";

export const AppSubsection = forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cx("flex flex-col gap-3", className)}
      {...props}
    />
  ),
);
AppSubsection.displayName = "AppSubsection";

export const AppSubsectionTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cx("m-0 text-base font-bold text-grey-title", className)}
      {...props}
    />
  ),
);
AppSubsectionTitle.displayName = "AppSubsectionTitle";

export const AppInfoCard = forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cx(appCardClass, "flex flex-col gap-3 px-4 py-5 min-[480px]:px-5 min-[480px]:py-6", className)}
      {...props}
    />
  ),
);
AppInfoCard.displayName = "AppInfoCard";

export const AppInfoContent = forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cx(
        "flex w-full items-start justify-center gap-3 [&>span]:flex-1 [&>span]:break-words [&>span]:text-justify [&>span]:text-base [&>span]:leading-normal [&>span]:text-grey-title",
        className,
      )}
      {...props}
    />
  ),
);
AppInfoContent.displayName = "AppInfoContent";

export const AppInfoText = forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cx("m-0 break-words text-justify text-base leading-normal text-grey-title", className)}
      {...props}
    />
  ),
);
AppInfoText.displayName = "AppInfoText";

export const AppSurfaceCard = forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cx(appCardClass, "w-full p-4 min-[480px]:p-5", className)}
      {...props}
    />
  ),
);
AppSurfaceCard.displayName = "AppSurfaceCard";

export const AppNoteCard = forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cx(
        appCardClass,
        "m-0 break-words px-4 py-5 text-justify text-base leading-normal text-grey-title min-[480px]:px-5 min-[480px]:py-6",
        className,
      )}
      {...props}
    />
  ),
);
AppNoteCard.displayName = "AppNoteCard";
