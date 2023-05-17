import React from 'react';
import {
  PaymentFormContainer,
  TitleContainer,
  TitleText,
  InputContainer,
  FormInputLine,
  InputTitle,
  InputArea,
  NoticeText,
} from './CommonForm.styled';

const FormSingleLine = (props) => {
  return (
    <FormInputLine>
      <InputTitle>{props.title}</InputTitle>
      <InputArea placeholder={props.placeholder}></InputArea>
      {props.noticeText === null ? (
        ''
      ) : (
        <NoticeText>{props.noticeText}</NoticeText>
      )}
    </FormInputLine>
  );
};

function PaymentForm() {
  return (
    <PaymentFormContainer>
      <TitleContainer>
        <TitleText>付款資料</TitleText>
      </TitleContainer>
      <InputContainer>
        <FormSingleLine
          key="信用卡號碼"
          title="信用卡號碼"
          placeholder="**** **** **** ****"
          noticeText={null}
        />
        <FormSingleLine
          key="有效期限"
          title="有效期限"
          placeholder="MM / YY"
          noticeText={null}
        />
        <FormSingleLine
          key="安全碼"
          title="安全碼"
          placeholder="後三碼"
          noticeText={null}
        />
      </InputContainer>
    </PaymentFormContainer>
  );
}

export default PaymentForm;
