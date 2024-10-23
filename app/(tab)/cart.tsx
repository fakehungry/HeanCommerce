import CartItem from '@/components/CartItem';
import { getAsyncStorage, setAsyncStorage } from '@/features/async-storage';
import { AsyncStorageKeys } from '@/features/async-storage/async-storage.type';
import { getMultipleProductsDetails } from '@/features/product/product.slice';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

// TODO: Implement cart with our API. It's not good to store cart in AsyncStorage.
export default function Cart() {
  const dispatch = useAppDispatch();
  const { data: products, loading } = useAppSelector(
    (state) => state.product.getMultipleProductsDetails
  );

  useEffect(() => {
    (async () => {
      await fetchCart();
    })();
  }, []);

  const fetchCart = async () => {
    const res = await getAsyncStorage(AsyncStorageKeys.CART);

    if (res) {
      await dispatch(
        getMultipleProductsDetails({
          carts: res,
        })
      );
    }
  };

  return (
    <Container>
      <HeaderTitle>Cart</HeaderTitle>
      {loading ? (
        <Loading />
      ) : products?.length > 0 ? (
        products?.map((item) => (
          <CartItem
            id={item.id}
            key={item.id}
            title={item.title}
            image={item.image}
            amount={item.amount as string}
            price={item.price}
            onRemove={async () => {
              await setAsyncStorage(
                AsyncStorageKeys.CART,
                products.filter((product) => product.id !== item.id)
              );
              await fetchCart();
            }}
            onIncrease={async () => {
              const newProducts = products.map((product) => {
                if (product.id === item.id) {
                  return { ...product, amount: String(Number(product.amount) + 1) };
                }
                return product;
              });

              await setAsyncStorage(AsyncStorageKeys.CART, newProducts);
              await fetchCart();
            }}
            onDecrease={async () => {
              const newProducts = products.map((product) => {
                if (product.id === item.id) {
                  return { ...product, amount: String(Number(product.amount) - 1) };
                }
                return product;
              });

              await setAsyncStorage(AsyncStorageKeys.CART, newProducts);
              await fetchCart();
            }}
          />
        ))
      ) : (
        <NoItemInCart>Cart is empty</NoItemInCart>
      )}
    </Container>
  );
}

const Container = styled.SafeAreaView`
  background-color: ${(props) => props.theme.colors.primary};
  flex: 1;
  padding: ${Platform.OS === 'android' ? '48px 20px 30px' : '0 20px 30px'};
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

const NoItemInCart = styled.Text`
  font-family: ${(props) => props.theme.fonts.family.bold};
  font-size: ${(props) => props.theme.fonts.size.l};
  color: ${(props) => props.theme.colors.opposite_secondary};
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-top: 200px;
`;
