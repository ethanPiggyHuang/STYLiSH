import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { MEDIA_QUERY_MOBILE } from '../utils/breakpoint';
import CartInfo from './CartInfo';
import RecipientForm from './RecipientForm';
import PaymentForm from './PaymentForm';
import ConfirmOrder from './ConfirmOrder';

const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const MainContainer = styled.div`
  padding-top: 51px;
  padding-bottom: 148px;
  ${MEDIA_QUERY_MOBILE} {
    padding: 20px 24px 28px;
  }
`;

function MainCheckout(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [totalWithoutShipping, setTotalWithoutShipping] = useState(0);
  const [selectedAmountsForAllOrder, setSelectedAmountsForAllOrder] = useState(
    []
  );
  const [orderRecipient, setOrderRecipient] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    time: '',
  });
  const [isInvalidFormat, setIsInvalidFormat] = useState([]);
  const [showErrMessage, setShowErrMessage] = useState(false);

  const recipientQuestions = [
    {
      title: 'name',
      chineseTitle: '收件人姓名',
      noticeText: '務必填寫完整收件人姓名，避免包裹無法順利簽收',
    },
    {
      title: 'phone',
      chineseTitle: '手機',
      noticeText: null,
    },
    {
      title: 'address',
      chineseTitle: '地址',
      noticeText: null,
    },
    {
      title: 'email',
      chineseTitle: 'Email',
      noticeText: null,
    },
  ];

  useEffect(() => {
    const localStorageRawData = localStorage.getItem('EthanSTYLiSHCart');

    if (localStorageRawData === null) {
      props.setCartOrders([]);
    } else {
      const orderArray = JSON.parse(localStorageRawData);
      props.setCartOrders(orderArray);
      const totalPrice = orderArray.reduce(
        (total, order) => total + order.price * order.qty,
        0
      );
      setTotalWithoutShipping(totalPrice);
      const selectedAmounts = orderArray.reduce((acc, cur) => {
        acc.push(cur.qty);
        return acc;
      }, []);
      setSelectedAmountsForAllOrder(selectedAmounts);
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="isloading">loading...</div>;
  }

  return (
    <OuterContainer>
      <MainContainer>
        <CartInfo
          cartOrders={props.cartOrders}
          setCartOrders={props.setCartOrders}
          totalWithoutShipping={totalWithoutShipping}
          setTotalWithoutShipping={setTotalWithoutShipping}
          selectedAmountsForAllOrder={selectedAmountsForAllOrder}
          setSelectedAmountsForAllOrder={setSelectedAmountsForAllOrder}
        />
        <RecipientForm
          orderRecipient={orderRecipient}
          setOrderRecipient={setOrderRecipient}
          isInvalidFormat={isInvalidFormat}
          setIsInvalidFormat={setIsInvalidFormat}
          showErrMessage={showErrMessage}
          setShowErrMessage={setShowErrMessage}
          recipientQuestions={recipientQuestions}
        />
        <PaymentForm />
        <ConfirmOrder
          cartOrders={props.cartOrders}
          setCartOrders={props.setCartOrders}
          totalWithoutShipping={totalWithoutShipping}
          orderRecipient={orderRecipient}
          setOrderRecipient={setOrderRecipient}
          isInvalidFormat={isInvalidFormat}
          setIsInvalidFormat={setIsInvalidFormat}
          showErrMessage={showErrMessage}
          setShowErrMessage={setShowErrMessage}
          recipientQuestions={recipientQuestions}
        />
      </MainContainer>
    </OuterContainer>
  );
}

export default MainCheckout;
