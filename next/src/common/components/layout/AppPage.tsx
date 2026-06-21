'use client';

import { RefObject, ReactNode } from "react";

import { ContentWrapper, ContentWrapperProps } from "./ContentWrapper";
import { PageWrapper } from "./PageWrapper";
import TopButtons from "../ui/TopButtons";

const CONTENT_VARIANT_PROPS = {
  normal: {},
  fill: { $flex: "1 1 0" },
  list: {},
} satisfies Record<string, ContentWrapperProps>;

interface Props {
  afterContent?: ReactNode;
  children: ReactNode;
  contentProps?: ContentWrapperProps;
  contentVariant?: keyof typeof CONTENT_VARIANT_PROPS;
  pageRef?: RefObject<HTMLDivElement>;
  topButtons?: ReactNode;
}

const AppPage = ({ afterContent, children, contentProps, contentVariant = 'normal', pageRef, topButtons }: Props) => {
  return (
    <PageWrapper ref={pageRef}>
      {topButtons && (
        <TopButtons>
          {topButtons}
        </TopButtons>
      )}

      <ContentWrapper {...CONTENT_VARIANT_PROPS[contentVariant]} {...contentProps}>
        {children}
      </ContentWrapper>

      {afterContent}
    </PageWrapper>
  );
};

export default AppPage;
