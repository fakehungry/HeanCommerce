import React from 'react';
import { ViewStyle } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import styled from 'styled-components/native';

export interface IAcordeonItemProps {
  children: React.ReactNode;
  isExpanded: SharedValue<boolean>;
  style?: ViewStyle;
  duration?: number;
}

export default function AccordionItem(props: IAcordeonItemProps) {
  const { children, isExpanded, duration = 500, style } = props;
  const height = useSharedValue(0);

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(isExpanded.value), {
      duration,
    })
  );
  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }));

  return (
    <Container style={[bodyStyle, style]}>
      <Content
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
        }}
      >
        {children}
      </Content>
    </Container>
  );
}

const Container = styled(Animated.View)`
  width: 100%;
  overflow: hidden;
`;

const Content = styled.View`
  width: 100%;
  position: absolute;
  align-items: center;
`;
