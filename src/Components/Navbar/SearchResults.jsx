// import React from 'react'
// import "./SearchResults.css"

// export const SearchResults = ({results}) => {
//   return (
//     <div className='results-list'>
//         {
//             results.map((result, id) => {
//                 return <div key={id}>{result.title}</div>
//             })
//         }

        
//     </div> 
//   )
// } 

import React from 'react';
import './SearchResults.css';

export const SearchResults = ({ results, onResultClick }) => {
  const handleClick = (result) => {
    localStorage.setItem('storedItem', JSON.stringify(result))
    onResultClick(result)
  }
  return (
    <div className='results-list'>
      {results.map((result, id) => (
        <div key={id} onClick={() => handleClick(result)}>
          {result.title}
        </div>
      ))}
    </div>
  );
};


