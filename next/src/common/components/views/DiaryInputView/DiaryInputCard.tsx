'use client'

import { ReactNode } from "react";
import styled from "styled-components";

interface DiaryInputCardProps {
  children: ReactNode;
}

export const DiaryInputCard = ({ children }: DiaryInputCardProps) => {
  return <Card>{children}</Card>;
}

const Card = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  width: 100%;
  flex-shrink: 0;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: stretch;
`;
