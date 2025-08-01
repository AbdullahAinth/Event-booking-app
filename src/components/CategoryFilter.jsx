import React, { useContext } from 'react';
import { eventsData } from '../data/events';
import "../App.css";

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
  const categories = ['All', ...new Set(eventsData.map(event => event.category))];
  return (
    <div className="category-filter">
      {categories.map((category) => (
        <button
          key={category}
          className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;