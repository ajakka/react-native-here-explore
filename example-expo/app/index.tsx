import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import GradientButton from '../components/GradientButton';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <GradientButton
        text="Routes screen"
        onPress={() => router.push('/routes')}
      />
      <View style={styles.margin} />
      <GradientButton
        text="Polyline screen"
        onPress={() => router.push('/polyline')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1A1E25',
  },
  margin: { marginVertical: 8 },
});
