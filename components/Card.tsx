import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import styled from 'styled-components/native';

export interface ICardProps {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
  onAddToCart?: () => void;
}

export default function Card(props: ICardProps) {
  const { id, image, title, description, price, onAddToCart } = props;

  return (
    <Container>
      <Navigator onPress={() => router.push({ pathname: '/product/[id]', params: { id } })}>
        <StyledImage source={{ uri: image }} />
        <Content>
          <Title numberOfLines={1}>{title}</Title>
          <Description numberOfLines={1}>{description}</Description>
        </Content>
      </Navigator>
      <Footer>
        <Price>${price}</Price>
        <AddToCart onPress={onAddToCart}>
          <Ionicons name="add-outline" size={24} />
        </AddToCart>
      </Footer>
    </Container>
  );
}

const Container = styled.View`
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 10px;
  padding: 12px;
  display: flex;
  gap: 24px;
  align-items: center;
  width: 170px;
  height: 240px;
`;

const Navigator = styled.TouchableOpacity`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const StyledImage = styled.Image`
  width: 80px;
  height: 60px;
  margin-top: 16px;
`;

const Content = styled.View`
  display: flex;
  gap: 4px;
  align-items: flex-start;
`;

const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.black};
  font-size: ${({ theme }) => theme.fonts.size.xl};
  color: ${({ theme }) => theme.colors.opposite_primary};
`;

const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.md};
  color: ${({ theme }) => theme.colors.gray};
`;

const Footer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Price = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.black};
  font-size: ${({ theme }) => theme.fonts.size.xxl};
  color: ${({ theme }) => theme.colors.opposite_primary};
`;

const AddToCart = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.tertiary};
  padding: 8px;
  border-radius: 12px;
`;
