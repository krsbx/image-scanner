import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'flex-end',
    bottom: 25,
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'absolute',
    right: 25,
    top: 25,
  },
  buttonBottomContainer: {
    alignItems: 'flex-end',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 25,
    position: 'absolute',
    right: 25,
  },
  notAvailableContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  notAvailableText: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
  },
  mainContainer: {
    backgroundColor: 'black',
    flex: 1,
  },
  croppedImage: {
    height: '40%',
    width: '100%',
    resizeMode: 'contain',
  },
  croppedImageRot: {
    transform: [{ rotateZ: '180deg' }, { rotateY: '180deg' }],
  },
});

export default styles;
