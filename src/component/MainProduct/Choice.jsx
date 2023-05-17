import React, { useState } from 'react';
import {
  ChoiceContainer,
  ColorContainer,
  ColorText,
  ColorButtons,
  ColorChosenFrame,
  ColorButton,
  SizeContainer,
  SizeText,
  SizeButtons,
  SizeButton,
  SizeLetter,
  AmountContainer,
  AmountText,
  Counter,
  Operator,
  Amount,
  NoticeTextCounter,
} from './Choice.styled';
import AddToCartButton from './AddToCartButton';

const Choice = (props) => {
  const [selectedOptions, setSelectedOptions] = useState({
    color: null,
    size: null,
    amount: null,
  });
  const [frameShift, setFrameShift] = useState(-6);
  const [sizeButtonStatus, setSizeButtonStatus] = useState([]);
  const [stockMax, setStockMax] = useState(0);
  const [amount, setAmount] = useState(0);
  const [isAmountTop, setIsAmountTop] = useState(false);
  const [cartIsAdded, setCartIsAdded] = useState(false);

  const handleSelectColor = (colorName, colorCode, index) => {
    const shiftPerEach = window.innerWidth > 1279 ? 56 : 51;
    setFrameShift(`${-6 + index * shiftPerEach}px`);
    setSelectedOptions({
      ...selectedOptions,
      color: { colorName, colorCode },
      size: null,
      amount: null,
    });
    initiateSizeStatus(colorCode);
    setAmount(0);
    setCartIsAdded(false);
    setIsAmountTop(false);
  };

  function initiateSizeStatus(colorCode) {
    const sizeArray = props.product.sizes;
    const sizeVariants = props.product.variants.filter(
      (variant) => variant.color_code === colorCode
    );
    const stockArray = sizeArray.map((size) => {
      return sizeVariants.find((variant) => variant.size === size).stock;
    });
    const statusArray = sizeArray.map((size, index) => {
      const cartNum = prevCartNum(colorCode, size);
      if (stockArray[index] - cartNum > 0) {
        return 'inStock';
      }
      return 'outOfStock';
    });
    setSizeButtonStatus(statusArray);
  }

  const handleSelectSize = (buttonSize, buttonIndex) => {
    if (
      selectedOptions.color !== null &&
      sizeButtonStatus[buttonIndex] === 'inStock'
    ) {
      const statusArray = sizeButtonStatus.map((currentStatus, index) => {
        if (buttonIndex === index) {
          return 'selected';
        } else if (currentStatus === 'selected') {
          return 'inStock';
        }
        return currentStatus;
      });
      setSelectedOptions({
        ...selectedOptions,
        size: buttonSize,
        amount: null,
      });
      const stock = props.product.variants.find(
        (variant) =>
          variant.color_code === selectedOptions.color.colorCode &&
          variant.size === buttonSize
      ).stock;

      setStockMax(stock);
      setSizeButtonStatus(statusArray);
      setAmount(0);
    }
  };

  function prevCartNum(colorCode, size) {
    let cartNum;
    if (props.cartOrders.length > 0) {
      const sameItemIndex = props.cartOrders.findIndex(
        (order) =>
          order.id === props.product.id &&
          order.color.code === colorCode &&
          order.size === size
      );
      if (sameItemIndex > -1) {
        cartNum = props.cartOrders[sameItemIndex].qty;
      } else {
        cartNum = 0;
      }
    } else {
      cartNum = 0;
    }
    return cartNum;
  }

  const handleAmount = (delta) => {
    if (selectedOptions.size !== null && !(delta < 0 && amount === 0)) {
      const cartNum = prevCartNum(
        selectedOptions.color.colorCode,
        selectedOptions.size
      );
      if (amount + delta === 0) {
        setAmount(0);
        setSelectedOptions({ ...selectedOptions, amount: null });
      } else if (amount + delta + cartNum <= stockMax) {
        setAmount(amount + delta);
        setSelectedOptions({
          ...selectedOptions,
          amount: amount + delta,
        });
      }
      if (amount + delta + cartNum === stockMax + 1) {
        setIsAmountTop(true);
      } else {
        setIsAmountTop(false);
      }
    }
  };

  return (
    <>
      <ChoiceContainer>
        <ColorContainer>
          <ColorText>顏色｜</ColorText>
          <ColorButtons>
            <ColorChosenFrame
              frameShift={frameShift}
              status={selectedOptions.color === null ? 'off' : 'on'}
            />
            {props.product.colors.map((color, index) => (
              <ColorButton
                key={index}
                backgroundColor={`#${color.code}`}
                onClick={() => handleSelectColor(color.name, color.code, index)}
              />
            ))}
          </ColorButtons>
        </ColorContainer>
        <SizeContainer>
          <SizeText>尺寸｜</SizeText>
          <SizeButtons>
            {props.product.sizes.map((size, index) => (
              <SizeButton
                key={index}
                status={sizeButtonStatus[index]}
                onClick={() => handleSelectSize(size, index)}
              >
                <SizeLetter>{size}</SizeLetter>
              </SizeButton>
            ))}
          </SizeButtons>
        </SizeContainer>
        <AmountContainer>
          <AmountText>數量｜</AmountText>
          <Counter status={selectedOptions.size === null ? 'off' : 'on'}>
            <Operator
              status={selectedOptions.size === null ? 'off' : 'on'}
              onClick={() => handleAmount(-1)}
            >
              -
            </Operator>
            <Amount status={selectedOptions.size === null ? 'off' : 'on'}>
              {amount}
            </Amount>
            <Operator
              status={selectedOptions.size === null ? 'off' : 'on'}
              onClick={() => handleAmount(+1)}
            >
              +
            </Operator>
          </Counter>
          <NoticeTextCounter status={isAmountTop === true ? 'on' : 'off'}>
            庫存：最後 {amount} 件！
          </NoticeTextCounter>
        </AmountContainer>
      </ChoiceContainer>
      <AddToCartButton
        cartOrders={props.cartOrders}
        setCartOrders={props.setCartOrders}
        product={props.product}
        setProduct={props.setProduct}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        setFrameShift={setFrameShift}
        setSizeButtonStatus={setSizeButtonStatus}
        stockMax={stockMax}
        setAmount={setAmount}
        cartIsAdded={cartIsAdded}
        setCartIsAdded={setCartIsAdded}
      />
    </>
  );
};

export default Choice;
