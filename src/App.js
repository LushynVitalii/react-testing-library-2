import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const URL = "http://hn.algolia.com/api/v1/search";

const getUser = () => Promise.resolve({ id: 1, name: "Yauhen" });

const Search = ({ value, onChange, children }) => (
  <div>
    <label htmlFor="search">{children}</label>
    <input
      placeholder="search text..."
      id="search"
      type="text"
      value={value}
      onChange={onChange}
      // required
    />
  </div>
);

const App = () => {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const userLoad = await getUser();
      setUser(userLoad);
    };

    loadUser();
  }, []);

  const handleChange = ({ target }) => {
    setSearch(target.value);
  };

  // Test case with fetching data
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  const handleFetch = async () => {
    try {
      const result = await axios.get(`${URL}?query=React`);
      setNews(result.data.hits);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div>
      {user && <h2>Logged in as {user.name}</h2>}
      <img className="image" src="" alt="searchImage" />
      <Search value={search} onChange={handleChange}>
        SEARCH:
      </Search>
      <p>Searches for {search ? search : "..."}</p>

      {/* Test case with fetching data */}

      <button type="button" onClick={handleFetch}>
        Fetch News
      </button>

      {error && <span>Something went wrong ...</span>}

      <ul>
        {news.map(({ objectID, url, title }) => (
          <li key={objectID}>
            <a href={url}>{title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;