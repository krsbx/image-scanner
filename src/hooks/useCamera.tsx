import { useDispatch, useSelector } from 'react-redux';
import { setDevice } from '../store/actions/device';
import { setScanner } from '../store/actions/scanner';
import { getDevice } from '../store/selectors/device';
import { getScanner } from '../store/selectors/scanner';

const useCamera = () => {
  const dispatch = useDispatch();
  const { isOnScannerView } = useSelector(getScanner);
  const device = useSelector(getDevice);

  const turnOnCamera = () => {
    if (isOnScannerView) return;

    setScanner({
      isLoadingCamera: true,
      isOnScannerView: true,
    })(dispatch);
  };

  const turnOffCamera = (shouldUninitializeCamera = false) => {
    if (shouldUninitializeCamera && device.initialized) {
      setScanner({
        isOnScannerView: false,
      })(dispatch);
      setDevice({
        initialized: false,
      })(dispatch);

      return;
    }

    if (!isOnScannerView) return;

    setScanner({
      isOnScannerView: false,
    })(dispatch);
  };

  return {
    turnOnCamera,
    turnOffCamera,
  };
};

export default useCamera;
