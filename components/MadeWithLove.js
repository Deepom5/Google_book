import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Body } from './styled';

const MadeWithLove = () => (
  <View style={styles.container}>
    <Body small>Made By</Body>
    <Body small style={styles.heartStyle}>
      {' '}
      ♥︎{' '}
    </Body>
    <Body small>Deepom</Body>
  </View>
);

export default MadeWithLove;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  heartStyle: { color: '#e31b23' },
});
