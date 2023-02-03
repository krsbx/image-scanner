import { StackScreenProps } from '@react-navigation/stack';

export type MainNavigationParam = {
  LaunchScreen: undefined;
  HomeScreen: undefined;
  CropScreen: undefined;
  CollectionScreen: undefined;
};

export type MainNavigationScreenParam<T extends keyof MainNavigationParam> =
  StackScreenProps<MainNavigationParam, T>;

export type MainNavigationScreenNavigation<
  T extends keyof MainNavigationParam
> = MainNavigationScreenParam<T>['navigation'];
