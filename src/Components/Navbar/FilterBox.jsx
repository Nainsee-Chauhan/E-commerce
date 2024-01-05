
// // FilterBox.js
// import React, { useState } from "react";
// import "./FilterBox.css";

// const FilterBox = ({ onClose, onApplyFilters }) => {
//   const [priceRange, setPriceRange] = useState([0, 2000]);

//   const handleApplyFilters = () => {
//     // Assuming onApplyFilters is a callback function that filters products
//     // and it's passed from the parent component (e.g., Home)
//     if (typeof onApplyFilters === 'function') {
//       onApplyFilters(priceRange);
//     }
//     onClose();
//   };

//   return (
//     <div className="filter-box">
//       <div className="price-filter">
//         <label>Price Range:</label> 
//         <input
//           type="range"
//           min={0}
//           max={2000}
//           value={priceRange[1]}
//           onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
//         />
//         <span>${priceRange[0]}</span> - <span>${priceRange[1]}</span>
//       </div>
//       <button onClick={handleApplyFilters}>Apply Filters</button>
//     </div>
//   );
// };

// export default FilterBox;
