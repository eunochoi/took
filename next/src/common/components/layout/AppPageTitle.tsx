interface Props {
  title: string;
  description?: string;
}

const AppPageTitle = ({ title, description }: Props) => (
  <header className="flex min-w-0 flex-col gap-2">
    <h1 className="m-0  text-3xl font-bold leading-tight tracking-tight text-theme-text-primary desktop:text-3xl">{title}</h1>
    {description && <p className="m-0 text-lg leading-relaxed text-theme-text-secondary">{description}</p>}
  </header>
);

export default AppPageTitle;
