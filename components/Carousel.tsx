import React, { useEffect, useRef, useState } from 'react';
import { ViewToken } from 'react-native';
import Animated, {
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import styled from 'styled-components/native';
import Pagination from './Pagination';

export interface ICarouselProps<T> {
  data: T[];
  renderItem: ({ item, index }: { item: T; index: number }) => React.ReactNode;
  width?: number;
  height?: number;
  autoplay?: boolean;
}

export default function Carousel<T>(props: ICarouselProps<T>) {
  const { data, width = 360, height = 120, renderItem, autoplay = true } = props;

  const scrollX = useSharedValue(0);
  const offset = useSharedValue(0);

  const [paginationIndex, setPaginationIndex] = useState(0);
  const [items, setItems] = useState(data);
  const [isAutoPlay, setIsAutoPlay] = useState(autoplay);
  const interval = useRef<NodeJS.Timeout | null>(null);

  const ref = useAnimatedRef<Animated.FlatList<T>>();

  // Set viewabilityConfigCallbackPairs
  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setPaginationIndex(viewableItems[0].index ? viewableItems[0].index % data.length : 0);
    }
  };
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };
  const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }]);

  const handlerScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
    onMomentumEnd: (e) => {
      offset.value = e.contentOffset.x;
    },
  });

  useEffect(() => {
    if (isAutoPlay) {
      interval.current = setInterval(() => {
        offset.value = offset.value + width;
      }, 5000);
    } else {
      clearInterval(interval.current as NodeJS.Timeout);
    }

    return () => clearInterval(interval.current as NodeJS.Timeout);
  }, [isAutoPlay, offset, width]);

  useDerivedValue(() => {
    scrollTo(ref, offset.value, 0, true);
  });

  return (
    <Container width={width} height={height}>
      <List
        data={items}
        ref={ref}
        renderItem={({ item, index }) => {
          return <>{renderItem({ item: item as T, index })}</>;
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={handlerScroll}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        onEndReached={() => setItems([...items, ...data])}
        scrollEventThrottle={16}
        onScrollBeginDrag={() => autoplay && setIsAutoPlay(false)}
        onScrollEndDrag={() => autoplay && setIsAutoPlay(true)}
        width={width}
        height={height}
      />
      <Pagination len={data.length} paginationIndex={paginationIndex} scrollX={scrollX} />
    </Container>
  );
}

const Container = styled.View<{ width?: number; height?: number }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  align-items: center;
  align-self: center;
`;

const List = styled(Animated.FlatList)<{ width?: number; height?: number }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;
