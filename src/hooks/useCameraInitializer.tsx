import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setScanner } from '../store/actions/scanner';
import { getDevice } from '../store/selectors/device';
import { getScanner } from '../store/selectors/scanner';
import useCamera from './useCamera';

const useCameraInitializer = (cameraIsOn: boolean | undefined = undefined) => {
  const { turnOffCamera, turnOnCamera } = useCamera();
  const {
    didLoadInitialLayout,
    isMultiTasking,
    isOnScannerView,
    imageProcessingTimeout,
  } = useSelector(getScanner);
  const device = useSelector(getDevice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!didLoadInitialLayout || isMultiTasking) return;

    turnOnCamera();

    return () => {
      if (!imageProcessingTimeout) return;

      clearTimeout(imageProcessingTimeout);

      setScanner({
        imageProcessingTimeout: undefined,
      })(dispatch);
    };
  }, [didLoadInitialLayout, isMultiTasking]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!didLoadInitialLayout) return;
    if (isMultiTasking) return turnOffCamera(true);
    if (device.initialized && (!device.isHasCamera || device.isHasCameraAccess))
      return turnOffCamera();

    if (cameraIsOn === true && !isOnScannerView) return turnOnCamera();
    if (cameraIsOn === false && isOnScannerView) return turnOffCamera(true);
    if (cameraIsOn === undefined) return turnOnCamera();
  }, [didLoadInitialLayout]); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useCameraInitializer;
