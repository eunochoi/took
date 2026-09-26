'use client';

import DocContent from '@/common/components/ui/Doc/DocContent';
import DocHeader from '@/common/components/ui/Doc/DocHeader';
import DocLayout from '@/common/components/ui/Doc/DocLayout';
import { PRIVACY_CONTENTS } from './_constants';

const PrivacyClientPage = () => (
  <DocLayout>
    <DocHeader title="개인정보처리방침" subtitle="Privacy Policy" />
    {PRIVACY_CONTENTS.map((content) => (
      <DocContent key={content.title} {...content} />
    ))}
  </DocLayout>
);

export default PrivacyClientPage;
