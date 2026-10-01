import { cn } from '@/common/utils/cn';
import { motion } from 'framer-motion';
import Image from 'next/image';
import hidingCatTail from '/public/img/hiding-cat/hiding-cat-tail.png';

const CONTAINER_CLASS =
  'w-[180px] self-center mt-16 desktop:mt-24 mb-24 flex flex-col';
const TAIL_IMAGE_CLASS =
  '-mb-1 h-auto w-full';
const BOX_CLASS =
  'relative h-24 w-full rotate-[-1deg] bg-theme-text-tertiary shadow-md [clip-path:polygon(4%_3%,95%_0%,100%_82%,93%_100%,8%_95%,0%_14%)]';
const BOX_TOP_FOLD_CLASS =
  'absolute left-[7%] right-[10%] top-0 h-4 bg-white/30 [clip-path:polygon(0_20%,100%_0,95%_100%,5%_80%)]';

interface BottomSafeProps {
  className?: string;
  animation?: boolean;
}

export const BottomSafe = ({ className, animation = true }: BottomSafeProps) => {
  if (!animation) {
    return (
      <div className={cn(CONTAINER_CLASS, className)}>
        <Image
          priority
          className={TAIL_IMAGE_CLASS}
          src={hidingCatTail}
          alt="hiding-cat-tail"
          sizes="45vw"
        />
        <div className={BOX_CLASS}>
          <div className={BOX_TOP_FOLD_CLASS} />
        </div>
      </div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.2 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.3, ease: "easeOut" }}
      className={cn(CONTAINER_CLASS, className)}>
      <Image
        priority
        className={TAIL_IMAGE_CLASS}
        src={hidingCatTail}
        alt="hiding-cat-tail"
        sizes="45vw"
      />
      <div className={BOX_CLASS}>
        <div className={BOX_TOP_FOLD_CLASS} />
      </div>
    </motion.div>
  );
};
