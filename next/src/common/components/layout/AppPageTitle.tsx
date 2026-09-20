interface Props {
  title: string;
  description?: string;
}

const AppPageTitle = ({ title, description }: Props) => (
  <header className="flex min-w-0 flex-col gap-2 pb-4 font-sans">
    <h1 className="m-0 font-title text-3xl font-bold leading-tight tracking-tight text-theme-text-primary desktop:text-3xl">{title}</h1>
    {description && <p className="m-0 text-base leading-relaxed text-theme-text-secondary tablet:text-base">{description}</p>}
  </header>
);

export default AppPageTitle;
