import { Link } from 'react-router-dom';
import './User.css';
import cartImg from '../../img/cart.png';
import cartHoverImg from '../../img/cart-hover.png';
import carMobileImg from '../../img/cart-mobile.png';
import memberImg from '../../img/member.png';
import memberHoverImg from '../../img/member-hover.png';
import memberMobileImg from '../../img/member-mobile.png';

const Cart = (props) => {
  return (
    <Link to="/checkout" className="icon-container">
      <div className="icon-img-container">
        <img
          src={cartImg}
          alt="cart-icon"
          className="cart-icon-desktop icon-init"
        />
        <img
          src={cartHoverImg}
          alt="cart-icon"
          className="cart-icon-desktop icon-hover"
        />
        <img src={carMobileImg} alt="cart-icon" className="cart-icon-mobile" />
        <div
          className="cart-count"
          style={{ display: props.cartOrders.length === 0 ? 'none' : 'flex' }}
        >
          <p className="cart-count-num">
            {props.cartOrders.length === 0
              ? 0
              : props.cartOrders.reduce(
                  (total, order) => (total += order.qty),
                  0
                )}
          </p>
        </div>
      </div>
      <p className="icon-cart-text">購物車</p>
    </Link>
  );
};

const Member = () => {
  return (
    <Link to="#" className="icon-container">
      <div className="icon-img-container">
        <img
          src={memberImg}
          alt="member-icon"
          className="member-icon-desktop icon-init"
        />
        <img
          src={memberHoverImg}
          alt="member-icon"
          className="member-icon-desktop icon-hover"
        />
        <img
          src={memberMobileImg}
          alt="member-icon"
          className="member-icon-mobile"
        />
      </div>
      <p className="icon-member-text">會員</p>
    </Link>
  );
};

const User = (props) => {
  return (
    <div className="user-record">
      <Cart cartOrders={props.cartOrders} />
      <Member />
    </div>
  );
};

export default User;
