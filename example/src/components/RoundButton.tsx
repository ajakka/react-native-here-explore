import {
  StyleSheet,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native';

export type RoundButtonProps = TouchableOpacityProps & {
  text: string;
};

export default function RoundButton(props: RoundButtonProps) {
  return (
    <TouchableOpacity
      {...props}
      style={[props.style, styles.button]}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>{props.text}</Text>
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
    backgroundColor: '#309299',
    borderRadius: 50,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
