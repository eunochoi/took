import DiaryFormTextarea from './DiaryFormTextarea';

interface DiaryFormTextSectionProps {
  text: string;
  setText: (value: string) => void;
}

const DiaryFormTextSection = ({ text, setText }: DiaryFormTextSectionProps) => (
  <section aria-labelledby="diary-text-title" className="flex w-full flex-col gap-3 pt-5">
    <h2 id="diary-text-title" className="font-title text-base font-semibold text-theme-text-primary">오늘의 이야기</h2>
    <DiaryFormTextarea text={text} setText={setText} />
  </section>
);

export default DiaryFormTextSection;
