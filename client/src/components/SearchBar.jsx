import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Buscar notas..."
        value={query}
        onChange={handleChange}
      />
    </div>

  );
};

export default SearchBar;