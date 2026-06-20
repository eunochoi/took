import { lightenColor } from "@/common/utils/lightenColor";
import styled from "styled-components";
import { StarRating } from '../../ui/StarRating';

const PRIORITY_LABELS = ['낮음', '보통', '높음'] as const;

interface Props {
  priority: number;
  setPriority: (n: number) => void;
}

export const HabitRating = ({ priority, setPriority }: Props) => {
  return (
    <Wrapper>
      {[0, 1, 2].map((i) => (
        <Option
          key={i}
          $selected={i === priority}
          onClick={() => setPriority(i)}
        >
          <input
            type="radio"
            checked={i === priority}
            name="priority"
            value={i}
            onChange={() => setPriority(i)}
          />
          <StarsWrap>
            <StarRating rating={i + 1} color={i === priority ? '#fff' : undefined} />
          </StarsWrap>
          <Label $selected={i === priority}>{PRIORITY_LABELS[i]}</Label>
        </Option>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`;

const Option = styled.label<{ $selected: boolean }>`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 8px;
  border-radius: 12px;
  background-color: ${(props) =>
    props.$selected
      ? (props.theme?.themeColor ?? '#979FC7')
      : (props.theme?.themeColor ? lightenColor(props.theme.themeColor, 70) : '#E8ECF5')};
  cursor: pointer;
  transition: background-color 0.2s;

  input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
`;

const StarsWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme?.fontSize ?? '15pt'};
`;

const Label = styled.span<{ $selected: boolean }>`
  font-size: 13px;
  font-weight: 500;
  color: ${(props) => (props.$selected ? '#fff' : 'rgb(var(--greyTitle))')};
`;
