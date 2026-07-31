'use client';

import { RefObject, ReactNode } from "react";

import { PageContent, PageContentProps } from "./PageContent";
import { PageScrollContainer } from "./PageScrollContainer";
import TopButtons from "../ui/TopButtons/TopButtons";

interface Props {
  afterContent?: ReactNode;
  children: ReactNode;
  contentProps?: PageContentProps;
  pageRef?: RefObject<HTMLDivElement>;
  topButtons?: ReactNode;
}

const AppPageLayout = ({ afterContent, children, contentProps, pageRef, topButtons }: Props) => {
  return (
    <PageScrollContainer ref={pageRef}>
      {topButtons && (
        <TopButtons>
          {topButtons}
        </TopButtons>
      )}

      <PageContent {...contentProps}>
        {children}
      </PageContent>

      {afterContent}
    </PageScrollContainer>
  );
};

export default AppPageLayout;
