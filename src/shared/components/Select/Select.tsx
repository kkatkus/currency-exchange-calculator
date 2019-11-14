import * as React from 'react';
import styled from '@emotion/styled';

interface Props {
  name: string;
  value: string | number | undefined;
  options: { title: string; value: string | number | undefined }[];
  style?: React.CSSProperties;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Wrapper = styled('div')`
  position: relative;
  width: 100%;
`;

const StyledSelect = styled('select')`
  display: inline-block;
  padding: 0.5rem 0.1rem 0.5rem 0;

  color: ${(props: any) => props.theme.colors.onInput};
  font-size: 24px;
  line-height: 45px;
  font-weight: 400;
  transition: all 0.3s ease;
  width: 100%;
  border-radius: 0;
  border: 0;
  border-bottom: 0px solid ${(props: any) => props.theme.colors.input};
  appearance: none;
  outline: 0;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  background: ${(props: any) => props.theme.colors.inputBg};
  &:hover {
  }
  &:focus {
  }
`;

const Svg = styled('svg')`
  position: absolute;
  right: 0;
  top: 1.2rem;
  width: 20px;
  height: 20px;
  transform: rotate(-90deg);
`;

const Select = ({ style, name, value, options = [], onChange }: Props) => (
  <Wrapper style={style}>
    <StyledSelect name={name} value={value} onChange={onChange}>
      {options.map(o => (
        <option value={o.value} key={o.value}>
          {o.title}
        </option>
      ))}
    </StyledSelect>
    <Svg viewBox="0 0 24 24" color="rgb(25,28,31)" stroke="rgb(25,28,31)" fill="rgb(25,28,31)">
      <g fill="currentColor">
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M14.673 15.536a1.116 1.116 0 1 1-1.579 1.579L8.211 12.23a1.116 1.116 0 0 1 0-1.579l4.883-4.883a1.116 1.116 0 1 1 1.579 1.578l-4.094 4.095 4.094 4.094z"
          clipRule="evenodd"
        ></path>
      </g>
    </Svg>
  </Wrapper>
);

export default Select;
