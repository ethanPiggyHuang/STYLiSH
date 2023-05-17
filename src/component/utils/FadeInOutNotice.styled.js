// import React from 'react';
import styled from 'styled-components/macro';
import { MEDIA_QUERY_MOBILE } from './breakpoint';

export const FadeInOutNotice = styled.p`
  position: absolute;
  right: 2px;
  bottom: ${({ YshiftDesktop }) => `${YshiftDesktop}px`};

  color: darkred;
  font-size: ${({ fontSize }) => `${fontSize}px`};
  letter-spacing: 0;
  opacity: 0;
  animation: ${({ status }) => (status === 'on' ? 'fade 3s ease-out' : '')};

  ${MEDIA_QUERY_MOBILE} {
    bottom: ${({ YshiftMobile }) => `${YshiftMobile}px`};
  }

  @keyframes fade {
    0%,
    100% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  }
`;
