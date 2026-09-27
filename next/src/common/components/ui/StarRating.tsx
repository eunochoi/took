'use client';

import { cn } from "@/common/utils/cn";
import { IoMdStar } from "react-icons/io";


interface StarRatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
}

export const StarRating = ({ rating, maxRating = rating, className }: StarRatingProps) => {
  return (
    <div className={cn("flex text-xl", className)}>
      {Array.from({ length: maxRating }, (_, index) => (
        <span className={cn("star", index < rating ? "text-theme-accent" : "text-theme-text-disabled/70")} key={index}>
          <IoMdStar />
        </span>
      ))}
    </div>
  );
};
