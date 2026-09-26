import { Suspense } from "react";

import UnauthorizedClientPage from "./UnauthorizedClientPage";

// /unauthorized 페이지입니다.
// NextAuth callback에서 인증 실패 또는 provider 충돌이 발생하면 이 페이지로 이동합니다.
const Page = () => {
  return (
    <Suspense>
      <UnauthorizedClientPage />
    </Suspense>
  );
};

export default Page;
