'use client';

import { RefObject, ReactNode } from "react";

import { PageContent, PageContentProps } from "./PageContent";
import { PageScrollContainer } from "./PageScrollContainer";
import TopButtons from "../ui/TopButtons/TopButtons";

const CONTENT_VARIANT_PROPS = {
  normal: {},
  fill: { $flex: "1 1 0" },
} satisfies Record<string, PageContentProps>;

interface Props {
  afterContent?: ReactNode;
  children: ReactNode;
  contentProps?: PageContentProps;
  contentVariant?: keyof typeof CONTENT_VARIANT_PROPS;
  pageRef?: RefObject<HTMLDivElement>;
  topButtons?: ReactNode;
}

const AppPageLayout = ({ afterContent, children, contentProps, contentVariant = 'normal', pageRef, topButtons }: Props) => {
  return (
    <PageScrollContainer ref={pageRef}>
      {topButtons && (
        <TopButtons>
          {topButtons}
        </TopButtons>
      )}

      <PageContent {...CONTENT_VARIANT_PROPS[contentVariant]} {...contentProps}>
        {children}
      </PageContent>

      {afterContent}
    </PageScrollContainer>
  );
};

export default AppPageLayout;
