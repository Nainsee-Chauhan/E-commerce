import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import cart_icn from "../Assets/cart_icn.png";
import logo1 from "../Assets/logo1.png";
import { SearchResults } from "./SearchResults";
import { FaSearch } from "react-icons/fa";

const Navbar = ({ cartLength }) => {
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const fetchData = (value) => {
    fetch(`https://dummyjson.com/products/search?q=${value}`)
      .then((response) => response.json())
      .then(async (json) => {
        const results = await json.products.filter((product) => {
          return (
            product &&
            product.title &&
            product.title.toLowerCase().includes(value)
          );
        });
        setResults(results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setResults([]);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value.toLowerCase());
  };

  // search result
  const handleResultClick = (result) => {
    console.log(result);
    navigate(`/product/${result.id}`);
  };

  return (
    <>
      <div className="navbar">
        <div className="nav-logo">
          <img src={logo1} alt="" />
          <p>SHOPPER</p>
        </div>
        <div className="searchbar">
          {input !== "" && results.length > 0 && (
            <SearchResults
              results={results}
              onResultClick={handleResultClick}
            />
          )}

          <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input
              id="search"
              placeholder="Type to search"
              value={input}
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>
        </div>

        {/* navbar */}
        <div className="nav-cart">
          <Link to="/cart">
            <img src={cart_icn} alt="" />
          </Link>
          <div className="nav-cart-counter">{cartLength.length}</div>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("loggedinUser");
            navigate("/");
          }}
        >
          Sign Out
        </button>
      </div>
    </>
  );
};

export default Navbar;
