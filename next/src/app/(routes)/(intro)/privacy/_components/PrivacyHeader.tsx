import Logo from "@/common/components/ui/Logo";

const PrivacyHeader = () => {
  return <header className="flex flex-col items-center gap-5 rounded-theme bg-theme-surface px-5 py-10 text-center shadow-card tablet:px-8 tablet:py-12">
    <Logo size={48} />
    <div className="flex flex-col gap-3">
          <h1 className="m-0 break-keep  text-3xl leading-tight text-theme-text-primary tablet:text-4xl">개인정보처리방침</h1>
      <p className="m-0 text-base font-bold text-theme-accent">Privacy Policy</p>
    </div>
  </header>
}

export default PrivacyHeader;
