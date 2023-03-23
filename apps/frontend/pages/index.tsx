import { useEffect, useState, useRef } from 'react';
import styles from './index.module.css';
// import type { Table } from '@nx-periodic-table/shared-types';
import axios from 'axios';

// New code to use real API kineticzephyr.onrender.com/periodictable
function ElementList() {
  const [search, setSearch] = useState('');
  const [elements, setElements] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3333/table?q=${search}`
        );
        const results = response.data;
        setElements(results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [search]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  return (
    <div className={`${styles.page} flex-container`}>
      <h1>Search for element</h1>
      <input
        type="text"
        ref={inputRef}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />

      <hr className="horizontal-line"></hr>

      {elements.length === 0 ? (
        'Loading or empty...'
      ) : (
        <ul>
          {elements.map(({ name, symbol, appearance }, id) => (
            <li key={id}>
              <span className="element-name">{name}</span> <br></br>
              <span className="symbol">{`Symbol: ${symbol}`}</span>
              <br></br>
              {appearance && (
                <span className="appearence">{`Appearance: ${appearance}`}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ElementList;
