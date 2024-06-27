import type { ScreenNames, ScreenProps } from '@/navigation';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const PolylineScreenName: ScreenNames = 'Polyline';

export default function PolylineScreen(props: ScreenProps<'Polyline'>) {
  return (
    <View>
      <Text>PolylineScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
