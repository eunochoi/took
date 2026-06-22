'use client';

import { cn } from "@/common/utils/cn";

interface StarRatingProps {
  rating: number;
  className?: string;
  color?: string;
}

export const StarRating = ({ rating, className, color }: StarRatingProps) => {
  return (
    <div
      className={cn("flex gap-1 text-app text-theme", className)}
      style={color ? { color } : undefined}
    >
      {Array.from({ length: rating }, (_, index) => (
        <span className="star" key={index}>★</span>
      ))}
    </div>
  );
};
