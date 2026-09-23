import DocContent from '@/common/components/ui/Doc/DocContent';
import DocHeader from '@/common/components/ui/Doc/DocHeader';
import DocLayout from '@/common/components/ui/Doc/DocLayout';
import Link from 'next/link';

import AccountDeletionSection from './_components/AccountDeletionSection';

const deletionData = [
  'Took 계정 정보',
  '일기와 감정 기록',
  '습관과 습관 체크 기록',
  '로그인 세션',
  '첨부 사진의 계정 연결 정보',
];

const AccountDeletionView = () => {
  return (
    <DocLayout>
      <DocHeader
        title="계정 삭제"
        subtitle="Account deletion"
        description="앱을 설치하지 않아도 이 페이지에서 본인 확인 후 Took 회원 탈퇴를 완료할 수 있습니다."
      />
      <DocContent
        title="탈퇴 시 삭제되는 데이터"
        list={deletionData}
        closing={['다른 사용자가 참조하지 않는 첨부 사진 원본은 별도 저장소 정리 대상입니다.']}
      />
      <AccountDeletionSection />
      <div className="flex justify-center py-2">
        <Link className="text-sm text-theme-accent" href="/privacy">개인정보처리방침 보기</Link>
      </div>
    </DocLayout>
  );
};

export default AccountDeletionView;
