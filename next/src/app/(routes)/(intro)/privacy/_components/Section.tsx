import { INTRO_CARD_SHADOW, INTRO_THEME_BG } from "../../_constants/theme";
import { PrivacyContent } from "../_constants";

const Section = ({ content }: { content: PrivacyContent }) => {
  return <section key={content.title} className="select-text rounded-2xl bg-white px-5 py-6 sm:px-8 sm:py-7" style={{ boxShadow: INTRO_CARD_SHADOW }}>
    <h2 className="m-0 break-keep font-bmjua text-2xl leading-tight text-grey-title sm:text-[28px]">{content.title}</h2>

    <div className="mt-4 flex flex-col gap-3 text-base leading-[1.8] text-[rgba(var(--greyTitle),0.78)] sm:text-[17px]">
      {content.paragraphs?.map((paragraph) => (
        <p key={paragraph} className="m-0 select-text break-keep">{paragraph}</p>
      ))}

      {content.closing?.map((paragraph) => (
        <p key={paragraph} className="m-0 select-text break-keep">{paragraph}</p>
      ))}

      {content.subsections?.map((subsection) => (
        <div key={subsection.title} className="flex flex-col mt-2 rounded-2xl px-6 py-6 gap-2" style={{ backgroundColor: INTRO_THEME_BG }}>
          {subsection?.title?.length > 0 && <h3 className="break-keep text-lg font-bold text-grey-title">{subsection.title}</h3>}
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