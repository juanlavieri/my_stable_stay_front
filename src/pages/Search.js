import React, { useState } from 'react';
import axios from 'axios';

function Search() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/stables/search', {
        // Add necessary parameters for search
      });
      setSearchResults(response.data);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <h2>Search for Stables</h2>
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResults.map(result => (
          <li key={result._id}>
            {result.name}
            {/* Add other details for each search result */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
