import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
const SvgSendIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#FFFFFF"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20 12H4M10 18l-6-6 6-6"
    />
  </Svg>
);
export default SvgSendIcon;
