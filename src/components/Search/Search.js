import React from 'react';
import PropTypes from 'prop-types';

import './Search.css';

const Search = ({onChange}) => (
  <input
    type="text"
    className="search"
    onChange={onChange}
    placeholder="Search..." />
);

Search.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default Search;
