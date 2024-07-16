import {
  StyleSheet,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

export type GradientButtonProps = TouchableOpacityProps & {
  text: string;
};

export default function GradientButton(props: GradientButtonProps) {
  return (
    <TouchableOpacity {...props} activeOpacity={0.7}>
      <LinearGradient
        colors={['#78A4F5', '#88DEE4']}
        useAngle={true}
        angle={45}
        angleCenter={{ x: 0.5, y: 0.5 }}
        style={[props.style, styles.button]}
      >
        <Text style={styles.buttonText}>{props.text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  button: {
    borderRadius: 128,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: { color: '#000', fontSize: 18, fontWeight: '600' },
});
