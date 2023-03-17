import { useEffect, useState, useCallback, useRef } from 'react';
import styles from './index.module.css';
import type { Table } from '@nx-periodic-table/shared-types';

export const Index = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState('');
  const [table, setTable] = useState<Table[]>([]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    fetch(`http://localhost:3333/search?q=${search}`)
      .then((resp) => resp.json())
      .then((data) => setTable(data));
  }, [search]);

  const onSetSearch = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(evt.target.value);
    },
    []
  );
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
        {table.map(({ name, symbol }, id) => (
          <li key={id}>
            {name} - <span>{`symbol: ${symbol}`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
