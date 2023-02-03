import React from 'react';
import { DIMENSSIONS } from '../../utils/constant';
import PhoneLayout from '../Layout/Phone';
import { TabletBaseLayout, TabletLargeLayout } from '../Layout/Tablet';

const CameraControl: React.FC<Props> = ({ capture }) => {
  const { IS_PHONE, IS_LARGE_TABLET } = DIMENSSIONS;

  if (IS_PHONE) return <PhoneLayout capture={capture} />;

  if (IS_LARGE_TABLET) return <TabletLargeLayout capture={capture} />;

  return <TabletBaseLayout capture={capture} />;
};
type Props = {
  capture: () => void;
};

export default CameraControl;
