'use client';

import { cn } from "@/common/utils/cn";
import { AnchorHTMLAttributes, forwardRef } from "react";
import { TOP_BUTTON_BASE_CLASS, TOP_BUTTON_SIZE_CLASS, TopButtonSize } from "./styles";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  size?: TopButtonSize;
}

const TopButtonLink = forwardRef<HTMLAnchorElement, Props>(
  ({ className, size = 'default', ...props }, ref) => (
    <a
      ref={ref}
      className={cn(TOP_BUTTON_BASE_CLASS, TOP_BUTTON_SIZE_CLASS[size], className)}
      {...props}
    />
  ),
);

TopButtonLink.displayName = "TopButtonLink";

export default TopButtonLink;
