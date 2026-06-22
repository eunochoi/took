import { ChangeEvent, RefObject, useCallback, useRef } from "react";


interface Props {
  text: string;
  setText: (v: string) => void;
  contentsRef: RefObject<HTMLElement>;
}

const DiaryInputTextArea = ({ text, setText, contentsRef }: Props) => {

  const inputRef = useRef<HTMLDivElement>(null);

  const onChangeText = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }, [setText]);
  const scroll = () => {
    setTimeout(() => {
      contentsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 200);
  };

  return (<div className="h-full w-full [&>textarea]:h-full [&>textarea]:w-full [&>textarea]:resize-none [&>textarea]:border-none [&>textarea]:text-app [&>textarea]:outline-none [&>textarea::placeholder]:pt-[70px] [&>textarea::placeholder]:text-center [&>textarea::placeholder]:text-gray-500" ref={inputRef} >
    <textarea
      onFocus={scroll}
      onClick={scroll}
      onChange={onChangeText}

      value={text}
      placeholder="일상의 작은 감정들을 기록하세요." />
  </div>
  );
};

export default DiaryInputTextArea;
