import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setScanner } from '../store/actions/scanner';
import useAppState from './useAppState';
import usePrevious from './usePrevious';

const useCameraDisabler = () => {
  const appState = useAppState();
  const prevState = usePrevious(appState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (prevState === appState) return;

    setScanner({
      isOnScannerView: appState !== 'active',
    })(dispatch);
  }, [appState]);
};

export default useCameraDisabler;
