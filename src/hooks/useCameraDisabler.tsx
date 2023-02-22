import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setScanner } from '../store/actions/scanner';
import useAppState from './useAppState';

const useCameraDisabler = () => {
  const appState = useAppState();
  const dispatch = useDispatch();

  useEffect(() => {
    setScanner({
      isOnScannerView: appState !== 'active',
    })(dispatch);
  }, [appState]); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useCameraDisabler;
