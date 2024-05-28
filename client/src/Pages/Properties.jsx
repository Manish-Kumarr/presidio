import React, { useEffect, useState } from 'react';
import sortby from '../Assets/dropdown_icon.png';
import Item from '../components/Item/Item';
import './CSS/Properties.css';
import image from '../Assets/house1.jpg';
import axios from 'axios';

const Properties = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc'); // State for sorting order
  const itemsPerPage = 6;

  const handleClick = async (propertyId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/property/${propertyId}`
      );

      const d = {
        NearBy: response.data.nearby,
        Phone: 8882332571,
      };

      alert(JSON.stringify(d));
    } catch (error) {
      console.error('Error fetching property:', error);
    }
  };

  useEffect(() => {
    axios
      .get('http://localhost:5000/property')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleSort = (order) => {
    setSortOrder(order);
  };

  // Sort products based on the sortOrder state
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='properties'>
      <div className='properties-indexsort'>
        <p>
          <span>Showing</span> {indexOfFirstItem + 1}-
          {Math.min(indexOfLastItem, products.length)} out of {products.length}
        </p>
        <div className='properties-sort'>
          Sort by{' '}
          <select
            onChange={(e) => handleSort(e.target.value)}
            value={sortOrder}
          >
            <option value='asc'>Price: Low to High</option>
            <option value='desc'>Price: High to Low</option>
          </select>
          <img src={sortby} alt='sort icon' />
        </div>
      </div>
      <div className='properties-products'>
        {currentItems.map((item, i) => {
          return (
            <div className='hover' onClick={() => handleClick(item._id)}>
              <Item
                key={i}
                id={item._id}
                image={image}
                name={`${item.area}, ${item.place}`}
                new_price={item.price}
                old_price={item.price + 100}
              />
            </div>
          );
        })}
      </div>
      <div className='properties-pagination'>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(Math.ceil(products.length / itemsPerPage)).keys()].map(
          (number) => (
            <button
              key={number + 1}
              onClick={() => paginate(number + 1)}
              className={currentPage === number + 1 ? 'active' : ''}
            >
              {number + 1}
            </button>
          )
        )}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(products.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Properties;
