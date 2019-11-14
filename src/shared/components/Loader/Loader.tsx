import React, { Fragment } from 'react';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import { transparentize } from 'polished';

const LoadingOverlay = styled('div')`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background: ${(props: any) => transparentize(0.25, props.theme.colors.background)};
`;

const LoadingOverlayInner = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
`;

const CubeMove = keyframes`
  25% {
    transform: translateX(26px) rotate(-90deg) scale(0.5);
    -webkit-transform: translateX(26px) rotate(-90deg) scale(0.5);
  } 50% {
    transform: translateX(26px) translateY(26px) rotate(-179deg);
    -webkit-transform: translateX(26px) translateY(26px) rotate(-179deg);
  } 50.1% {
    transform: translateX(26px) translateY(26px) rotate(-180deg);
    -webkit-transform: translateX(26px) translateY(26px) rotate(-180deg);
  } 75% {
    transform: translateX(0px) translateY(26px) rotate(-270deg) scale(0.5);
    -webkit-transform: translateX(0px) translateY(26px) rotate(-270deg) scale(0.5);
  } 100% {
    transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
  }
`;

const Spinner = styled('div')`
  position: relative;
  & .cube1,
  & .cube3,
  & .cube2 {
    background-color: ${(props: any) => props.theme.colors.primary};
    width: 13px;
    height: 13px;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-animation: ${CubeMove} 1.8s infinite ease-in-out;
    animation: ${CubeMove} 1.8s infinite ease-in-out;
  }
  & .cube2 {
    -webkit-animation-delay: -0.6s;
    animation-delay: -0.6s;
  }
  & .cube3 {
    -webkit-animation-delay: -1.2s;
    animation-delay: -1.2s;
  }
`;

interface Props {
  loading: boolean;
  children: React.ReactNode;
}

const Loader = ({ loading, children }: Props) => {
  if (!loading) {
    return <Fragment>{children}</Fragment>;
  }

  return (
    <Fragment>
      <LoadingOverlay>
        <LoadingOverlayInner>
          <Spinner>
            <div className="cube1" />
            <div className="cube2" />
            <div className="cube3" />
          </Spinner>
        </LoadingOverlayInner>
      </LoadingOverlay>
      {children}
    </Fragment>
  );
};

export default Loader;
