import React, { useState } from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import SimpleImageSlider from "react-simple-image-slider";

const Card = ({ product, onAddToCart }) => {
  const images = product?.images || [];
  const [isAddedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
    setAddedToCart(true);
  };

  return (
    <div className="product-card">
      <h3>{product.title}</h3>
      <Link
        style={{ textDecoration: "none" }}
        key={product.id}
        to={`/product/${product.id}`}
        state={{ product }}
      >
        <div className="image">
          {images.length > 0 && (
            <SimpleImageSlider
              width={265}
              height={220}
              images={images.map((img) => ({ url: img }))}
              showBullets={true}
              showNavs={true}
            />
          )}
        </div>
      </Link>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Discount Price: ${product.discountPercentage}</p>
      <div className="cart">
        <button
          className="cart-btn"
          onClick={handleAddToCart}
          disabled={isAddedToCart}
        >
          {isAddedToCart ? (
            <Link
              to="/cart"
              style={{
                textDecoration: "none",
                color: "black",
                ":hover": { color: "inherit" },
              }}
            >
              Go to Cart
            </Link>
          ) : (
            "Add to Cart"
          )}
        </button>
      </div>
    </div>
  );
};

export default Card;
