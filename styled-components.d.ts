import 'styled-components/native';
import { Colors } from './constants/Colors';

declare module 'styled-components/native' {
  type Theme = typeof Colors.dark;
  export interface DefaultTheme extends Theme {}
}
