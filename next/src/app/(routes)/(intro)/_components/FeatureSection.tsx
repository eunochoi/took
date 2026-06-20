import Image from 'next/image';
import styled from 'styled-components';

import Carousel from '@/common/components/ui/Carousel';

interface FeatureSectionProps {
  $bg: 'white' | 'blue' | 'lightBlue';
  tag: string;
  headings: string[];
  captions: string[];
  images: string[];
  showIndicator?: boolean;
}

const FeatureSection = ({
  $bg,
  tag,
  headings,
  captions,
  images,
  showIndicator = true,
}: FeatureSectionProps) => {
  return (
    <Section $bg={$bg}>
      <Tag>{tag}</Tag>
      <Heading>
        {headings.map((text, i) => (
          <span key={i}>{text}</span>
        ))}
      </Heading>

      <MediaContainer>
        <Carousel objectFit="contain" showIndicator={showIndicator}>
          {images.map((src, i) => (
            <Image key={`media-${i}`} src={src} alt={tag} width={600} height={600} priority />
          ))}
        </Carousel>
      </MediaContainer>

      <CaptionGroup>
        {captions.map((text, i) => (
          <Caption key={i}>{text}</Caption>
        ))}
      </CaptionGroup>
    </Section>
  );
};

export default FeatureSection;


const Section = styled.section<{ $bg?: 'white' | 'blue' | 'lightBlue' }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 56px 0;
  
  background-color: ${({ $bg }) => {
    if ($bg === 'white') return 'white';
    if ($bg === 'lightBlue') return '#f3f7fc';
    if ($bg === 'blue') return '#cbd9ea';
    return 'white';
  }};

  > * {
    margin: 24px 0;
  }

  @media (min-width: 480px) and (max-width: 1024px) {
    padding: 64px 0;
    > * {
      margin: 28px 0;
    }
  }

  @media (min-width: 1025px) {
    padding: 80px 0;
    > * {
      margin: 32px 0;
    }
  }
`;

const Tag = styled.span`
  color: #8CADE2;
  font-size: 20px;
  font-weight: 500;
  text-transform: capitalize;

  @media (min-width: 480px) and (max-width: 1024px) {
    font-size: 22px;
  }

  @media (min-width: 1025px) {
    font-size: 28px;
  }
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  span {
    font-size: 20px;
    color: rgb(var(--greyTitle));
    line-height: 1.4;

    @media (min-width: 480px) and (max-width: 1024px) {
      font-size: 24px;
    }

    @media (min-width: 1025px) {
      font-size: 28px;
      color: #5f5f5f;
      white-space: nowrap;
    }
  }
`;

const CaptionGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const Caption = styled.span`
  color: grey;
  font-size: 16px;
  text-align: center;

  @media (min-width: 480px) and (max-width: 1024px) {
    font-size: 18px;
  }

  @media (min-width: 1025px) {
    font-size: 20px;
  }
`;

const MediaContainer = styled.div`
  height: 65dvh;
  width: 100%;
`;
