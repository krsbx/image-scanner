import { useState } from 'react';
import { AppState } from 'react-native';
import useEffectOnce from './useEffectOnce';

const useAppState = () => {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffectOnce(() => {
    const appStateListener = AppState.addEventListener(
      'change',
      (nextAppState) => setAppState(nextAppState)
    );

    return () => appStateListener?.remove?.();
  });

  return appState;
};

export default useAppState;
