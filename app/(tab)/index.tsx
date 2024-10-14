import Banner from '@/components/Banner';
import Carousel from '@/components/Carousel';
import ShopSection from '@/components/ShopSection';
import { getAllProduct } from '@/features/product/product.slice';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import React, { useEffect, useMemo } from 'react';
import { ImageSourcePropType, Platform, StatusBar } from 'react-native';
import styled from 'styled-components/native';

export default function Shop() {
  // TODO: Replace with real data
  const images = [
    require('@/assets/images/banner-1.jpg'),
    require('@/assets/images/banner-2.jpg'),
    require('@/assets/images/banner-3.jpg'),
  ];

  const dispatch = useAppDispatch();
  const { data: products, loading } = useAppSelector((state) => state.product.getAllProducts);

  useEffect(() => {
    dispatch(getAllProduct());
  }, []);

  const productCategories = useMemo(() => {
    return {
      menClothing: products.filter(
        (product) => product.category.toLowerCase() === "men's clothing"
      ),
      womenClothing: products.filter(
        (product) => product.category.toLowerCase() === "women's clothing"
      ),
      jewelery: products.filter((product) => product.category.toLowerCase() === 'jewelery'),
      electronics: products.filter((product) => product.category.toLowerCase() === 'electronics'),
    };
  }, [products]);

  return (
    <Container>
      <ScrollView>
        <Logo source={require('@/assets/images/logo.png')} />
        {/* TODO: Implement after login feature */}
        <User>Welcome! Chaikit</User>
        {/* TODO: Implement search bar */}
        <StyledSearchBar placeholder="Search Store" />
        <Carousel
          data={images}
          renderItem={({ item, index }) => {
            return <Banner source={item as ImageSourcePropType} key={index} />;
          }}
        />
        <ShopSection
          // TODO: Implement see all screen
          onPressSeeAll={() => {}}
          title="Exclusive Offer"
          itemList={products.slice(0, 5)}
          loading={loading}
        />
        <ShopSection
          // TODO: Implement see all screen
          onPressSeeAll={() => {}}
          title="Jewelry"
          itemList={productCategories?.jewelery?.slice(0, 5) || []}
          loading={loading}
        />
        <ShopSection
          // TODO: Implement see all screen
          onPressSeeAll={() => {}}
          title="Electronics"
          itemList={productCategories?.electronics?.slice(0, 5) || []}
          loading={loading}
        />
      </ScrollView>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.colors.primary};
  padding-top: ${Platform.OS === 'android' ? StatusBar.currentHeight : 0};
`;

const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
    gap: 20,
    paddingBottom: 30,
  },
  horizontal: false,
}))``;

const Logo = styled.Image`
  width: 60px;
  height: 60px;
  margin-top: 20px;
  align-self: center;
`;

const User = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.xxxl};
  color: ${({ theme }) => theme.colors.opposite_primary};
  text-align: center;
`;

const StyledSearchBar = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.gray,
  selectionColor: theme.colors.tertiary,
}))`
  width: 364px;
  height: 56px;
  border-radius: 10px;
  padding: 0 20px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.opposite_secondary};
  align-self: center;
`;
