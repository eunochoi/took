import { motion } from 'framer-motion';
import Image from 'next/image';
import bottomCatTail from '/public/img/bottom-cat-tail.png';

const CONTAINER_CLASS =
  'mt-16 mb-24 flex flex-col items-center tablet:hidden';

const TAIL_IMAGE_CLASS =
  '-mb-1 h-auto w-1/2';

const BOX_CLASS =
  'relative h-24 w-1/2 rotate-[-1deg] bg-theme-text-tertiary shadow-md [clip-path:polygon(4%_3%,95%_0%,100%_82%,93%_100%,8%_95%,0%_14%)]';

const BOX_TOP_FOLD_CLASS =
  'absolute left-[7%] right-[10%] top-0 h-4 bg-white/30 [clip-path:polygon(0_20%,100%_0,95%_100%,5%_80%)]';

export const BottomSafe = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={CONTAINER_CLASS}>
      <Image
        className={TAIL_IMAGE_CLASS}
        src={bottomCatTail}
        alt="bottom-cat-tail"
        sizes="45vw"
      />

      <div className={BOX_CLASS}>
        <div className={BOX_TOP_FOLD_CLASS} />
      </div>
    </motion.div>
  );
};
