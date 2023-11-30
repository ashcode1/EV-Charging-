import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { BRAND_PRIMARY } from '../theme/colors';

interface ActionButtonProps {
  title: string;
  onPress: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  title,
  onPress,
}): JSX.Element => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderColor: BRAND_PRIMARY,
    borderWidth: 1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
    color: BRAND_PRIMARY,
  },
});

export default ActionButton;
