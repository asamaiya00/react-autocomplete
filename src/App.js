import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [regions, setRegions] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const loadregions = async () => {
      const res = await axios.get(
        `https://base.amberstudent.com/api/v0/regions?sort_key=search_name&sort_order=desc&states=active&search_name=${query}`
      );
      setRegions(res.data.data.result.splice(0, 5));
    };
    loadregions();
  }, [query]);

  const handleQueryChange = (e) => {
    console.log(e.target.value);
    if (e.target.value.length > 0 && e.target.value.length < 3) {
      setSuggestions([{ name: 'Please enter at least 3 characters' }]);
    } else if (regions.length === 0) {
      setSuggestions([{ name: 'No relevant data found' }]);
    } else {
      setSuggestions(regions);
    }
    console.log(regions);
    setQuery(e.target.value);
  };
  return (
    <div className="App">
      <header className="App-header">
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          onFocus={() => setSuggestions(regions)}
          onBlur={() => setSuggestions([])}
        />
        {suggestions &&
          suggestions.map((suggestion) => <h3>{suggestion.name}</h3>)}
      </header>
    </div>
  );
}

export default App;
