import { FlashList } from '@shopify/flash-list';
import React from 'react';
import styled from 'styled-components/native';
import Card from './Card';

import { ICardProps } from './Card';

interface IShopSectionProps {
  title: string;
  itemList: ICardProps[];
  loading?: boolean;
  onPressSeeAll?: () => void;
}

export default function ShopSection(props: IShopSectionProps) {
  const { title, itemList, loading, onPressSeeAll } = props;

  return (
    <Container>
      <Row>
        <Title>{title}</Title>
        <SeeAll onPress={onPressSeeAll}>See all</SeeAll>
      </Row>
      {loading ? (
        <Loading />
      ) : (
        <FlashListContainer>
          <FlashList
            data={itemList}
            renderItem={({ item }) => {
              return (
                <Card
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  description={item.description}
                  image={item.image}
                  onAddToCart={() => alert('Add to cart')}
                />
              );
            }}
            horizontal
            estimatedItemSize={250}
            ItemSeparatorComponent={() => <Gap />}
            showsHorizontalScrollIndicator={false}
          />
        </FlashListContainer>
      )}
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

const Gap = styled.View`
  width: 16px;
`;

const Loading = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.colors.tertiary,
  size: 'large',
}))`
  height: 240px;
`;

const FlashListContainer = styled.View`
  flex: 1;
  width: 100%;
`;
