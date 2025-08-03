import { Dimensions } from "react-native";

export const Colors = {
  black: '#000000',
  white: '#FFFFFF',
  green: '#28a745',
  blue: '#4a90e2',
  red: '#e74c3c',
};

export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 32,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
};

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
export const CARD_HEIGHT = SCREEN_HEIGHT / 3 - 32;
export const CARD_WIDTH = SCREEN_WIDTH * 0.92; // 92% of screen width