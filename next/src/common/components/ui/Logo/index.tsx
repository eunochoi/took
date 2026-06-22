'use client';

import Image from 'next/image';
import emotionsImage from '/public/img/emotion/emotions.png';

interface LogoProps {
  size?: number;
  className?: string;
}

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const Logo = ({ size = 36, className }: LogoProps) => {
  const imageSize = size * 5;

  return (
    <div className={cx("flex flex-col items-center justify-center gap-2", className)}>
      <div className="flex items-center justify-center">
        <Image src={emotionsImage} alt="TO:OK Logo" width={imageSize} height={imageSize} priority />
      </div>
      <span
        className="uppercase leading-[1.2] text-[#5C5C5C]"
        style={{ fontFamily: "var(--font-joti-one), 'Joti One', sans-serif", fontSize: `${size}px` }}
      >
        TO:OK
      </span>
    </div>
  );
};

export default Logo;
