import React from 'react';
import {
  RecipientFormContainer,
  TitleContainer,
  TitleText,
  InputContainer,
  FormInputLine,
  InputTitle,
  InputArea,
  NoticeText,
  FormRadioButton,
  RadioOptions,
  RadioOption,
  RadioInput,
  RadioLabel,
} from './CommonForm.styled';

const FormSingleLine = (props) => {
  const handleOnChange = (e) => {
    const newKeyIn = {};
    newKeyIn[props.title] = e.target.value;
    const newState = { ...props.orderRecipient, ...newKeyIn };
    props.setOrderRecipient(newState);
  };

  const checkForm = (e) => {
    if (
      e.target.title === 'phone' &&
      /^09\d{2}(\d{6}|-\d{3}-\d{3})$/.test(e.target.value) === false
    ) {
      alert('請填入正確手機格式(10碼)');
      // props.setIsInvalidFormat((prev) => prev.push('phone'));  //TODO
    }
    if (
      e.target.title === 'email' &&
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value) ===
        false
    ) {
      alert('請填入正確 email 地址');
      // props.setIsInvalidFormat((prev) => prev.push('email'));
    }
    // props.setIsInvalidFormat([]);
  };

  return (
    <FormInputLine>
      <InputTitle>{props.chineseTitle}</InputTitle>
      <InputArea
        value={props.orderRecipient[props.title]}
        title={props.title}
        $status={props.orderRecipient[props.title] === '' ? 'invalid' : 'valid'}
        $show={props.showErrMessage === true ? true : false}
        onChange={handleOnChange}
        onBlur={checkForm}
      ></InputArea>
      {props.noticeText === null ? (
        ''
      ) : (
        <NoticeText>{props.noticeText}</NoticeText>
      )}
    </FormInputLine>
  );
};

const TimingOption = (props) => {
  const handleRadioSelect = (e) =>
    props.setOrderRecipient({ ...props.orderRecipient, time: e.target.value });
  return (
    <RadioOption onChange={handleRadioSelect}>
      <RadioInput
        type="radio"
        id={props.title}
        name="timimg"
        value={props.title}
      />
      <RadioLabel
        htmlFor={props.title}
        status={props.orderRecipient.time === '' ? 'empty' : 'inputted'}
        show={props.showErrMessage === true ? true : false}
      >
        {props.optionText}
      </RadioLabel>
    </RadioOption>
  );
};

function RecipientForm(props) {
  const recipientQuestions = props.recipientQuestions;

  const timing = [
    {
      title: 'morning',
      text: '08:00-12:00',
    },
    {
      title: 'afternoon',
      text: '14:00-18:00',
    },
    {
      title: 'anytime',
      text: '不指定',
    },
  ];

  return (
    <RecipientFormContainer>
      <TitleContainer>
        <TitleText>訂購資料</TitleText>
      </TitleContainer>
      <InputContainer>
        {recipientQuestions.map((question) => (
          <FormSingleLine
            key={question.title}
            title={question.title}
            chineseTitle={question.chineseTitle}
            noticeText={question.noticeText}
            orderRecipient={props.orderRecipient}
            setOrderRecipient={props.setOrderRecipient}
            showErrMessage={props.showErrMessage}
            setShowErrMessage={props.setShowErrMessage}
            isInvalidFormat={props.isInvalidFormat}
            setIsInvalidFormat={props.setIsInvalidFormat} // TODO
          />
        ))}
        <FormRadioButton>
          <InputTitle>配送時間</InputTitle>
          <RadioOptions>
            {timing.map((option) => (
              <TimingOption
                key={option.title}
                title={option.title}
                optionText={option.text}
                orderRecipient={props.orderRecipient}
                setOrderRecipient={props.setOrderRecipient}
                showErrMessage={props.showErrMessage}
                setShowErrMessage={props.setShowErrMessage}
              />
            ))}
          </RadioOptions>
        </FormRadioButton>
      </InputContainer>
    </RecipientFormContainer>
  );
}

export default RecipientForm;
