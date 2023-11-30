import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { StationType } from '../types/StationType';
import { BG_PRIMARY, SHADOW } from '../theme/colors';

interface RenderStationItemProps {
  item: StationType;
  onSelect: (item: StationType) => void;
}

const RenderStationItem: React.FC<RenderStationItemProps> = ({
  item,
  onSelect,
}): JSX.Element => {
  return (
    <TouchableOpacity onPress={() => onSelect(item)} style={styles.container}>
      <Text>{item.AddressInfo.Title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'center',
    paddingLeft: 10,
    backgroundColor: BG_PRIMARY,
    shadowColor: SHADOW,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default RenderStationItem;
