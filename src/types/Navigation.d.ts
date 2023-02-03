import { StackScreenProps } from '@react-navigation/stack';

export type MainNavigationParam = {
  Launch: undefined;
  Home: undefined;
  Crop: undefined;
};

export type MainNavigationScreenParam<
  T extends keyof MainNavigationScreenParam
> = StackScreenProps<MainNavigationParam, T>;

export type MainNavigationScreenNavigation<
  T extends keyof MainNavigationScreenParam
> = MainNavigationScreenParam<T>['navigation'];
