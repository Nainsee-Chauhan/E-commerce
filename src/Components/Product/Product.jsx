import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Product.css";
import SimpleImageSlider from "react-simple-image-slider";

const ProductPage = () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || null);

  useEffect(() => {
    const { product } = location.state || {};

    if (product) {
      setProduct(product);
    } else {
      const storedProduct = JSON.parse(localStorage.getItem("storedItem"));

      if (storedProduct) {
        setProduct(storedProduct);
      }
    }
  }, [location.state]);

  if (!product) {
    return <div>No product details available</div>;
  }

  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    images,
  } = product;

  return (
    <div className="product-page">
      <h1>{title}</h1>
      <div className="slider-container">
        <SimpleImageSlider
          width={700}
          height={500}
          images={images.map((img, index) => ({ url: img, id: index }))}
          showBullets={true}
          showNavs={true}
        />
      </div>
      <p>{description}</p>
      <p>Price: ${price}</p>
      <p>Discount Price: ${discountPercentage}</p>
      <p className="rating">Rating: {rating}</p>
      <p className="stock">Stock: {stock}</p>
      <p>Brand: {brand}</p>
      <p>Category: {category}</p>
    </div>
  );
};

export default ProductPage;
