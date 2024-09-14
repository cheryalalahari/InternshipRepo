import React, { useState, useEffect } from 'react';
import '../Components/Search.css'; // Import the CSS file for styling

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the JSON file
    fetch('https://dpaste.com/79QXDY8TD.txt')
      .then(response => response.json())
      .then(data => {
        setAllCountries(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (query === '') {
      setResults([]);
      return;
    }
    // Filter countries based on the query
    const filteredResults = allCountries.filter(item =>
      item.country.toLowerCase().includes(query.toLowerCase()) ||
      item.capital.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filteredResults);
  }, [query, allCountries]);

  const handleChange = event => {
    setQuery(event.target.value);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search by Country name or Capital"
        aria-label="Search"
      />
      <button onClick={handleClear} aria-label="Clear search">⛔</button>
      {query && results.length > 0 && (
        <div className="search-results">
          {results.map((result, index) => (
            <div key={index} className="result-item">
              <div><strong>Country:</strong> {result.country}</div>
              <div><strong>Capital:</strong> {result.capital}</div>
            </div>
          ))}
        </div>
      )}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default SearchBar;