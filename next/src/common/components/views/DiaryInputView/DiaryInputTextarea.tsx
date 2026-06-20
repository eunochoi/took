import { ChangeEvent, RefObject, useCallback, useRef } from "react";
import styled from "styled-components";


interface Props {
  text: string;
  setText: (v: string) => void;
  contentsRef: RefObject<HTMLElement>;
}

const DiaryInputTextArea = ({ text, setText, contentsRef }: Props) => {

  const inputRef = useRef<HTMLDivElement>(null);

  const onChangeText = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }, []);
  const scroll = () => {
    setTimeout(() => {
      contentsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 200);
  }

  return (<InputWrapper ref={inputRef} >
    <textarea
      onFocus={scroll}
      onClick={scroll}
      onChange={onChangeText}

      value={text}
      placeholder="일상의 작은 감정들을 기록하세요." />
  </InputWrapper>
  );
}

export default DiaryInputTextArea;

const InputWrapper = styled.div`
  width: 100%;
  height: 100%;

  textarea {
    font-size: ${(props) => props.theme.fontSize ?? '15pt'};
    width: 100%;
    height: 100%;
    resize: none;
    border: none;
    outline: none;

    &::placeholder {
      padding-top: 70px;
      text-align: center;
      color: grey;
    }
  }
`