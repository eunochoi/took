'use client';

import { cn } from "@/common/utils/cn";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { topButtonBaseClass, topButtonSizeClass, TopButtonSize } from "./styles";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: TopButtonSize;
}

const TopButton = forwardRef<HTMLButtonElement, Props>(
  ({ className, size = 'default', type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      className={cn(topButtonBaseClass, topButtonSizeClass[size], className)}
      type={type}
      {...props}
    />
  ),
);

TopButton.displayName = "TopButton";

export default TopButton;
