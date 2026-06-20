'use client'

import { useMediaQuery } from "react-responsive";
import BottomNav from "./BottomNav";
import SideNav from "./SideNav";

const MobileNav = () => {
  const isLandscape = useMediaQuery({ minWidth: 480, maxWidth: 1024 });

  return isLandscape ? <SideNav /> : <BottomNav />;
};

export default MobileNav;
