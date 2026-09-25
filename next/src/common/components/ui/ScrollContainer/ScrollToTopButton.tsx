import { cn } from "@/common/utils/cn";
import { motion } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

interface Props {
  onClick: () => void;
}

export const ScrollToTopButton = ({ onClick }: Props) => {
  return (
    <motion.button
      aria-label="맨 위로 이동"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}

      className={cn('absolute right-[4dvw] bottom-[calc(var(--mobileNav)+20px+var(--scroll-bottom-safe,0px))] tablet:max-desktop:bottom-[calc(2rem+var(--scroll-bottom-safe,0px))] desktop:bottom-[calc(3rem+var(--scroll-bottom-safe,0px))] z-[91]',
        'h-[50px] w-[50px] items-center justify-center !border-0',
        'border-[1px] border-theme-bg pointer-events-auto flex items-center gap-1.5 rounded-full bg-theme-surface/75 text-theme-text-tertiary shadow-theme-floating backdrop-blur-2xl')}
      onClick={onClick}
      type="button"
    >
      <FaArrowUp />
    </motion.button>
  );
};
