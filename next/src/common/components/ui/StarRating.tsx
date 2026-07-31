'use client';

import { cn } from "@/common/utils/cn";

interface StarRatingProps {
  rating: number;
  className?: string;
}

export const StarRating = ({ rating, className }: StarRatingProps) => {
  return (
    <div className={cn("flex gap-1 text-base text-theme-accent", className)}>
      {Array.from({ length: rating }, (_, index) => (
        <span className="star" key={index}>★</span>
      ))}
    </div>
  );
};
