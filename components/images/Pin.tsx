import React from 'react'
import { ViewStyle } from 'react-native'
import Svg, { Color, Path, Text } from 'react-native-svg'
import { View } from '../Themed'

type Props = {
  fillColor?: Color
  style: ViewStyle | ViewStyle[]
  label: string
}

const getFontSize = (labelLength: number) => {
  switch (labelLength) {
    case 2:
      return 600
    case 3:
      return 450
    default:
      return 800
  }
}

const getTranslateY = (labelLength: number) => {
  switch (labelLength) {
    case 2:
      return 0
    case 3:
      return -75
    default:
      return 100
  }
}

export default function Pin({ fillColor = '#000000', label, style }: Props) {
  return (
    <View style={style} pointerEvents="none" testID="color-pin">
      {/* Using viewBox to crop the SVG since it has a bunch of empty space */}
      <Svg viewBox="158 87 1086 1830">
        <Path
          d="M702.027 1819.716c-38.766-192.436-107.116-352.577-189.903-500.999-61.407-110.093-132.544-211.712-198.364-318.471-21.972-35.64-40.934-73.29-62.047-110.278-42.216-73.957-76.444-159.707-74.269-270.938 2.125-108.679 33.208-195.857 78.03-267.136 73.719-117.235 197.201-213.356 362.884-238.616 135.466-20.653 262.475 14.24 352.543 67.497 73.6 43.52 130.596 101.655 173.92 170.168 45.22 71.51 76.36 155.99 78.971 266.185 1.337 56.457-7.805 108.739-20.684 152.106-13.034 43.896-33.996 80.589-52.646 119.783-36.406 76.508-82.049 146.608-127.855 216.75-136.437 208.925-264.496 421.993-320.58 713.949z"
          strokeMiterlimit={10}
          strokeWidth={37}
          stroke="#fff"
          fill={fillColor}
          clipRule="evenodd"
          fillRule="evenodd"
        />
        <Text
          fill="#fff"
          stroke="#000"
          strokeWidth="10"
          fontSize={getFontSize(label.length)}
          x="701"
          y={800}
          textAnchor="middle"
          translateY={getTranslateY(label.length)}
          fontWeight="bold"
        >
          {label}
        </Text>
      </Svg>
    </View>
  )
}
