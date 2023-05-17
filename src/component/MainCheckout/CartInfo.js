import React from 'react';
import { Link } from 'react-router-dom';
import {
  TitleBar,
  SectionTitle,
  Title,
  SumTitle,
  CartContainer,
  ZeroOrderText,
  ZeroOrderSuggestions,
  ZeroOrderSuggestion,
  OrderContainer,
  OrderImgContainer,
  OrderImg,
  OrderInfosContainer,
  OrderTitle,
  OrderId,
  OrderColor,
  OrderSize,
  OrderAmountContainer,
  TitleMobile,
  AmountSelect,
  AmountOptions,
  OrderPriceContainer,
  OrderPrice,
  OrderTotalPriceContainer,
  OrderTotalPrice,
  OrderDeletionContainer,
  DeletionIcon,
} from './CartInfo.styled';

function Order(props) {
  const index = props.index;
  const amountArray = Array.from(
    Array(props.cartOrders[index].stock).keys(),
    (element) => element + 1
  );

  const handleReselectAmount = (e) => {
    const newSelectedAmounts = props.selectedAmountsForAllOrder.map(
      (currentAmount, i) => {
        if (i === index) {
          return Number(e.target.value);
        }
        return Number(currentAmount);
      }
    );
    props.setSelectedAmountsForAllOrder(newSelectedAmounts);

    const newCartOrders = props.cartOrders.map((currentOrder, i) => {
      if (i === index) {
        return { ...currentOrder, qty: Number(e.target.value) };
      }
      return currentOrder;
    });
    props.setCartOrders(newCartOrders);
    localStorage.setItem('EthanSTYLiSHCart', JSON.stringify(newCartOrders));

    const totalPrice = newCartOrders.reduce(
      (total, order) => total + order.price * order.qty,
      0
    );
    props.setTotalWithoutShipping(totalPrice);
  };

  const handleDeleteOrder = (orderIndex) => {
    const newCartOrders = props.cartOrders;
    newCartOrders.splice(orderIndex, 1);

    localStorage.setItem('EthanSTYLiSHCart', JSON.stringify(newCartOrders));

    const localStorageRawData = localStorage.getItem('EthanSTYLiSHCart');
    if (
      localStorageRawData === null ||
      JSON.parse(localStorageRawData).length === 0
    ) {
      props.setCartOrders([]);
      props.setTotalWithoutShipping(0);
    } else {
      props.setCartOrders(JSON.parse(localStorageRawData));
      const totalPrice = JSON.parse(localStorageRawData).reduce(
        (total, order) => total + order.price * order.qty,
        0
      );
      props.setTotalWithoutShipping(totalPrice);
      const selectedAmounts = JSON.parse(localStorageRawData).reduce(
        (acc, cur) => {
          acc.push(cur.qty);
          return acc;
        },
        []
      );
      props.setSelectedAmountsForAllOrder(selectedAmounts);
    }
  };

  return (
    <OrderContainer>
      <OrderImgContainer>
        <Link to={`/product?id=${props.cartOrders[index].id}`}>
          <OrderImg src={props.cartOrders[index].image} />
        </Link>
      </OrderImgContainer>
      <OrderInfosContainer>
        <OrderTitle>{props.cartOrders[index].name}</OrderTitle>
        <OrderId>{props.cartOrders[index].id}</OrderId>
        <OrderColor>顏色｜{props.cartOrders[index].color.name}</OrderColor>
        <OrderSize>尺寸｜{props.cartOrders[index].size}</OrderSize>
      </OrderInfosContainer>
      <OrderAmountContainer>
        <TitleMobile>數量</TitleMobile>
        <AmountSelect
          name="amount"
          onChange={handleReselectAmount}
          value={props.selectedAmountsForAllOrder[index]}
        >
          {amountArray.map((element, i) => (
            <AmountOptions key={i}>{element}</AmountOptions>
          ))}
        </AmountSelect>
      </OrderAmountContainer>
      <OrderPriceContainer>
        <TitleMobile>單價</TitleMobile>
        <OrderPrice>TWD.{props.cartOrders[index].price}</OrderPrice>
      </OrderPriceContainer>
      <OrderTotalPriceContainer>
        <TitleMobile>小計</TitleMobile>
        <OrderTotalPrice>
          TWD.
          {props.cartOrders[index].price * props.cartOrders[index].qty}
        </OrderTotalPrice>
      </OrderTotalPriceContainer>
      <OrderDeletionContainer>
        <DeletionIcon
          src="./img/trash.png"
          onClick={() => handleDeleteOrder(index)}
        />
      </OrderDeletionContainer>
    </OrderContainer>
  );
}

function ZeroCart() {
  return (
    <>
      <ZeroOrderText>
        尚無選購的商品，要不要去各個商品頁面逛逛呢？
      </ZeroOrderText>
      <ZeroOrderSuggestions>
        <ZeroOrderSuggestion href="./products.html?keyword=襯衫&paging=0">
          襯衫
        </ZeroOrderSuggestion>
        <ZeroOrderSuggestion href="./products.html?keyword=洋裝&paging=0">
          洋裝
        </ZeroOrderSuggestion>
        <ZeroOrderSuggestion href="./products.html?keyword=帽&paging=0">
          帽子
        </ZeroOrderSuggestion>
        <ZeroOrderSuggestion href="./products.html">
          更多...
        </ZeroOrderSuggestion>
      </ZeroOrderSuggestions>
    </>
  );
}

function CartInfo(props) {
  const orderListIndex = Array.from(Array(props.cartOrders.length).keys());

  if (props.cartOrders.length === 0) {
    return <ZeroCart />;
  }

  return (
    <>
      <TitleBar>
        <SectionTitle>購物車</SectionTitle>
        <Title>數量</Title>
        <Title>單價</Title>
        <SumTitle>小計</SumTitle>
      </TitleBar>
      <CartContainer>
        {orderListIndex.map((orderIndex) => (
          <Order
            key={orderIndex}
            index={orderIndex}
            cartOrders={props.cartOrders}
            setCartOrders={props.setCartOrders}
            selectedAmountsForAllOrder={props.selectedAmountsForAllOrder}
            setSelectedAmountsForAllOrder={props.setSelectedAmountsForAllOrder}
            setTotalWithoutShipping={props.setTotalWithoutShipping}
          />
        ))}
      </CartContainer>
    </>
  );
}

export default CartInfo;
