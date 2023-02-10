import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const GridBackground = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={430}
        height={932}
        fill="none"
        {...props}
    >
        <Path
            stroke={props.lineColor ? props.lineColor : "#000"}
            d="M0 809.5h489.477M2.523 674.5H492m-492 90h489.477M2.523 629.5H492M2.523 899.5H492m-492-45h489.477M2.523 719.5H492m-523-630h489.477m-486.954 135H461m-492-180h489.477m-486.954 135H461m-492-45h489.477m-486.954 135H461m-492 180h489.477m-486.954-135H461m-489.477 270H461m-492-180h489.477m-486.954-135H461m-489.477 270H461m-492-45h489.477m-486.954-135H461m-489.477 270H461M215.5-35v970m135-965v970M80.5-30v970m180-975v970m135-965v970m-270-970v970m45-975v970m135-965v970M35.5-30v970"
        />
    </Svg>
);

export default GridBackground;
