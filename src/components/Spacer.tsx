import React from 'react';
import { View } from 'react-native';

interface SpacerProps {
  height?: number;
}

const Spacer: React.FC<SpacerProps> = ({ height = 20 }): JSX.Element => {
  return <View style={{ height }} />;
};

export default Spacer;
