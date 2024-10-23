import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import styled from 'styled-components/native';

export interface ICartItemProps {
  id: number;
  title: string;
  image: string;
  amount: string;
  price: number;
  onRemove?: (id: number) => void;
  onIncrease?: (id: number, amount: string) => void;
  onDecrease?: (id: number, amount: string) => void;
}

export default function CartItem(props: ICartItemProps) {
  const { id, title, image, amount, price, onRemove, onIncrease, onDecrease } = props;
  return (
    <Container>
      <Image source={{ uri: image }} />
      <Row>
        <ColumnTitle>
          <Title numberOfLines={2}>{title}</Title>
          <RowAdjustment>
            <MinusButton onPress={() => onDecrease?.(id, amount)} name="remove-outline" size={30} />
            <Amount>{amount}</Amount>
            <PlusButton onPress={() => onIncrease?.(id, amount)} name="add-outline" size={30} />
          </RowAdjustment>
        </ColumnTitle>
        <ColumnPrice>
          <RemoveButton name="close-outline" size={30} onPress={() => onRemove?.(id)} />
          <Price>${price}</Price>
        </ColumnPrice>
      </Row>
    </Container>
  );
}

const Container = styled.View`
  padding: 20px;
  flex-direction: row;
  gap: 30px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.primary_light};
  align-items: center;
`;

const Image = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 20px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

const RowAdjustment = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const ColumnTitle = styled.View`
  justify-content: space-between;
  height: 90px;
  width: 60%;
`;

const ColumnPrice = styled.View`
  justify-content: space-between;
  align-items: flex-end;
  height: 90px;
`;

const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.l};
  color: ${({ theme }) => theme.colors.opposite_primary};
`;

const Amount = styled.Text`
  color: ${({ theme }) => theme.colors.opposite_primary};
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.xl};
`;

const MinusButton = styled(Ionicons).attrs<{ isActive?: boolean }>(({ theme, isActive }) => ({
  color: isActive ? theme.colors.tertiary : theme.colors.gray,
}))``;

const PlusButton = styled(Ionicons).attrs<{ isActive?: boolean }>(({ theme, isActive }) => ({
  color: isActive ? theme.colors.tertiary : theme.colors.gray,
}))``;

const RemoveButton = styled(Ionicons).attrs(({ theme }) => ({
  color: theme.colors.gray,
}))``;

const Price = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.bold};
  font-size: ${({ theme }) => theme.fonts.size.xl};
  color: ${({ theme }) => theme.colors.opposite_primary};
`;
