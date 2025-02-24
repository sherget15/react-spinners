/** @jsx jsx */
import * as React from "react";
import { keyframes, css, jsx, SerializedStyles } from "@emotion/react";

import { sizeDefaults, parseLengthAndUnit } from "./helpers";
import { LoaderSizeProps } from "./interfaces";

const rotate = keyframes`
  100% { transform: rotate(360deg) }
`;

class Loader extends React.PureComponent<Required<LoaderSizeProps>> {
  public static defaultProps = sizeDefaults(50);

  public wrapper = (): SerializedStyles => {
    const { size, color, speedMultiplier } = this.props;

    const { value, unit } = parseLengthAndUnit(size);

    return css`
      position: relative;
      width: ${`${value}${unit}`};
      height: ${`${value}${unit}`};
      background-color: transparent;
      box-shadow: inset 0px 0px 0px 2px ${color};
      border-radius: 50%;

      &:after,
      &:before {
        position: absolute;
        content: "";
        background-color: ${color};
      }

      &:after {
        width: ${value / 2.4}px;
        height: 2px;
        top: ${value / 2 - 1}px;
        left: ${value / 2 - 1}px;
        transform-origin: 1px 1px;
        animation: ${rotate} ${2 / speedMultiplier}s linear infinite;
      }

      &:before {
        width: ${value / 3}px;
        height: 2px;
        top: ${value / 2 - 1}px;
        left: ${value / 2 - 1}px;
        transform-origin: 1px 1px;
        animation: ${rotate} ${8 / speedMultiplier}s linear infinite;
      }
    `;
  };

  public render(): JSX.Element | null {
    const { loading, css } = this.props;

    return loading ? <span css={[this.wrapper(), css]} /> : null;
  }
}

export default Loader;
