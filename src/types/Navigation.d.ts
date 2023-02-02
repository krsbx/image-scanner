import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type MainNavigationParam = {
  Home: undefined;
};

export type MainNavigationScreenParam<
  T extends keyof MainNavigationScreenParam
> = NativeStackScreenProps<MainNavigationParam, T>;
