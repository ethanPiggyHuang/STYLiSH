import styled from 'styled-components/macro';
import { MEDIA_QUERY_MOBILE } from '../utils/breakpoint';

export const RecipientFormContainer = styled.div`
  margin-top: 50px;
  ${MEDIA_QUERY_MOBILE} {
    margin-top: 0;
  }
`;

export const PaymentFormContainer = styled(RecipientFormContainer)`
  ${MEDIA_QUERY_MOBILE} {
    margin-top: 20px;
  }
`;

export const TitleContainer = styled.div`
  padding-bottom: 16px;
  border-bottom: 1px solid var(--text-dark);
  ${MEDIA_QUERY_MOBILE} {
    padding-bottom: 10px;
  }
`;

export const TitleText = styled.p`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: var(--text-dark);
`;

export const InputContainer = styled.div`
  padding-top: 25px;
  ${MEDIA_QUERY_MOBILE} {
    padding-top: 20px;
  }
`;

export const FormInputLine = styled.div`
  margin-top: 30px;
  width: 696px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  &:first-child {
    margin-top: 0px;
  }

  ${MEDIA_QUERY_MOBILE} {
    margin-top: 20px;
    width: calc(100vw - 48px);
    align-items: default;
  }
`;

export const InputTitle = styled.p`
  width: 120px;
  font-size: 16px;
  line-height: 19px;
  color: var(--text-dark);
  ${MEDIA_QUERY_MOBILE} {
    width: 100%;
    font-size: 14px;
    line-height: 17px;
  }
`;

export const InputArea = styled.input`
  width: 576px;
  height: 32px;
  border: 1px solid #979797;
  border-radius: 8px;
  padding-inline: 8px;
  color: var(--text-dark);
  border-color: ${({ $status, $show }) =>
    $status === 'invalid' && $show ? '#D0342C' : ''};

  &:focus {
    outline: none;
    box-shadow: 0px 0px 5px #979797;
    border-color: #979797;
  }

  &::placeholder {
    font-size: 16px;
    line-height: 32px;
    color: #d3d3d3;
  }

  ${MEDIA_QUERY_MOBILE} {
    width: 100%;
    margin-top: 10px;
  }
`;

export const NoticeText = styled.p`
  width: 696px;
  text-align: end;
  font-size: 16px;
  line-height: 19px;
  color: var(--brown);
  margin-top: 10px;
  ${MEDIA_QUERY_MOBILE} {
    width: 100%;
    font-size: 14px;
    line-height: 17px;
    margin-top: 6px;
  }
`;

export const FormRadioButton = styled(FormInputLine)``;

export const RadioOptions = styled.div`
  width: 576px;
  height: 32px;
  display: flex;

  ${
    '' /* border: ${({ status, show }) =>
    status === 'empty' && show ? '1px solid #D0342C' : ''}; */
  }

  border: ${({ status, show }) =>
    status === 'empty' && show ? '1px solid #D0342C' : ''};
  ${MEDIA_QUERY_MOBILE} {
    margin-top: 10px;
  }
  border-radius: 8px;
`;

export const RadioOption = styled.div`
  margin-right: 32px;
  display: flex;
  align-items: center;

  &:last-child {
    margin-right: 0;
  }
  ${MEDIA_QUERY_MOBILE} {
    margin-right: 26px;
  }
`;

export const RadioInput = styled.input`
  width: 16px;
  height: 16px;
  border: 1px solid #979797;
  margin-right: 8px;
  ${MEDIA_QUERY_MOBILE} {
    margin-right: 6px;
  }

  ${'' /* TODO: change selected dot color */}
`;

export const RadioLabel = styled.label`
  font-size: 16px;
  line-height: 26px;

  color: ${({ status, show }) =>
    status === 'empty' && show ? '#D0342C' : 'var(--text-dark)'};
  ${MEDIA_QUERY_MOBILE} {
    font-size: 14px;
  }
`;
