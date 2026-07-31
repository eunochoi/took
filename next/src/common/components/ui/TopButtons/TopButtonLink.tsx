'use client';

import { cn } from "@/common/utils/cn";
import { AnchorHTMLAttributes, forwardRef } from "react";
import { topButtonBaseClass, topButtonSizeClass, TopButtonSize } from "./styles";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  size?: TopButtonSize;
}

const TopButtonLink = forwardRef<HTMLAnchorElement, Props>(
  ({ className, size = 'default', ...props }, ref) => (
    <a
      ref={ref}
      className={cn(topButtonBaseClass, topButtonSizeClass[size], className)}
      {...props}
    />
  ),
);

TopButtonLink.displayName = "TopButtonLink";

export default TopButtonLink;
