import { useState } from 'react';
import './SearchBar.css';
import searchImg from '../../img/search.png';

const SearchBar = () => {
  const breakpoint = 1280;
  const [isSearchBarActive, setIsSearchBarActive] = useState(false);
  const [message, setMessage] = useState('');

  const handleSearchBar = () => setIsSearchBarActive((prev) => !prev);
  const handleInput = (event) => setMessage(event.target.value);
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      window.location.href = `./products.html?keyword=${message.trim()}`;
    }
  };

  return (
    <div>
      <div
        className={
          window.innerWidth < breakpoint
            ? `search-bar${isSearchBarActive ? '' : ' hidden-bar'}`
            : 'search-bar'
        }
      >
        <input
          type="text"
          className="search-input"
          onChange={handleInput}
          onKeyDown={handleKeyDown}
        />
      </div>
      <img
        src={searchImg}
        alt="search-icon"
        className="search-icon"
        onClick={handleSearchBar}
      />
    </div>
  );
};

export default SearchBar;
