import styled from 'styled-components/macro';
import { MEDIA_QUERY_MOBILE } from '../utils/breakpoint';

export const TitleBar = styled.div`
  display: flex;
  font-size: 16px;
  color: var(--dark);
  line-height: 19px;
  margin-bottom: 16px;
  ${MEDIA_QUERY_MOBILE} {
    margin-bottom: 10px;
  }
`;
export const SectionTitle = styled.p`
  font-weight: 700;
  margin-right: 490px;

  ${MEDIA_QUERY_MOBILE} {
    color: var(--text-dark);
    margin-right: 0;
  }
`;

export const Title = styled.p`
  margin-right: 160px;
  ${MEDIA_QUERY_MOBILE} {
    display: none;
  }
`;

export const SumTitle = styled(Title)`
  line-height: 16px;
  color: var(--black);
  margin-right: 0px;
  ${MEDIA_QUERY_MOBILE} {
    display: none;
  }
`;

export const CartContainer = styled.div`
  border: 1px solid #979797;
  padding: 40px 30px 10px;
  width: 1160px;
  ${MEDIA_QUERY_MOBILE} {
    width: auto;
    border: none;
    border-top: 1px solid var(--text-dark);
    padding: 10px 0 0px;
  }
`;

export const ZeroOrderText = styled.p`
  font-size: 24px;
  line-height: 1.15em;
  color: var(--text-dark);
  width: 1160px;
  padding-bottom: 24px;

  ${MEDIA_QUERY_MOBILE} {
    width: calc(100vw - 48px);
    padding-top: 30px;
  }
`;

export const ZeroOrderSuggestions = styled.div`
  margin-bottom: 100px;
`;

export const ZeroOrderSuggestion = styled.a`
  font-size: 24px;
  line-height: 1.15em;
  margin-right: 12px;
  color: var(--brown);
`;

export const OrderContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  ${MEDIA_QUERY_MOBILE} {
    border-top: 1px solid var(--text-dark);
    padding: 20px 0 20px;
    flex-wrap: wrap;
    margin-bottom: 0;

    &:first-child {
      border: none;
      padding-top: 0;
    }
  }
`;

export const OrderImgContainer = styled.div`
  width: 114px;
  margin-right: 16px;
  ${MEDIA_QUERY_MOBILE} {
    width: auto;
    height: 152px;
    margin-right: 10px;
  }
`;

export const OrderImg = styled.img`
  width: 100%;
  ${MEDIA_QUERY_MOBILE} {
    width: auto;
    height: 100%;
  }
`;

export const OrderInfosContainer = styled(OrderImgContainer)`
  width: 352px;
  display: flex;
  flex-direction: column;
  margin-right: 0px;
  ${MEDIA_QUERY_MOBILE} {
    width: calc(100vw - 216px);
  }
`;

export const OrderTitle = styled.p`
  font-size: 16px;
  line-height: 19px;
  color: var(--text-dark);
  margin-bottom: 18px;

  ${MEDIA_QUERY_MOBILE} {
    font-size: 14px;
    line-height: 17px;
    color: var(--black);
    margin-bottom: 20px;
  }
`;

export const OrderId = styled(OrderTitle)`
  color: var(--black);
  margin-bottom: 22px;
  ${MEDIA_QUERY_MOBILE} {
    color: var(--text-dark);
    margin-bottom: 24px;
  }
`;

export const OrderColor = styled(OrderId)`
  margin-bottom: 10px;
  ${MEDIA_QUERY_MOBILE} {
    margin-bottom: 12px;
  }
`;

export const OrderSize = styled(OrderId)`
  margin-bottom: 0px;
`;

export const OrderAmountContainer = styled(OrderInfosContainer)`
  width: 80px;
  margin-right: 56px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  ${MEDIA_QUERY_MOBILE} {
    order: 2;
    width: calc((100vw - 48px) / 3);
    height: 59px;
    margin: 0;
    margin-top: 20px;
    flex-direction: column;
    justify-content: flex-start;
  }
`;

export const TitleMobile = styled.p`
  display: none;
  ${MEDIA_QUERY_MOBILE} {
    display: block;
    font-size: 14px;
    line-height: 17px;
    color: var(--text-dark);
  }
`;

export const AmountSelect = styled.select`
  width: 80px;
  height: 32px;
  background: #f3f3f3;
  border: 1px solid #979797;
  border-radius: 8px;
  padding-left: 16px;
  font-size: 14px;
  line-height: 16px;

  ${MEDIA_QUERY_MOBILE} {
    height: 30px;
    margin-top: 12px;
  }
`;

export const AmountOptions = styled.option``;

export const OrderPriceContainer = styled(OrderAmountContainer)`
  width: 192px;
  margin: 0;

  ${MEDIA_QUERY_MOBILE} {
    margin-top: 20px;
    width: calc((100vw - 48px) / 3);
  }
`;

export const OrderPrice = styled.p`
  font-size: 16px;
  line-height: 19px;
  color: var(--text-dark);
  ${MEDIA_QUERY_MOBILE} {
    margin-top: 18px;
    font-size: 14px;
    line-height: 17px;
  }
`;

export const OrderTotalPriceContainer = styled(OrderPriceContainer)`
  margin-right: 52px;
  ${MEDIA_QUERY_MOBILE} {
    margin: 0;
    margin-top: 20px;
  }
`;

export const OrderTotalPrice = styled(OrderPrice)``;

export const OrderDeletionContainer = styled(OrderPriceContainer)`
  width: 44px;
  margin-right: 0;
  ${MEDIA_QUERY_MOBILE} {
    order: 1;
    padding-top: 0;
    margin-top: 0;
  }
`;

export const DeletionIcon = styled.img`
  width: 100%;

  &:hover {
    cursor: pointer;
  }
`;
