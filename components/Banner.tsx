import React from 'react';
import { ImageSourcePropType } from 'react-native';
import styled from 'styled-components/native';

interface IBannerProps {
  source: ImageSourcePropType;
  width?: number;
  height?: number;
}

export default function Banner(props: IBannerProps) {
  const { source, width = 360, height = 120 } = props;

  return <Image source={source} width={width} height={height} />;
}

const Image = styled.Image<{ width: number; height: number }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  border-radius: 10px;
`;
