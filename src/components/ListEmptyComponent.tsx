import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { BG_PRIMARY } from '../theme/colors';

interface ListEmptyComponentProps {
  text: string;
}

const ListEmptyComponent: React.FC<ListEmptyComponentProps> = ({
  text,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListEmptyComponent;
