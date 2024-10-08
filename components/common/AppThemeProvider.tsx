import { Colors } from '@/constants/Colors';
import { useAppSelector } from '@/store/hook';
import { ThemeProvider } from 'styled-components/native';

interface AppThemeProviderProps {
  children: React.ReactNode;
}

const AppThemeProvider = (props: AppThemeProviderProps) => {
  const { children } = props;
  const theme = useAppSelector((state) => state.theme) as 'light' | 'dark';

  return <ThemeProvider theme={Colors[theme]}>{children}</ThemeProvider>;
};

export default AppThemeProvider;
