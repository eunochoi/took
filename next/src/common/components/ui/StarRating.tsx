'use client';

import { cn } from "@/common/utils/cn";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
}

export const StarRating = ({ rating, maxRating = rating, className }: StarRatingProps) => {
  return (
    <div className={cn("flex gap-1 text-base", className)}>
      {Array.from({ length: maxRating }, (_, index) => (
        <span className={cn("star", index < rating ? "text-theme-accent" : "text-theme-text-disabled/70")} key={index}>★</span>
      ))}
    </div>
  );
};
