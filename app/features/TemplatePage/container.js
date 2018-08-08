import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import EditBlock from '../../components/EditBlock';
import { editTemplateThunk } from '../shared/actions';

class TemplatePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEdit: false,
      templateText: '',
      templateFontSize: '',
      message: '',
      open: false,
    };

    this.templateRef = createRef();
  }

  onEditTemplate = (event) => {
    const isEditableClass = event.target.className;
    const prevElement = document.querySelector('.editable.active');

    if (prevElement) {
      prevElement.classList.remove('active');
    }

    if (isEditableClass === 'editable') {
      event.target.classList.toggle('active');

      this.setState({
        isEdit: true,
        templateText: event.target.innerText,
      });
    }
  }

  onChange = (event) => {
    const { name } = event.target;

    this.setState({ [name]: event.target.value });
  }

  toggleEditTemplate = () => {
    const { isEdit } = this.state;

    this.setState({
      isEdit: !isEdit,
    });
  }

  onCancel = () => {
    const selectedElement = document.querySelector('.editable.active');
    selectedElement.classList.remove('active');

    this.toggleEditTemplate();
  }

  handleSubmit = () => {
    const { templateText, templateFontSize } = this.state;
    const { templateItem, editTemplateThunk } = this.props;

    const selectedElement = document.querySelector('.editable.active');

    if (templateText === '' || templateFontSize === '') {
      this.setState({
        message: 'Fields not filled',
        open: true,
      });
    } else {
      selectedElement.classList.remove('active');
      selectedElement.innerText = templateText;
      selectedElement.style.fontSize = `${templateFontSize}px`;

      const template = this.templateRef.current.innerHTML;

      editTemplateThunk({ ...templateItem, template });
      this.toggleEditTemplate();
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  render() {
    const { templateItem } = this.props;
    const { isEdit, open, message, templateText, templateFontSize } = this.state;
    const isPrimary = true;

    const actions = [
      <FlatButton
        label='Close'
        onClick={this.handleClose}
        primary={isPrimary}
      />,
    ];

    const alert = open ? [
      <Dialog
        actions={actions}
        key='modal'
        modal={false}
        onRequestClose={this.handleClose}
        open={open}
      >
        {message}
      </Dialog>,
    ]: null;

    return (
      <div className='template-page'>
        {alert}
        {
          isEdit ? (
            <EditBlock
              handleSubmit={this.handleSubmit}
              onCancel={this.onCancel}
              onChange={this.onChange}
              templateFontSize={templateFontSize}
              templateText={templateText}
            />
          ) : null
        }
        <h1 className='template-caption'>
          {templateItem.name}
        </h1>
        <div
          dangerouslySetInnerHTML={{ __html: templateItem.template }}
          onDoubleClick={this.onEditTemplate}
          ref={this.templateRef}
        />

        <time className='date'>{new Date(templateItem.modified).toLocaleDateString()}</time>
      </div>
    );
  }
}

const mapStateToProps = (state, { match }) => {
  const { templates } = state.templates;
  const templateId = match.params.id;

  const templateItem = templates.find(template => template._id === templateId);

  return { templateItem };
};

export default connect(
  mapStateToProps,
  { editTemplateThunk },
)(TemplatePage);

TemplatePage.propTypes = {
  editTemplateThunk: PropTypes.func,
  templateItem: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    modified: PropTypes.string,
    template: PropTypes.string,
  }),
};
