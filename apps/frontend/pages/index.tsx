import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import styles from './index.module.css';
// import type { Table } from '@nx-periodic-table/shared-types';
import axios from 'axios';

// export const Index = () => {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [search, setSearch] = useState('');
//   const [table, setTable] = useState<Table[]>([]);

//   useEffect(() => {
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//     fetch(`http://localhost:3333/search?q=${search}`)
//       .then((resp) => resp.json())
//       .then((data) => setTable(data));
//   }, [search]);

//   const onSetSearch = useCallback(
//     (evt: React.ChangeEvent<HTMLInputElement>) => {
//       setSearch(evt.target.value);
//     },
//     []
//   );

// New code to use real API kineticzephyr.onrender.com/periodictable
function ElementList() {
  const [search, setSearch] = useState('');
  const [element, setElement] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://kineticzephyr.onrender.com/periodictable`
        );
        const results = response.data.data;
        setElement(results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const onSetSearch = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(evt.target.value);
    },
    [setSearch]
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const filteredElement = useMemo(() => {
    if (!element) return [];
    return element.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
  }, [element, search]);

  return (
    <div className={`${styles.page} flex-container`}>
      <h1>Search for element</h1>
      <input
        type="text"
        ref={inputRef}
        value={search}
        onChange={onSetSearch}
        placeholder="Search..."
      />

      <hr className="horizontal-line"></hr>

      <ul>
        {filteredElement.map(({ name, symbol, appearance }, id) => (
          <li key={id}>
            <span className="element-name">{name}</span> <br></br>
            <span className="symbol">{`Symbol: ${symbol}`}</span> <br></br>
            {appearance && (
              <span className="appearence">{`Appearance: ${appearance}`}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ElementList;
