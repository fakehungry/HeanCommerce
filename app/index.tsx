import { toggleTheme } from '@/features/theme/theme.slice';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { Pressable } from 'react-native';
import styled from 'styled-components/native';

export default function Index() {
  const theme = useAppSelector((state) => state.theme) as 'light' | 'dark';
  const dispatch = useAppDispatch();

  return (
    <Container>
      <Pressable onPress={() => dispatch(toggleTheme())}>
        <StyledText>Toggle Theme</StyledText>
      </Pressable>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.primary};
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text`
  font-family: 'Lato-Regular';
  font-size: 20px;
  color: ${({ theme }) => theme.opposite_primary};
`;
