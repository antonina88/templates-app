import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const TemplateItem = ({ template }) => {
  return (
    <tr className='template'>
      <td className='template__column'>
        <Link
          className='template__link'
          to={`/templates/${template._id}`}
        >
          {template.name}
        </Link>
      </td>
      <td className='template__column'>
        <time>{new Date(template.modified).toLocaleDateString()}</time>
      </td>
    </tr>
  );
};

export default TemplateItem;

TemplateItem.propTypes = {
  template: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    modified: PropTypes.string,
    template: PropTypes.string,
  }),
};
