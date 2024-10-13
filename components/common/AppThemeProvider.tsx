import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { useAppSelector } from '@/store/hook';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

interface AppThemeProviderProps {
  children: React.ReactNode;
}

const AppThemeProvider = (props: AppThemeProviderProps) => {
  const { children } = props;
  const theme = useAppSelector((state) => state.theme) as 'light' | 'dark';

  return <ThemeProvider theme={{ colors: Colors[theme], fonts: Fonts }}>{children}</ThemeProvider>;
};

export default AppThemeProvider;
