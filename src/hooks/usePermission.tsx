import { PermissionsAndroid } from 'react-native';

const usePermission = () => {
  const checkCameraPermissions = () =>
    PermissionsAndroid.check('android.permission.CAMERA');

  const requestCameraPermissions = () =>
    PermissionsAndroid.request('android.permission.CAMERA', {
      title: 'Akses Kamera',
      message: 'Aplikasi membutuhkan akses pada kamera',
      buttonNeutral: 'Tanyakan Nanti',
      buttonNegative: 'Batalkan',
      buttonPositive: 'OK',
    });

  const checkFilePermissions = () =>
    PermissionsAndroid.check('android.permission.READ_MEDIA_IMAGES');

  const requestFilePermissions = () =>
    PermissionsAndroid.request('android.permission.READ_MEDIA_IMAGES', {
      title: 'Akses Galeri',
      message: 'Aplikasi membutuhkan akses pada galeri',
      buttonNeutral: 'Tanyakan Nanti',
      buttonNegative: 'Batalkan',
      buttonPositive: 'OK',
    });

  return {
    checkCameraPermissions,
    requestCameraPermissions,
    requestFilePermissions,
    checkFilePermissions,
  };
};

export default usePermission;
