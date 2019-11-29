import React from 'react';
import styled from '@emotion/styled';
import { lighten } from 'polished';

interface Props {
  handleClick: (e: any) => void;
}

const SwitchedButtonStyled = styled('a')`
  position: absolute;
  display: block;
  top: -12px;
  width: 24px;
  height: 24px;
  border: 2px solid ${(props: any) => lighten(0.3, props.theme.colors.input)};
  background-color: ${(props: any) => lighten(0.4, props.theme.colors.background)};
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
`;
const Svg = styled('svg')`
  position: relative;
  top: 2px;
  width: 12px;
  height: 12px;
  pointer-events: none;
`;

const SwitchedButton = ({ handleClick }: Props) => {
  return (
    <SwitchedButtonStyled onClick={handleClick}>
      <Svg id="switch-button" x="0px" y="0px" viewBox="0 0 490 490">
        <g>
          <polygon
            points="85.877,154.014 85.877,428.309 131.706,428.309 131.706,154.014 180.497,221.213 217.584,194.27 108.792,44.46 
		0,194.27 37.087,221.213 	"
          />
          <polygon
            points="404.13,335.988 404.13,61.691 358.301,61.691 358.301,335.99 309.503,268.787 272.416,295.73 381.216,445.54 
		490,295.715 452.913,268.802 	"
          />
        </g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
      </Svg>
    </SwitchedButtonStyled>
  );
};

export default SwitchedButton;
