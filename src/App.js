import React, { useState, useEffect } from 'react';
import data from './data.json';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';

const getLocalCartData = () => {
  let newCartData = localStorage.getItem('cartItems');
  if (!newCartData || newCartData === '') {
    return null;
  } else {
    return JSON.parse(newCartData);
  }
};

const App = () => {
  const [products, setProducts] = useState(data.products);
  const [cartItems, setCartItems] = useState(getLocalCartData());
  const [size, setSize] = useState('');
  const [sort, setSort] = useState('');

  const removeFromCart = (product) => {
    const updatedCartItems = cartItems.filter(
      (item) => item._id !== product._id
    );
    setCartItems(updatedCartItems);
  };

  const addToCart = (product) => {
    let alreadyInCart = false;
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === product._id) {
        alreadyInCart = true;
        return { ...item, count: item.count + 1 };
      }
      return item;
    });

    if (!alreadyInCart) {
      updatedCartItems.push({ ...product, count: 1 });
    }

    setCartItems(updatedCartItems);
  };

  const sortProducts = (event) => {
    const sortValue = event.target.value;
    setSort(sortValue);
    setProducts(
      [...products].sort((a, b) => {
        if (sortValue === 'lowest') {
          return a.price - b.price;
        } else if (sortValue === 'highest') {
          return b.price - a.price;
        } else {
          return a._id - b._id;
        }
      })
    );
  };

  const filterProducts = (event) => {
    const sizeValue = event.target.value;
    setSize(sizeValue);
    if (sizeValue === '') {
      setProducts(data.products);
    } else {
      setProducts(
        data.products.filter((product) =>
          product.availableSizes.includes(sizeValue)
        )
      );
    }
  };

  useEffect(() => {
    if (products !== null && products !== undefined) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    if (cartItems !== null && cartItems !== undefined) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  return (
    <div className="grid-container">
      <header>
        <a href="/">React Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter
              count={products.length}
              size={size}
              sort={sort}
              filterProducts={filterProducts}
              sortProducts={sortProducts}
            />
            <Products products={products} addToCart={addToCart} />
          </div>
          <div className="sidebar">
            <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
          </div>
        </div>
      </main>
      <footer>All rights reserved.</footer>
    </div>
  );
};

export default App;
