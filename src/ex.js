// import React from 'react';
// import data from './data.json';
// import Products from './components/Products';
// import Filter from './components/Filter';
// import Cart from './components/Cart';

// const getLocalCartData = () => {
//   let newCartData = localStorage.getItem('cartItems');
//   if (!newCartData || newCartData === '') {
//     return null;
//   } else {
//     return JSON.parse(newCartData);
//   }
// };

// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       products: data.products,
//       cartItems: getLocalCartData(),
//       size: '',
//       sort: '',
//     };
//   }

//   removeFromCart = (product) => {
//     const cartItems = this.state.cartItems.slice();
//     this.setState({
//       cartItems: cartItems.filter((X) => X._id !== product._id),
//     });
//   };

//   addTocart = (product) => {
//     const cartItems = this.state.cartItems.slice();
//     let alreadyInCart = false;
//     cartItems.forEach((item) => {
//       if (item._id === product._id) {
//         item.count++;
//         alreadyInCart = true;
//       }
//     });

//     if (!alreadyInCart) {
//       cartItems.push({ ...product, count: 1 });
//     }
//     this.setState({ cartItems });
//   };

//   sortProducts = (event) => {
//     const sort = event.target.value;
//     console.log(event.target.value);
//     this.setState((state) => ({
//       sort: sort,
//       products: this.state.products
//         .slice()
//         .sort((a, b) =>
//           sort === 'lowest'
//             ? a.price > b.price
//               ? 1
//               : -1
//             : sort === 'highest'
//             ? a.price < b.price
//               ? 1
//               : -1
//             : a._id > b._id
//             ? 1
//             : -1
//         ),
//     }));
//   };

//   filterProducts = (event) => {
//     console.log(event.target.value);
//     if (event.target.value === '') {
//       this.setState({ size: event.target.value, product: data.products });
//     } else {
//       this.setState({
//         size: event.target.value,
//         products: data.products.filter(
//           (product) => product.availableSizes.indexOf(event.target.value) >= 0
//         ),
//       });
//     }
//   };
//   componentDidUpdate(prevProps) {
//     if (
//       prevProps.products !== this.state.products &&
//       this.state.products !== null &&
//       this.state.products !== undefined
//     ) {
//       localStorage.setItem('products', JSON.stringify(this.state.products));
//     }

//     if (
//       prevProps.cartItems !== this.state.cartItems &&
//       this.state.cartItems !== null &&
//       this.state.cartItems !== undefined
//     ) {
//       localStorage.setItem('cartItems', JSON.stringify(this.state.cartItems));
//     }
//   }

//   render() {
//     return (
//       <div className="grid-container">
//         <header>
//           <a href="/">React Shopping Cart</a>
//         </header>
//         <main>
//           <div className="content">
//             <div className="main">
//               <Filter
//                 count={this.state.products.length}
//                 size={this.state.size}
//                 sort={this.state.sort}
//                 filterProducts={this.filterProducts}
//                 sortProducts={this.sortProducts}
//               ></Filter>
//               <Products
//                 products={this.state.products}
//                 addTocart={this.addTocart}
//               ></Products>
//             </div>
//             <div className="sidebar">
//               <Cart
//                 cartItems={this.state.cartItems}
//                 removeFromCart={this.removeFromCart}
//               />
//             </div>
//           </div>
//         </main>
//         <footer>All rights reserved.</footer>
//       </div>
//     );
//   }
// }

// export default App;

// //////cart.JSON

// import React, { Component } from 'react';
// import formatCurrency from '../util';

// export default class Cart extends Component {
//   render() {
//     const { cartItems } = this.props;
//     console.log('cartItems:', cartItems);
//     return (
//       <div>
//         {cartItems.length === 0 ? (
//           <div className="cart cart-header">Cart is empty</div>
//         ) : (
//           <div className="cart cart-header">
//             You have {cartItems.length} items in the cart
//           </div>
//         )}
//         <div>
//           <div>
//             <div className="cart">
//               <ul className="cart-items">
//                 {cartItems.map((item) => (
//                   <li key={item._id}>
//                     <div>
//                       <img src={item.image} alt={item.title}></img>
//                     </div>
//                     <div>
//                       <div>{item.title}</div>
//                       <div className="price">
//                         {formatCurrency(item.price)} x {item.count}{' '}
//                       </div>
//                       <div className="right">
//                         <button
//                           className="button"
//                           onClick={() => this.props.removeFromCart(item)}
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             {cartItems.length !== 0 && (
//               <div className="cart">
//                 <div className="total">
//                   <div>
//                     <b>
//                       Total:{' '}
//                       {formatCurrency(
//                         cartItems.reduce((a, c) => a + c.price * c.count, 0)
//                       )}
//                     </b>
//                   </div>
//                   <button className="button primary">
//                     <b>Proceed</b>
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// //Filter.js

// import React, { Component } from 'react';

// export default class Filter extends Component {
//   render() {
//     return (
//       <div className="filter">
//         <div className="filter-result">{this.props.count} Products</div>
//         <div className="filter-sort">
//           Order{' '}
//           <select value={this.props.sort} onChange={this.props.sortProducts}>
//             <option>Latest</option>
//             <option value="lowest">Lowest</option>
//             <option value="highest">Highest</option>
//           </select>
//         </div>
//         <div className="filter-size">
//           Filter{' '}
//           <select value={this.props.size} onChange={this.props.filterProducts}>
//             <option value="">ALL</option>
//             <option value="XS">XS</option>
//             <option value="S">S</option>
//             <option value="M">M</option>
//             <option value="L">L</option>
//             <option value="XL">XL</option>
//             <option value="XXL">XXL</option>
//           </select>
//         </div>
//       </div>
//     );
//   }
// }

// //Products.js

// import React, { Component } from 'react';
// import formatCurrency from '../util';

// export default class Products extends Component {
//   render() {
//     return (
//       <div>
//         <ul className="products">
//           {this.props.products.map((product) => (
//             <li key={product._id}>
//               <div className="product">
//                 <a href={'#' + product._id}>
//                   <img src={product.image} alt={product.title}></img>
//                   <p>{product.title}</p>
//                 </a>
//                 <div className="product-price">
//                   <div>{formatCurrency(product.price)}</div>
//                   <button
//                     onClick={() => this.props.addTocart(product)}
//                     className="button primary"
//                   >
//                     Add To Cart
//                   </button>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }
