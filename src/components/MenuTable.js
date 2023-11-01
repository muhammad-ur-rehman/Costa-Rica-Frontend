import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_MENUS, SEARCH_MENUS } from '../queries';
import SearchBox from './SearchBox';
import '../css/MenuTable.css'; 

const MenuTable = () => {
  const [sortByPrice, setSortByPrice] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { loading, error, data } = useQuery(searchTerm ? SEARCH_MENUS : GET_MENUS, {
    variables: searchTerm ? { name: searchTerm } : { sortByPrice },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const menus = JSON.parse(JSON.stringify(data?.menus || data?.searchMenus));

  const toggleSort = () => {
    setSortByPrice((prevSortByPrice) => !prevSortByPrice);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <SearchBox
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onToggleSort={toggleSort}
        sortByPrice={sortByPrice}
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {menus?.map((menu) => (
            <tr key={menu.id}>
              <td>{menu.id}</td>
              <td>{menu.name}</td>
              <td>{menu.price}</td>
              <td>{menu.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MenuTable;
