import Svg, { Path, type SvgProps } from 'react-native-svg';

/**
 * Icons made by Phosphor Icons
 * https://www.iconfinder.com/phosphor-icons
 */
export default function TaxiSVG(props: SvgProps) {
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
        d="M224 120l-29.7-52a7.9 7.9 0 00-6.9-4H68.6a7.9 7.9 0 00-6.9 4L32 120v64h192z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={16}
      />
      <Path
        d="M160 64l-14-35a7.9 7.9 0 00-7.4-5h-21.2a7.9 7.9 0 00-7.4 5L96 64"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={16}
      />
    </Svg>
  );
}
