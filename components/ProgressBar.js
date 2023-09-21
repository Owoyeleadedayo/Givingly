import { View, Text } from 'react-native'
import React from 'react';
import Svg, { Rect } from 'react-native-svg';

const ProgressBar = ({progress}) => {
    const barWidth = 380;
    const progressWidth = (progress / 100) * barWidth;
  return (
    <View>
      <Svg width={barWidth} height={"7"}>
        <Rect
          width={barWidth}
          height={"100%"}
          fill={"#eee"}
          rx={3.5}
          ry={3.5}
        />
        <Rect
          width={progressWidth}
          height={"100%"}
          fill={"#9ACD32"}
          rx={3.5}
          ry={3.5}
        />
      </Svg>
    </View>
  );
}

export default ProgressBar