import { data } from '@/constants/CarouselData';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import styled from 'styled-components/native';

export interface ICarouselItemProps {
  item: (typeof data)[0];
  index: number;
  scrollX: SharedValue<number>;
}

export default function CarouselItem(props: ICarouselItemProps) {
  const { item, index, scrollX } = props;
  const { title, body, imgUrl } = item;
  const { width } = useWindowDimensions();

  const rnAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0, 0, 0],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <Container style={[rnAnimatedStyle]}>
      <Image source={{ uri: imgUrl }} />
      <Overlay>
        <Title>{title}</Title>
        <Body>{body}</Body>
      </Overlay>
    </Container>
  );
}

const Container = styled(Animated.View)`
  width: 360px;
  height: 120px;
`;

const Image = styled.Image`
  width: 360px;
  height: 120px;
  border-radius: 10px;
`;

const Overlay = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
`;

const Title = styled.Text`
  font-size: ${({ theme }) => theme.fonts.size.xl};
  font-family: ${({ theme }) => theme.fonts.family.black};
  color: ${({ theme }) => theme.colors.opposite_primary};
`;

const Body = styled.Text`
  font-size: ${({ theme }) => theme.fonts.size.md};
  font-family: ${({ theme }) => theme.fonts.family.regular};
  color: ${({ theme }) => theme.colors.opposite_primary};
`;
