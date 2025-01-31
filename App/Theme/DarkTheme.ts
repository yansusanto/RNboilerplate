import ThemeColor from '@Theme/Colors';
import LightTheme from '@Theme/LightTheme';

const DarkTheme = {
  ...LightTheme,
  type: 'dark',
  keyboardAppearance: 'dark',
  themeColor: ThemeColor.lightGray6,
  background: ThemeColor.black,
  shadowColor: ThemeColor.gray2,
  card: ThemeColor.gray5,
  text: ThemeColor.white,
  lightText: ThemeColor.lightGray,
  border: ThemeColor.gray4,
  tint: ThemeColor.black,
  tab: ThemeColor.gray5,
  statusBar: 'light-content',
};

export default DarkTheme;
