import React, { Component } from 'react';
import formatCurrency from '../util';

export default class Cart extends Component {
  render() {
    const { cartItems } = this.props;
    console.log('cartItems:', cartItems);
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have {cartItems.length} items in the cart
          </div>
        )}
        <div>
          <div>
            <div className="cart">
              <ul className="cart-items">
                {cartItems.map((item) => (
                  <li key={item._id}>
                    <div>
                      <img src={item.image} alt={item.title}></img>
                    </div>
                    <div>
                      <div>{item.title}</div>
                      <div className="price">
                        {formatCurrency(item.price)} x {item.count}{' '}
                      </div>
                      <div className="right">
                        <button
                          className="button"
                          onClick={() => this.props.removeFromCart(item)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {cartItems.length !== 0 && (
              <div className="cart">
                <div className="total">
                  <div>
                    <b>
                      Total:{' '}
                      {formatCurrency(
                        cartItems.reduce((a, c) => a + c.price * c.count, 0)
                      )}
                    </b>
                  </div>
                  <button className="button primary">
                    <b>Proceed</b>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
