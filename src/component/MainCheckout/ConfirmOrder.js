import React, { useState } from 'react';
import {
  OuterContainer,
  ConfirmOrderContainer,
  CartTotal,
  Title,
  Currency,
  Amount,
  Shipping,
  PaymentTotal,
  ConfirmButton,
  ButtonErrorMessage,
} from './ConfirmOrder.styled';
import { FadeInOutNotice } from '../utils/FadeInOutNotice.styled';

function ConfirmOrder(props) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const recipientQuestions = props.recipientQuestions;

  const checkEmptyTitle = () => {
    const currentInputs = Object.values(props.orderRecipient);
    const emptyInputs = currentInputs.map((input, index) => {
      if (input === '') return Object.keys(props.orderRecipient)[index];
      return '';
    });
    const reducedEmptyTitles = emptyInputs.reduce((emptyArray, input) => {
      if (input !== '') emptyArray.push(input);
      return emptyArray;
    }, []);

    return reducedEmptyTitles;
  };

  const handleConfirmButton = () => {
    const inputs = Object.values(props.orderRecipient);
    //TODO !!!  add format check first
    if (inputs.findIndex((input) => input === '') > -1) {
      const emptyInputTitles = checkEmptyTitle();
      props.setIsInvalidFormat(emptyInputTitles);
      props.setShowErrMessage(true);
    } else {
      setIsSubmitted(true);
    }
  };

  const displayErrorMessage = (emptyTitle, index, array) => {
    let text;
    if (emptyTitle === 'time') {
      text = '配送時間';
    } else {
      text = recipientQuestions.find(
        (question) => question.title === emptyTitle
      ).chineseTitle;
    }
    if (index < array.length - 1) {
      text += '、';
    }
    return text;
  };

  return (
    <OuterContainer>
      <ConfirmOrderContainer>
        <CartTotal>
          <Title>總金額</Title>
          <Currency>NT.</Currency>
          <Amount>{props.totalWithoutShipping}</Amount>
        </CartTotal>
        <Shipping>
          <Title>運費</Title>
          <Currency>NT.</Currency>
          <Amount>{props.totalWithoutShipping === 0 ? 0 : 30}</Amount>
        </Shipping>
        <PaymentTotal>
          <Title>應付金額</Title>
          <Currency>NT.</Currency>
          <Amount>
            {props.totalWithoutShipping === 0
              ? 0
              : props.totalWithoutShipping + 30}
          </Amount>
        </PaymentTotal>
        <ConfirmButton
          formCompleted={
            Object.values(props.orderRecipient).findIndex(
              (input) => input === ''
            ) === -1
              ? true
              : false
          }
          onClick={handleConfirmButton}
        >
          確認付款
          <ButtonErrorMessage
            formCompleted={
              Object.values(props.orderRecipient).findIndex(
                (input) => input === ''
              ) === -1
                ? true
                : false
            }
            show={props.showErrMessage === true ? true : false}
          >
            請填寫資料：
            {props.isInvalidFormat.map((emptyTitle, index, array) =>
              displayErrorMessage(emptyTitle, index, array)
            )}
          </ButtonErrorMessage>
          <FadeInOutNotice
            status={isSubmitted === true ? 'on' : 'off'}
            YshiftDesktop={-34}
            YshiftMobile={-26}
            fontSize={14}
          >
            已送出訂單
          </FadeInOutNotice>
        </ConfirmButton>
      </ConfirmOrderContainer>
    </OuterContainer>
  );
}

export default ConfirmOrder;
