import styled from 'styled-components/macro';
import { MEDIA_QUERY_MOBILE } from '../utils/breakpoint';
import { InactiveGrey } from '../MainProduct/Choice.styled';

export const OuterContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: flex-end;

  ${MEDIA_QUERY_MOBILE} {
    margin-top: 24px;
    width: calc(100vw - 48px);
  }
`;

export const ConfirmOrderContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${MEDIA_QUERY_MOBILE} {
    align-items: flex-end;
  }
`;

export const CartTotal = styled.div`
  width: 240px;
  display: flex;
  align-items: center;

  font-size: 16px;
  line-height: 19px;
  color: var(--text-dark);
`;

export const Title = styled.p`
  margin-right: auto;
`;

export const Currency = styled.p`
  margin-right: 8px;
`;

export const Amount = styled.p`
  font-size: 30px;
  line-height: 36px;
`;

export const Shipping = styled(CartTotal)`
  margin: 20px 0;
`;

export const PaymentTotal = styled(CartTotal)`
  border-top: 1px solid var(--text-dark);
  padding-top: 20px;
`;

export const ConfirmButton = styled.div`
  margin-top: 50px;
  width: 240px;
  height: 64px;
  background-color: ${({ formCompleted }) =>
    formCompleted === true ? 'var(--black)' : InactiveGrey};
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 4px;
  color: var(--white);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:hover {
    cursor: ${({ formCompleted }) =>
      formCompleted === true ? 'pointer' : 'not-allowed'};
  }

  ${MEDIA_QUERY_MOBILE} {
    margin-top: 36px;
    font-size: 16px;
    letter-spacing: 3.2px;
    height: 44px;
    width: calc(100vw - 48px);
  }
`;

export const ButtonErrorMessage = styled.p`
  display: ${({ formCompleted, show }) =>
    (!formCompleted && show) === true ? 'block' : 'none'};
  position: absolute;
  bottom: -28px;
  right: 0px;
  color: darkred;
  font-size: 14px;
  line-height: 1.15em;
  letter-spacing: 0px;
  text-align: end;
  width: 1160px;

  ${MEDIA_QUERY_MOBILE} {
    bottom: -18px;
    font-size: 12px;
    width: calc(100vw - 48px);
  }
`;
