import { PermissionsAndroid } from 'react-native';

const useCameraPermission = () => {
  const requestCameraPermissions = () =>
    PermissionsAndroid.request('android.permission.CAMERA', {
      title: 'Akses Kamera',
      message: 'Aplikasi membutuhkan akses pada kamera',
      buttonNeutral: 'Tanyakan Nanti',
      buttonNegative: 'Batalkan',
      buttonPositive: 'OK',
    });

  return {
    requestCameraPermissions,
  };
};

export default useCameraPermission;
