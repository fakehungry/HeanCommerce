import AccordionItem from '@/components/AccordionItem';
import { getProductDetails } from '@/features/product/product.slice';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import styled from 'styled-components/native';

export default function ProductDetails() {
  const { id } = useLocalSearchParams();

  const dispatch = useAppDispatch();
  const { data: product, loading } = useAppSelector((state) => state.product.getProductDetails);

  const [amount, setAmount] = useState('1');
  const openProductDetail = useSharedValue(false);

  const chevronRotate = useDerivedValue(() => {
    return withTiming(Number(openProductDetail.value), { duration: 300 });
  });

  const chevronStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${interpolate(chevronRotate.value, [0, 1], [0, 90])}deg` }],
    };
  });

  const isActive = useMemo(() => {
    return {
      minus: Number(amount) > 1,
      plus: Number(amount) < 999,
    };
  }, [amount]);

  useEffect(() => {
    dispatch(getProductDetails({ id: Number(id) }));
  }, []);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header>
            <Row>
              <BackButton name="chevron-back-outline" size={24} onPress={() => router.back()} />
            </Row>
            <Image source={{ uri: product?.image }} />
          </Header>
          <ScrollView>
            <Title>{product?.title}</Title>
            <Row isBorderBottom>
              <AdjustmentContainer>
                <MinusButton
                  name="remove-outline"
                  size={24}
                  isActive={isActive.minus}
                  onPress={() => isActive.minus && setAmount(String(Number(amount) - 1))}
                />
                <Amount
                  value={amount}
                  onChangeText={(v) => setAmount(v)}
                  onBlur={() => Number(amount) < 1 && setAmount('1')}
                />
                <PlusButton
                  name="add-outline"
                  size={24}
                  isActive={isActive.plus}
                  onPress={() => isActive.plus && setAmount(String(Number(amount) + 1))}
                />
              </AdjustmentContainer>
              <Price>${product?.price}</Price>
            </Row>
            <Column>
              <Row>
                <Product>Product Detail</Product>
                <AccordingIconContainer style={[chevronStyle]}>
                  <AccordionIcon
                    name="chevron-forward-outline"
                    size={24}
                    onPress={() => (openProductDetail.value = !openProductDetail.value)}
                  />
                </AccordingIconContainer>
              </Row>
              <AccordionItem duration={300} isExpanded={openProductDetail}>
                <Description>{product?.description}</Description>
              </AccordionItem>
            </Column>
          </ScrollView>
          <Footer>
            {/* TODO: Implement add to cart feature */}
            <Button>
              <TextButton>Add to Cart</TextButton>
            </Button>
          </Footer>
        </>
      )}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary};
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

const Header = styled.View`
  width: 100%;
  height: 360px;
  background-color: ${({ theme }) => theme.colors.gray};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 48px 16px 16px;
`;

const Row = styled.View<{ isBorderBottom?: boolean }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: ${({ isBorderBottom }) => (isBorderBottom ? 24 : 0)}px;
  border-bottom-width: ${({ isBorderBottom }) => (isBorderBottom ? 1 : 0)}px;
  border-bottom-color: ${({ theme }) => theme.colors.primary_light};
`;

const BackButton = styled(Ionicons).attrs(({ theme }) => ({
  color: theme.colors.opposite_primary,
}))``;

const Image = styled.Image`
  width: 320px;
  height: 200px;
  border-radius: 10px;
  align-self: center;
  margin-top: 24px;
`;

const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
    gap: 16,
    padding: 16,
  },
  horizontal: false,
  showsVerticalScrollIndicator: false,
}))``;

const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.bold};
  font-size: ${({ theme }) => theme.fonts.size.xxl};
  color: ${({ theme }) => theme.colors.opposite_primary};
  margin-bottom: 8px;
`;

const AdjustmentContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

const Amount = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.gray,
  selectionColor: theme.colors.tertiary,
  keyboardType: 'numeric',
  maxLength: 3,
}))`
  width: 56px;
  height: 56px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  color: ${({ theme }) => theme.colors.opposite_primary};
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.xl};
`;

const MinusButton = styled(Ionicons).attrs<{ isActive?: boolean }>(({ theme, isActive }) => ({
  color: isActive ? theme.colors.tertiary : theme.colors.gray,
}))``;

const PlusButton = styled(Ionicons).attrs<{ isActive?: boolean }>(({ theme, isActive }) => ({
  color: isActive ? theme.colors.tertiary : theme.colors.gray,
}))``;

const Price = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.bold};
  font-size: ${({ theme }) => theme.fonts.size.xxl};
  color: ${({ theme }) => theme.colors.opposite_primary};
`;

const Column = styled.View`
  gap: 8px;
  padding-bottom: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.primary_light};
`;

const Product = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.l};
  color: ${({ theme }) => theme.colors.opposite_primary};
`;

const AccordingIconContainer = styled(Animated.View)``;

const AccordionIcon = styled(Ionicons).attrs(({ theme }) => ({
  color: theme.colors.opposite_primary,
}))``;

const Description = styled(Animated.Text)`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.md};
  color: ${({ theme }) => theme.colors.opposite_primary};
  overflow: hidden;
  width: 100%;
`;

const Footer = styled.View`
  position: fixed;
  bottom: 16px;
  width: 100%;
  padding: 24px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const Button = styled.TouchableOpacity`
  width: 100%;
  height: 56px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.tertiary};
  justify-content: center;
  align-items: center;
`;

const TextButton = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.bold};
  font-size: ${({ theme }) => theme.fonts.size.l};
  color: ${({ theme }) => theme.colors.primary};
`;
