import React from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import styled from 'styled-components/native';

interface IPaginationProps {
  len: number;
  paginationIndex: number;
  scrollX: SharedValue<number>;
}

export default function Pagination(props: IPaginationProps) {
  const { len, paginationIndex, scrollX } = props;
  const width = 360;
  const round = width * len;

  return (
    <Container>
      {Array.from({ length: len }).map((_, index) => {
        const pgAnimatedStyle = useAnimatedStyle(() => {
          const dotWidth = interpolate(
            scrollX.value - 20 / round > 1 ? scrollX.value % round : scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [8, 20, 8],
            Extrapolation.CLAMP
          );
          return {
            width: dotWidth,
          };
        });

        return <Dot key={index} active={paginationIndex === index} style={pgAnimatedStyle} />;
      })}
    </Container>
  );
}

const Container = styled.View`
  position: absolute;
  bottom: 10px;
  flex-direction: row;
`;

const Dot = styled(Animated.View)<{ active?: boolean }>`
  height: 8px;
  border-radius: 4px;
  margin: 0 4px;
  background-color: ${({ active, theme }) => (active ? theme.colors.tertiary : theme.colors.gray)};
`;
