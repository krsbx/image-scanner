const useCameraMessage = ({
  isMultiTasking,
  initialized,
  isHasCamera,
  isHasCameraAccess,
}: {
  isMultiTasking: boolean;
  initialized: boolean;
  isHasCamera: boolean;
  isHasCameraAccess: boolean;
}) => {
  if (isMultiTasking) return 'Camera is not allowed in multi tasking mode.';

  if (!initialized) return 'Failed to set up the camera.';

  if (!isHasCamera) return 'Could not find a camera on the device.';

  if (!isHasCameraAccess)
    return 'Permission to use camera has not been granted.';

  return '';
};

export default useCameraMessage;
