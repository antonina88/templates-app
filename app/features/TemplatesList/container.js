import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TemplateItem from './component';
import { getTemplatesThunk } from '../shared/actions';

class TemplateList extends Component {
  componentDidMount() {
    const { getTemplatesThunk } = this.props;

    getTemplatesThunk();
  }

  render() {
    const { templates } = this.props;

    const templatesList = templates && templates.map(template => {
      return (
        <TemplateItem
          key={template._id}
          template={template}
        />
      );
    });

    return (
      <table className='templates-container'>
        <tbody>
          <tr>
            <th className='template__column'>name</th>
            <th className='template__column'>date</th>
          </tr>
          {templatesList}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  templates: state.templates.templates,
});

export default connect(
  mapStateToProps,
  { getTemplatesThunk },
)(TemplateList);

TemplateList.propTypes = {
  getTemplatesThunk: PropTypes.func,
  templates: PropTypes.arrayOf(PropTypes.object),
};
