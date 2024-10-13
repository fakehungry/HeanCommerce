import 'styled-components/native';
import { Colors } from './constants/Colors';
import { Fonts } from './constants/Fonts';

declare module 'styled-components/native' {
  type Colors = typeof Colors.dark;
  type Fonts = typeof Fonts;
  type Theme = {
    colors: Colors;
    fonts: Fonts;
  };
  export interface DefaultTheme extends Theme {}
}
