import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ className, value, onChange, placeholderText, name, type }) => {
  return (
    <input
      className={className}
      name={name}
      onChange={onChange}
      placeholder={placeholderText}
      type={type}
      value={value}
    />
  );
};

export default Input;

Input.propTypes = {
  className: PropTypes.string,
  placeholderText: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};