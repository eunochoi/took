import { PrivacyContent } from "../_constants";

const Section = ({ content }: { content: PrivacyContent }) => {
  return <section key={content.title} className="select-text rounded-theme bg-theme-surface px-5 py-6 shadow-card tablet:px-8 tablet:py-7">
    <h2 className="m-0 break-keep  text-2xl leading-tight text-theme-text-primary">{content.title}</h2>

    <div className="mt-4 flex flex-col gap-3 text-base leading-[1.8] text-theme-text-secondary">
      {content.paragraphs?.map((paragraph) => (
        <p key={paragraph} className="m-0 select-text break-keep">{paragraph}</p>
      ))}

      {content.closing?.map((paragraph) => (
        <p key={paragraph} className="m-0 select-text break-keep">{paragraph}</p>
      ))}

      {content.subsections?.map((subsection) => (
        <div key={subsection.title} className="mt-2 flex flex-col gap-2 rounded-theme bg-theme-bg px-6 py-6">
          {subsection?.title?.length > 0 && <h3 className="break-keep text-lg font-bold text-theme-text-primary">{subsection.title}</h3>}
          <ul className="flex list-disc flex-col gap-2 pl-5">
            {subsection.list?.map((item) => (
              <li key={item} className="select-text break-keep pl-1">{item}</li>
            ))}
          </ul>
          {subsection.closing?.map((paragraph) => (
            <p key={paragraph} className="select-text break-keep">{paragraph}</p>
          ))}
        </div>
      ))}
    </div>
  </section>
}

export default Section;
