'use client';

import { cn } from "@/common/utils/cn";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { TOP_BUTTON_BASE_CLASS, TOP_BUTTON_SIZE_CLASS, TopButtonSize } from "./styles";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: TopButtonSize;
}

const TopButton = forwardRef<HTMLButtonElement, Props>(
  ({ className, size = 'default', type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      className={cn(TOP_BUTTON_BASE_CLASS, TOP_BUTTON_SIZE_CLASS[size], className)}
      type={type}
      {...props}
    />
  ),
);

TopButton.displayName = "TopButton";

export default TopButton;
