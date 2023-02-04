import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { overlayStyle } from '../../styles';

const GradingOverlay: React.FC = () => {
  return (
    <View
      style={[
        overlayStyle.container,
        { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
      ]}
    >
      <View style={overlayStyle.loadingContainer}>
        <ActivityIndicator color="white" />
        <Text style={overlayStyle.loadingCameraMessage}>Grading</Text>
      </View>
    </View>
  );
};

export default GradingOverlay;
