import Card from '@/components/Card';
import { getProductsByCategory } from '@/features/product/product.slice';
import { Product } from '@/features/product/product.type';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { router, useLocalSearchParams } from 'expo-router';
import { capitalize } from 'lodash';
import React, { useEffect } from 'react';
import { Platform, View } from 'react-native';
import styled from 'styled-components/native';

export default function CategoryTitle() {
  const { title } = useLocalSearchParams();

  const dispatch = useAppDispatch();
  const { data: products, loading } = useAppSelector(
    (state) => state.product.getProductsByCategory
  );

  useEffect(() => {
    dispatch(getProductsByCategory({ category: title as string }));
  }, []);

  return (
    <Container>
      <Header>
        <BackButton name="chevron-back-outline" size={24} onPress={() => router.back()} />
        <HeaderTitle>{capitalize(title as string)}</HeaderTitle>
        <View />
      </Header>
      {loading ? (
        <Loading />
      ) : (
        <FlashListContainer>
          <FlashList
            data={products}
            renderItem={({ item }) => {
              const product = item as Product;
              return (
                <Card
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  description={product.description}
                  image={product.image}
                />
              );
            }}
            estimatedItemSize={250}
            ItemSeparatorComponent={() => <Gap />}
            numColumns={2}
          />
        </FlashListContainer>
      )}
    </Container>
  );
}

const Container = styled.SafeAreaView`
  background-color: ${(props) => props.theme.colors.primary};
  flex: 1;
  padding-top: ${Platform.OS === 'android' ? '48px' : 0};
`;

const Header = styled.View`
  padding: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const BackButton = styled(Ionicons).attrs(({ theme }) => ({
  color: theme.colors.opposite_primary,
}))``;

const HeaderTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.black};
  font-size: ${({ theme }) => theme.fonts.size.xxxl};
  color: ${({ theme }) => theme.colors.opposite_primary};
  align-self: center;
`;

const Loading = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.colors.tertiary,
  size: 'large',
}))`
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const FlashListContainer = styled.View`
  flex: 1;
  margin: 20px 20px 30px;
`;

const Gap = styled.View`
  height: 16px;
  width: 16px;
`;
