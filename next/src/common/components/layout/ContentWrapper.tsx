import { cn } from "@/common/utils/cn";
import { CSSProperties, HTMLAttributes, forwardRef } from "react";

export interface ContentWrapperProps extends HTMLAttributes<HTMLDivElement> {
  $gap?: number;
  $mobileGap?: number;
  $tabletGap?: number;
  $paddingTop?: number;
  $paddingBottom?: number;
  $flex?: string;
}

interface ContentWrapperStyle extends CSSProperties {
  "--content-gap": string;
  "--content-mobile-gap": string;
  "--content-tablet-gap": string;
  "--content-mobile-padding-top": string;
  "--content-mobile-padding-bottom": string;
  "--content-padding-top": string;
  "--content-padding-bottom": string;
}

export const ContentWrapper = forwardRef<HTMLDivElement, ContentWrapperProps>(
  (
    {
      $gap,
      $mobileGap,
      $tabletGap,
      $paddingTop,
      $paddingBottom,
      $flex,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const contentStyle: ContentWrapperStyle = {
      "--content-gap": `${$gap ?? 0}px`,
      "--content-mobile-gap": `${$mobileGap ?? $gap ?? 0}px`,
      "--content-tablet-gap": `${$tabletGap ?? $gap ?? 0}px`,
      "--content-mobile-padding-top": `${$paddingTop ?? 0}px`,
      "--content-mobile-padding-bottom":
        $paddingBottom !== undefined
          ? `calc(var(--mobileNav) + ${$paddingBottom}px)`
          : "var(--mobileNav)",
      "--content-padding-top": `${$paddingTop ?? 36}px`,
      "--content-padding-bottom": `${$paddingBottom ?? 36}px`,
      flex: $flex,
      ...style,
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex h-auto w-full max-w-[650px] flex-col gap-[var(--content-gap)]",
          "max-[479px]:gap-[var(--content-mobile-gap)] max-[479px]:px-[4dvw] max-[479px]:pb-[var(--content-mobile-padding-bottom)] max-[479px]:pt-[var(--content-mobile-padding-top)]",
          "min-[480px]:gap-[var(--content-tablet-gap)] min-[480px]:px-9 min-[480px]:pb-[var(--content-padding-bottom)] min-[480px]:pt-[var(--content-padding-top)]",
          className,
        )}
        style={contentStyle}
        {...props}
      />
    );
  },
);
ContentWrapper.displayName = "ContentWrapper";
