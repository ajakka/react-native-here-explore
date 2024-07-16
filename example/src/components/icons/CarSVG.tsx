import Svg, { Path, type SvgProps } from 'react-native-svg';

/**
 * Icons made by Phosphor Icons
 * https://www.iconfinder.com/phosphor-icons
 */
export default function CarSVG(props: SvgProps) {
  return (
    <Svg id="icon" width={32} height={32} viewBox="0 0 256 256" {...props}>
      <Path fill="none" d="M0 0H256V256H0z" />
      <Path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={16}
        d="M16 120L240 120"
      />
      <Path
        d="M224 184v24a8 8 0 01-8 8h-24a8 8 0 01-8-8v-24M72 184v24a8 8 0 01-8 8H40a8 8 0 01-8-8v-24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={16}
      />
      <Path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={16}
        d="M64 152L80 152"
      />
      <Path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={16}
        d="M176 152L192 152"
      />
      <Path
        d="M224 120l-29.9-67.2a8 8 0 00-7.3-4.8H69.2a8 8 0 00-7.3 4.8L32 120v64h192z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={16}
      />
    </Svg>
  );
}
