import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Card from './Card';

import { ICardProps } from './Card';

interface IShopSectionProps<T extends ICardProps> {
  title: string;
  itemList: T[];
  onPressSeeAll?: () => void;
}

export default function ShopSection<T extends ICardProps>(props: IShopSectionProps<T>) {
  const { title, itemList, onPressSeeAll } = props;

  return (
    <View>
      <Row>
        <Title>{title}</Title>
        <SeeAll onPress={onPressSeeAll}>See all</SeeAll>
      </Row>
      <FlashList
        data={itemList}
        renderItem={({ item, index }) => {
          return <Card key={index} {...item} />;
        }}
      />
    </View>
  );
}

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.bold};
  font-size: ${({ theme }) => theme.fonts.size.xxl};
  color: ${({ theme }) => theme.colors.opposite_primary};
`;

const SeeAll = styled.TouchableOpacity`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.l};
  color: ${({ theme }) => theme.colors.tertiary};
`;
