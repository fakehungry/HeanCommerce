import { data } from '@/constants/CarouselData';
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
import CarouselItem from './CarouselItem';
import Pagination from './Pagination';

// TODO: Implement Carousel component with props
export default function Carousel() {
  const scrollX = useSharedValue(0);
  const offset = useSharedValue(0);

  const [paginationIndex, setPaginationIndex] = useState(0);
  const [items, setItems] = useState(data);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const interval = useRef<NodeJS.Timeout | null>(null);

  const width = 360;

  const ref = useAnimatedRef<Animated.FlatList<(typeof data)[0]>>();

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
    <Container>
      <List
        data={items}
        ref={ref}
        renderItem={(i) => {
          const { item, index } = { item: i.item as (typeof data)[0], index: i.index };
          return <CarouselItem item={item} index={index} scrollX={scrollX} />;
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={handlerScroll}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        onEndReached={() => setItems([...items, ...data])}
        scrollEventThrottle={16}
        onScrollBeginDrag={() => setIsAutoPlay(false)}
        onScrollEndDrag={() => setIsAutoPlay(true)}
      />
      <Pagination items={data} paginationIndex={paginationIndex} scrollX={scrollX} />
    </Container>
  );
}

const Container = styled.View`
  width: 360px;
  height: 120px;
  align-items: center;
`;

const List = styled(Animated.FlatList)`
  width: 360px;
  height: 120px;
`;

const Image = styled.Image`
  width: 200px;
  height: 200px;
`;

const Title = styled.Text`
  font-size: ${({ theme }) => theme.fonts.size.xxl};
  color: ${({ theme }) => theme.colors.opposite_primary};
`;

const Body = styled.Text`
  font-size: ${({ theme }) => theme.fonts.size.l};
  color: ${({ theme }) => theme.colors.opposite_primary};
`;
