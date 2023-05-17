import React from 'react';
import styled from 'styled-components/macro';
import { MEDIA_QUERY_MOBILE } from '../utils/breakpoint';
import { InactiveGrey } from './Choice.styled';
import { FadeInOutNotice } from '../utils/FadeInOutNotice.styled';

const Button = styled.button`
  box-sizing: border-box;
  width: 360px;
  height: 64px;
  background-color: var(--black);
  background-color: ${({ status }) => (status === 'off' ? InactiveGrey : '')};
  border: 1px solid #979797;
  border-color: ${({ status }) => (status === 'off' ? InactiveGrey : '')};
  padding: 0;

  color: var(--white);
  font-size: 20px;
  letter-spacing: 4px;
  text-align: center;
  position: relative;

  ${MEDIA_QUERY_MOBILE} {
    width: calc(100vw - 48px);
    height: 44px;
    border: none;

    font-size: 16px;
    letter-spacing: 3.2px;
  }

  &:hover {
    cursor: ${({ status }) => (status === 'on' ? 'pointer' : 'default')};
  }
`;

const AddToCartButton = (props) => {
  const checkOrderRepeat = (prevOrders, currentOrder) => {
    const checkIndex = prevOrders.findIndex(
      (order) =>
        order.id === currentOrder.id &&
        order.color.code === currentOrder.color.code &&
        order.size === currentOrder.size
    );
    return checkIndex;
  };

  const resetButtons = () => {
    props.setSelectedOptions({
      color: null,
      size: null,
      amount: null,
    });
    props.setSizeButtonStatus([]);
    props.setAmount(0);
  };

  const handleAddToCart = () => {
    if (props.selectedOptions.amount !== null) {
      const prevCartArray = props.cartOrders;

      const currentOrder = {
        id: props.product.id,
        name: props.product.title,
        price: props.product.price,
        color: {
          name: props.selectedOptions.color.colorName,
          code: props.selectedOptions.color.colorCode,
        },
        size: props.selectedOptions.size,
        qty: props.selectedOptions.amount,
        image: props.product.main_image,
        stock: props.stockMax,
      };

      const repeatIndex = checkOrderRepeat(prevCartArray, currentOrder);

      let updatedCartArray;
      if (repeatIndex > -1) {
        updatedCartArray = prevCartArray.map((order, index) => {
          if (index === repeatIndex) {
            const sum = order.qty + props.selectedOptions.amount;
            return { ...order, qty: sum };
          }
          return order;
        });
      } else {
        updatedCartArray = [...prevCartArray, currentOrder];
      }
      props.setCartOrders(updatedCartArray);
      localStorage.setItem(
        'EthanSTYLiSHCart',
        JSON.stringify(updatedCartArray)
      );
      resetButtons();
      props.setCartIsAdded(true);
    }
  };

  return (
    <Button
      status={props.selectedOptions.amount === null ? 'off' : 'on'}
      onClick={handleAddToCart}
    >
      加入購物車
      <FadeInOutNotice
        status={props.cartIsAdded === true ? 'on' : 'off'}
        YshiftDesktop={-16}
        YshiftMobile={-16}
        fontSize={12}
      >
        已加入購物車
      </FadeInOutNotice>
    </Button>
  );
};

export default AddToCartButton;
