import Carousel from '@/components/Carousel';
import React from 'react';
import { Platform, StatusBar } from 'react-native';
import styled from 'styled-components/native';

export default function Shop() {
  return (
    <Container>
      <Logo source={require('@/assets/images/logo.png')} />
      {/* TODO: Implement after login feature */}
      <User>Welcome! Chaikit</User>
      {/* TODO: Implement search bar */}
      <StyledSearchBar placeholder="Search Store" />
      <Carousel />
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  padding-top: ${Platform.OS === 'android' ? StatusBar.currentHeight : 0};
  display: flex;
  gap: 20px;
`;

const Logo = styled.Image`
  width: 60px;
  height: 60px;
  margin-top: 20px;
`;

const User = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.xxxl};
  color: ${({ theme }) => theme.colors.opposite_primary};
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
`;
