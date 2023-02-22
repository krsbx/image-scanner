import React from 'react';
import { View } from 'react-native';
import FlashControl from '../../Overlay/FlashControl';
import { controlStyle, globalStyle } from '../../../styles';
import Gallery from '../../Control/Gallery';
import SnapImage from '../../Control/SnapImage';
import Document from '../../Control/Document';

const PhoneLayout: React.FC<Props> = ({ capture }) => {
  return (
    <React.Fragment>
      <View
        style={[
          globalStyle.buttonBottomContainer,
          {
            paddingBottom: 5,
          },
        ]}
      >
        <Gallery />
        <SnapImage capture={capture} />
        <View>
          <View
            style={[
              controlStyle.buttonActionGroup,
              {
                justifyContent: 'flex-end',
                marginBottom: 5,
              },
            ]}
          >
            <FlashControl />
          </View>
          <Document />
        </View>
      </View>
    </React.Fragment>
  );
};

type Props = {
  capture: () => void;
};

export default PhoneLayout;
