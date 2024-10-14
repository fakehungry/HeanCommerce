import { FlashList } from '@shopify/flash-list';
import React from 'react';
import styled from 'styled-components/native';
import Card from './Card';

import { View } from 'react-native';
import { ICardProps } from './Card';

interface IShopSectionProps<T extends ICardProps> {
  title: string;
  itemList: T[];
  onPressSeeAll?: () => void;
}

export default function ShopSection<T extends ICardProps>(props: IShopSectionProps<T>) {
  const { title, itemList, onPressSeeAll } = props;

  return (
    <Container>
      <Row>
        <Title>{title}</Title>
        <SeeAll onPress={onPressSeeAll}>See all</SeeAll>
      </Row>
      <FlashList
        data={itemList}
        renderItem={({ item, index }) => {
          return (
            <Card
              key={index}
              title={item.title}
              price={item.price}
              description={item.description}
              image={item.image}
            />
          );
        }}
        horizontal
        estimatedItemSize={240}
        ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  margin: 0 16px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.bold};
  font-size: ${({ theme }) => theme.fonts.size.xxl};
  color: ${({ theme }) => theme.colors.opposite_primary};
`;

const SeeAll = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.l};
  color: ${({ theme }) => theme.colors.tertiary};
`;
