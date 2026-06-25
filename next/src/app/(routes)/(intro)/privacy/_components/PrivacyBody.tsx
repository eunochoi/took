import { PRIVACY_CONTENTS } from "../_constants";
import Section from "./Section";

const PrivacyBody = () => {
  return <div className="mt-5 flex flex-col gap-4 sm:mt-6">
    {PRIVACY_CONTENTS.map((content) => (
      <Section key={content.title} content={content} />
    ))}
  </div>
}

export default PrivacyBody;