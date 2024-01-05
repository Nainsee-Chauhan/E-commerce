import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
import SimpleImageSlider from "react-simple-image-slider";

const Cart = ({ product }) => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const images = product?.images || [];

  const handleRemoveItem = (itemToRemove) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemToRemove.id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    console.log(localStorage.getItem("cart"));
  };

  return (
    <div className="cart-container">
      <h2>Your Cart </h2>
      {cartItems.length === 0 ? (
        <h5>Your cart is empty !!</h5>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <h3>{item.title}</h3>
              <div className="img">
                <SimpleImageSlider
                  width={220}
                  height={220}
                  images={item.images?.map((img) => ({ url: img }))}
                  showBullets={true}
                  showNavs={true}
                />
              </div>
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
              <p>Discount Price: ${item.discountPercentage}</p>
              <button onClick={() => handleRemoveItem(item)}>Remove</button>
            </div>
          ))}
        </div>
      )}
      <div className="back_btn">
        <Link to="/home">
          <button>Back</button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
