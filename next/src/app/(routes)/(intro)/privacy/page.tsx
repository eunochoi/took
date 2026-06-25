import {
  INTRO_PAGE_BG
} from '../_constants/theme';
import PrivacyBody from './_components/PrivacyBody';
import PrivacyHeader from './_components/PrivacyHeader';

const PrivacyPage = () => {
  return (
    <div className="h-[100dvh] w-[100dvw] overflow-y-auto" style={{ backgroundColor: INTRO_PAGE_BG }}>
      <main className="mx-auto flex w-full max-w-[720px] flex-col px-5 py-10 sm:px-8 sm:py-14">
        <PrivacyHeader />
        <PrivacyBody />
      </main>
    </div>
  );
};

export default PrivacyPage;
