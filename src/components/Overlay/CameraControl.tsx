import React from 'react';
import PhoneLayout from '../Layout/Phone';

const CameraControl: React.FC<Props> = ({ capture }) => {
  return <PhoneLayout capture={capture} />;
};
type Props = {
  capture: () => void;
};

export default CameraControl;
