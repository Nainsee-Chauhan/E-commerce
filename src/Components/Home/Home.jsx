// import React, { useEffect, useState } from "react";
// import Navbar from "../Navbar/Navbar";
// import Hero from "../hero/Hero";
// import Card from "../Card/Card";
// import "../Card/Card.css";
// import Footer from "../Footer/Footer";

// const Home = () => {
//   const [products, setProducts] = useState([]);
//   const [apiStatus, setApiStatus] = useState("");
//   const [cartItems, setCartItems] = useState([]);

//   // dropdown

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const authToken = localStorage.getItem("authToken");

//         if (!authToken) {
//           console.error("Authentication token not found. Please log in.");
//           return;
//         }

//         const apiUrl = "https://dummyjson.com/products"; // Replace with your actual API URL
//         const response = await fetch(apiUrl, {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         });

//         const data = await response.json();
//         console.log(data);
//         setProducts(data.products);
//         setApiStatus("success");
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setApiStatus("error");
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleAddToCart = (product) => {
//     // Your logic to add the product to the cart
//     console.log("Adding to cart:", product);
//     // For simplicity, let's assume you are storing cart items in local storage
//     const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
//     localStorage.setItem("cart", JSON.stringify([...cartItems, product]));
//   };
//   // const handleAddToCart = (product) => {
//   //   const updatedCart = [...cartItems, product];
//   //   setCartItems(updatedCart);
//   //   localStorage.setItem("cart", JSON.stringify(updatedCart));
//   // };

//   return (
//     <>
//       <div>
//         <Navbar />
//         <Hero />
//         {apiStatus === "success" ? (
//           <div className="product-cards-container">
//             <h3>Products</h3>
//             <div className="card1">
//               {products.map((product) => (
//                 <Card key={product.id} product={product} onAddToCart={handleAddToCart} />
//               ))}
//             </div>
//           </div>
//         ) : (
//           <p>
//             {apiStatus === "error" ? "Error fetching products." : "Loading..."}
//           </p>
//         )}

//         <Footer/>
//       </div>
//     </>
//   );
// };

// export default Home;




// Home.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Hero from "../hero/Hero";
import Card from "../Card/Card";
import "../Card/Card.css"; 
import Footer from "../Footer/Footer";
import { FaFilter } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import Product from "../Product/Product";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [apiStatus, setApiStatus] = useState("");
  const [showFilterBox, setShowFilterBox] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const[ cartLength, setCartLength] = useState(JSON.parse(localStorage.getItem('cart')) || [])
  const navigate = useNavigate()
  useEffect(()=>{
    if(!localStorage.getItem("loggedinUser")){
      navigate("/")
    }
  })
  useEffect(() => {
    const fetchProducts = async () => {
      // Fetch products as before...
      try {
                const authToken = localStorage.getItem("authToken");
        
                if (!authToken) {
                  console.error("Authentication token not found. Please log in.");
                  return;
                }
        
                const apiUrl = "https://dummyjson.com/products"; // Replace with your actual API URL
                const response = await fetch(apiUrl, {
                  headers: {
                    Authorization: `Bearer ${authToken}`,
                  },
                });
        
                const data = await response.json();
                console.log(data);
                setProducts(data.products);
                setApiStatus("success");
              } catch (error) {
                console.error("Error fetching products:", error);
                setApiStatus("error");
              }
        
    };

    fetchProducts();
  }, []);

      // cart
  const handleAddToCart = (product) => {
    console.log("Adding to cart:", product);
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        localStorage.setItem("cart", JSON.stringify([...cartItems, product]));
        setCartLength(cartLength+1)
  };

      // filter
  const applyFilters = () => {
    const filtered = products.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    setFilteredProducts(filtered);
    setShowFilterBox(false); 
  };

  const toggleFilterBox = () => {
    setShowFilterBox(!showFilterBox);
  };

  return (
    <>
      <div>
        <Navbar cartLength={cartLength}/>
        <Hero />
        <div className="filter-wrapper" onClick={toggleFilterBox}>
          <FaFilter id="filter-icon" />
        </div>
        {showFilterBox && (
          <div className="filter-box">
            <div className="price-filter">
              <IoIosClose  
              style={{ marginLeft: '11rem', width:"20px", height:'20px'}}
               onClick={() => setShowFilterBox(false)}/>
              <label>Price Range:</label>
              <input
                type="range"
                min={0}
                max={2000}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              />
              <span>${priceRange[0]}</span> - <span>${priceRange[1]}</span>
            </div>
            <button  onClick={applyFilters}>Apply </button>
          </div>
        )}
        {apiStatus === "success" ? (
          <div className="product-cards-container"> 
            <h3>PRODUCTS</h3>
            <div className="card1">
              {filteredProducts.length > 0
                ? filteredProducts.map((product) => (
                    <Card key={product.id} product={product} onAddToCart={handleAddToCart} />
                  ))
                : products.map((product) => (
                    <Card key={product.id} product={product} onAddToCart={handleAddToCart} />
                  ))}
            </div>
          </div>
        ) : (
          <p>{apiStatus === "error" ? "Error fetching products." : "Loading..."}</p>
        )}
        <Footer />
      </div>
    </>
  );
};

export default Home;
