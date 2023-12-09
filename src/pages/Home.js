import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import axios from 'axios';

function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (searchTerm) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:3001/api/stables/search?query=${searchTerm}`,
      );
      setSearchResults(response.data);
    } catch (err) {
      setError(err.message);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <main>
        <section>
          <SearchBar onSearch={handleSearch} />
          {isLoading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          <div>
            {searchResults.map((stable, index) => (
              <div key={index}>{stable.name}</div>
            ))}
          </div>
        </section>
        <section>{/* Featured Listings or Promotions Placeholder */}</section>
      </main>
      <footer>{/* Footer Placeholder */}</footer>
    </div>
  );
}

export default Home;
