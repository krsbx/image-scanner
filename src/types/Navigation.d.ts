import { StackScreenProps } from '@react-navigation/stack';
import { SCREEN_NAME } from '../utils/constant';

export type MainNavigationParam = {
  [SCREEN_NAME.LAUNCH]: undefined;
  [SCREEN_NAME.HOME]: undefined;
  [SCREEN_NAME.CROP]: {
    from?: ValueOf<typeof SCREEN_NAME>;
  };
  [SCREEN_NAME.COLLECTION]: undefined;
  [SCREEN_NAME.GRADING]: undefined;
};

export type MainNavigationScreenParam<T extends keyof MainNavigationParam> =
  StackScreenProps<MainNavigationParam, T>;

export type MainNavigationScreenNavigation<
  T extends keyof MainNavigationParam
> = MainNavigationScreenParam<T>['navigation'];

export type MainNavigationScreenRoute<T extends keyof MainNavigationParam> =
  MainNavigationScreenParam<T>['route'];
