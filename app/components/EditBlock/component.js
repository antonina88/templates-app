import React from 'react';
import PropTypes from 'prop-types';

import Input from '../Input';
import Button from '../Button';

const EditBlock = ({ templateFontSize, templateText, onChange, onCancel, handleSubmit }) => {
  return (
    <div className='edit-container'>
      <Input
        className='edit-field'
        name='templateText'
        onChange={onChange}
        placeholderText='Enter text'
        type='text'
        value={templateText}
      />
      <Input
        className='edit-field'
        name='templateFontSize'
        onChange={onChange}
        placeholderText='Enter font-size'
        type='number'
        value={templateFontSize}
      />
      <Button
        className='btn btn-save'
        onClick={handleSubmit}
      >
        Save
      </Button>
      <Button
        className='btn btn-cancel'
        onClick={onCancel}
      >
        Cancel
      </Button>
    </div>
  );
};

export default EditBlock;

EditBlock.propTypes = {
  templateFontSize: PropTypes.string,
  templateText: PropTypes.string,
  onChange: PropTypes.func,
  onCancel: PropTypes.func,
  handleSubmit: PropTypes.func,
};
