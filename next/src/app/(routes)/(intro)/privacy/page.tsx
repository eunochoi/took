import PrivacyBody from './_components/PrivacyBody';
import PrivacyHeader from './_components/PrivacyHeader';

const PrivacyPage = () => {
  return (
    <div className="h-[100dvh] w-[100dvw] overflow-y-auto bg-theme-bg">
      <main className="mx-auto flex w-full max-w-[720px] flex-col px-5 py-10 tablet:px-8 tablet:py-14">
        <PrivacyHeader />
        <PrivacyBody />
      </main>
    </div>
  );
};

export default PrivacyPage;
