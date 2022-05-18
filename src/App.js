import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';
import Suggestion from './components/Suggestion';

function App() {
  const [query, setQuery] = useState('');
  const [regions, setRegions] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const loadRegions = async () => {
      const res = await axios.get(
        `https://base.amberstudent.com/api/v0/regions?sort_key=search_name&sort_order=desc&states=active&search_name=${query}`
      );
      setRegions(res.data.data.result.splice(0, 5));
    };
    loadRegions();
  }, [query]);

  const handleQueryChange = (e) => {
    if (e.target.value.length > 0 && e.target.value.length < 3) {
      setSuggestions([{ name: 'Please enter at least 3 characters' }]);
    } else if (regions.length === 0) {
      setSuggestions([{ name: 'No relevant data found' }]);
    } else {
      setSuggestions(regions);
    }
    setQuery(e.target.value);
  };
  return (
    <div className="App">
      <header className="App-header">
        <input
          placeholder="Search location..."
          type="text"
          value={query}
          onChange={handleQueryChange}
          onFocus={() => setSuggestions(regions)}
          onBlur={() => setTimeout(setSuggestions([]), 100)}
        />
        {suggestions &&
          suggestions.map((suggestion) => (
            <Suggestion
              key={suggestion.name}
              onClick={() => setQuery(suggestion.name)}
              suggestion={suggestion}
            />
          ))}
      </header>
    </div>
  );
}

export default App;
