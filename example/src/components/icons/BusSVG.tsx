import Svg, { Path, type SvgProps } from 'react-native-svg';

/**
 * Icons made by Carbon Design
 * https://www.iconfinder.com/carbon-design
 */
export default function BusSVG(props: SvgProps) {
  return (
    <Svg id="icon" width={32} height={32} viewBox="0 0 32 32" {...props}>
      <Path fill="currentColor" d="M27 11H29V15H27z" />
      <Path fill="currentColor" d="M3 11H5V15H3z" />
      <Path fill="currentColor" d="M20 20H22V22H20z" />
      <Path fill="currentColor" d="M10 20H12V22H10z" />
      <Path
        fill="currentColor"
        d="M21 4H11a5.006 5.006 0 00-5 5v14a2.002 2.002 0 002 2v3h2v-3h12v3h2v-3a2.003 2.003 0 002-2V9a5.006 5.006 0 00-5-5zm3 6v6H8v-6zM11 6h10a2.995 2.995 0 012.816 2H8.184A2.995 2.995 0 0111 6zM8 23v-5h16.001l.001 5z"
      />
    </Svg>
  );
}
