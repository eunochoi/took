import { ReactNode } from "react";
import { Suspense } from "react";

type Props = {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <Suspense>
      {children}
    </Suspense>
  );
}

export default Layout;