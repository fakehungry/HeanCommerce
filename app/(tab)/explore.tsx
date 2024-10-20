import { getAllCategories } from '@/features/product/product.slice';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { Href, router } from 'expo-router';
import { capitalize } from 'lodash';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

export default function Explore() {
  const dispatch = useAppDispatch();
  const { data: categories, loading } = useAppSelector((state) => state.product.getAllCategories);

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  return (
    <Container>
      <HeaderTitle>Find Products</HeaderTitle>
      {loading ? (
        <Loading />
      ) : (
        <CategoryContainer>
          {categories?.length >= 4 ? (
            <>
              <Category
                onPress={() =>
                  router.push(
                    `product/category/${categories[0]}` as Href<`product/category/${string}`>
                  )
                }
                style={{
                  backgroundColor: '#53B17570',
                  borderColor: '#53B175',
                  borderWidth: 1,
                }}
              >
                <CategoryTitle>{capitalize(categories[0])}</CategoryTitle>
                <CategoryImage
                  source={require('@/assets/images/explore-1.png')}
                  resizeMode="contain"
                />
              </Category>
              <Category
                onPress={() =>
                  router.push(
                    `product/category/${categories[1]}` as Href<`product/category/${string}`>
                  )
                }
                style={{
                  backgroundColor: '#F8A44C70',
                  borderColor: '#F8A44C',
                  borderWidth: 1,
                }}
              >
                <CategoryTitle>{capitalize(categories[1])}</CategoryTitle>
                <CategoryImage
                  source={require('@/assets/images/explore-2.png')}
                  resizeMode="contain"
                />
              </Category>
              <Category
                onPress={() =>
                  router.push(
                    `product/category/${categories[2]}` as Href<`product/category/${string}`>
                  )
                }
                style={{
                  backgroundColor: '#F7A59370',
                  borderColor: '#F7A593',
                  borderWidth: 1,
                }}
              >
                <CategoryTitle>{capitalize(categories[2])}</CategoryTitle>
                <CategoryImage
                  source={require('@/assets/images/explore-3.png')}
                  resizeMode="contain"
                />
              </Category>
              <Category
                onPress={() =>
                  router.push(
                    `product/category/${categories[3]}` as Href<`product/category/${string}`>
                  )
                }
                style={{
                  backgroundColor: '#B7DFF570',
                  borderColor: '#B7DFF5',
                  borderWidth: 1,
                }}
              >
                <CategoryTitle>{capitalize(categories[3])}</CategoryTitle>
                <CategoryImage
                  source={require('@/assets/images/explore-4.png')}
                  resizeMode="contain"
                />
              </Category>
            </>
          ) : null}
        </CategoryContainer>
      )}
    </Container>
  );
}

const Container = styled.SafeAreaView`
  background-color: ${(props) => props.theme.colors.primary};
  flex: 1;
  padding-top: ${Platform.OS === 'android' ? '48px' : 0};
`;

const HeaderTitle = styled.Text`
  font-family: ${(props) => props.theme.fonts.family.black};
  font-size: ${(props) => props.theme.fonts.size.xxxl};
  color: ${(props) => props.theme.colors.opposite_primary};
  text-align: center;
  margin-top: 20px;
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

const CategoryContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  padding: 0 16px;
  margin-top: 40px;
`;

const Category = styled.TouchableOpacity`
  width: 45%;
  height: 200px;
  border-radius: 10px;
`;

const CategoryTitle = styled.Text`
  font-family: ${(props) => props.theme.fonts.family.bold};
  font-size: ${(props) => props.theme.fonts.size.l};
  color: ${(props) => props.theme.colors.opposite_secondary};
  text-align: center;
  margin-top: 12px;
`;

const CategoryImage = styled.Image`
  width: 120px;
  height: 100px;
  align-self: center;
  margin-top: 16px;
`;
