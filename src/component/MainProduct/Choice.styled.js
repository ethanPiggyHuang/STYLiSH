import styled from 'styled-components/macro';
import { MEDIA_QUERY_MOBILE } from '../utils/breakpoint';

export const InactiveGrey = '#cccccc';
const InactiveBrown = '#dfbf9f';

export const ChoiceContainer = styled.div`
  margin-bottom: 26px;

  ${MEDIA_QUERY_MOBILE} {
    margin-bottom: 10px;
  }
`;

export const ColorContainer = styled.div`
  margin-bottom: 30px;
  height: 36px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  ${MEDIA_QUERY_MOBILE} {
    margin-bottom: 28px;
    height: 36px;
  }
`;

export const Text = styled.p`
  height: 24px;
  font-size: 20px;
  letter-spacing: 4px;

  ${MEDIA_QUERY_MOBILE} {
    height: 17px;
    font-size: 14px;
    letter-spacing: 2.8px;
    width: 62px;
  }
`;

export const ColorText = styled(Text)``;

export const ColorButtons = styled.div`
  margin-left: calc(28px - 4px);
  display: flex;
  position: relative;

  ${MEDIA_QUERY_MOBILE} {
    margin-left: 6px;
  }
`;

export const ColorChosenFrame = styled.div`
  position: absolute;
  top: -6px;
  transform: translateX(${({ frameShift }) => frameShift});
  width: 36px;
  height: 36px;
  border: 1px solid #979797;
  z-index: -1;
  display: ${({ status }) => (status === 'on' ? 'block' : 'none')};
`;

export const ColorButton = styled.div`
  height: 24px;
  width: 24px;
  border: 1px solid var(--text-lightgrey);
  margin-right: 32px;
  background-color: ${({ backgroundColor }) => backgroundColor};

  &:last-child {
    margin-right: 0px;
  }

  &:hover {
    cursor: pointer;
  }

  ${MEDIA_QUERY_MOBILE} {
    margin-right: 27px;
  }
`;

export const SizeContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 22px;

  ${MEDIA_QUERY_MOBILE} {
    margin-bottom: 30px;
  }
`;

export const SizeText = styled(Text)``;

export const SizeButtons = styled.div`
  margin-left: calc(24px - 4px);
  display: flex;

  ${MEDIA_QUERY_MOBILE} {
    margin-left: 0px;
  }
`;

export const SizeButton = styled.div`
  margin-right: 20px;
  height: 36px;
  width: 36px;
  border-radius: 18px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ status }) => {
    if (status === 'selected') {
      return `background-color: var(--black); 
      color: var(--white);`;
    } else if (status === 'inStock') {
      return `background-color: #ececec;
      color: inherit;`;
    }
    return `background-color: rgba(236, 236, 236, 0.25);
      color: rgba(63, 58, 58, 0.25);`;
  }}

  &:last-child {
    margin-right: 0px;
  }

  &:hover {
    cursor: ${({ status }) => (status === 'inStock' ? 'pointer' : 'default')};
  }

  ${MEDIA_QUERY_MOBILE} {
    margin-right: 15px;
  }
`;

export const SizeLetter = styled.p``;

export const AmountContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;

  ${MEDIA_QUERY_MOBILE} {
    width: calc(100vw - 48px);
  }
`;

export const AmountText = styled(Text)`
  ${MEDIA_QUERY_MOBILE} {
    display: none;
  }
`;

export const Counter = styled.div`
  margin-left: 20px;
  width: 160px;
  height: 44px;
  border: 1px solid #979797;
  border-color: ${({ status }) => (status === 'off' ? InactiveGrey : '')};
  color: ${({ status }) => (status === 'off' ? InactiveGrey : '')};
  display: flex;
  align-items: center;
  font-size: 16px;

  ${MEDIA_QUERY_MOBILE} {
    margin-left: 0px;
    width: calc(100vw - 48px);
    height: 44px;
    border: 1px solid #979797;
  }
`;

export const Operator = styled.p`
  padding: 12px 15px;

  &:hover {
    cursor: ${({ status }) => (status === 'on' ? 'pointer' : 'default')};
  }

  ${MEDIA_QUERY_MOBILE} {
    padding: 12px 35px;
  }
`;

export const Amount = styled.p`
  padding-left: 2px;
  text-align: right;
  color: var(--brown);
  color: ${({ status }) => (status === 'off' ? InactiveBrown : '')};
  margin: auto;

  ${MEDIA_QUERY_MOBILE} {
    font-size: 20px;
  }
`;

export const NoticeTextCounter = styled.span`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 15px;

  color: darkred;
  font-size: 9px;
  letter-spacing: 0;
  opacity: 0;
  animation: ${({ status }) => (status === 'on' ? 'fade 3s ease-out' : '')};

  ${MEDIA_QUERY_MOBILE} {
    top: -16px;
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
