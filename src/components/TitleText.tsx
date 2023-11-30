import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface TitleTextProps {
  title?: string;
}

const TitleText: React.FC<TitleTextProps> = ({ title = '' }): JSX.Element => {
  return <Text style={styles.text}>{title}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TitleText;
