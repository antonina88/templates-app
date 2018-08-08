import { GET_TEMPLATES, EDIT_TEMPLATE } from './constants';

export const getTemplates = (payload) => ({
  type: GET_TEMPLATES,
  payload,
});

export const editTemplate = (payload) => ({
  type: EDIT_TEMPLATE,
  payload,
});

export const getTemplatesThunk = () => {
  return (dispatch, state, api) => {
    return api('templates')
      .then(response => {
        dispatch(getTemplates(response.data));
      });
  };
};

export const editTemplateThunk = (body) => {
  return (dispatch, state, api) => {
    return api(`templates/${body._id}`, 'patch', body, { 'Content-Type': 'application/json' })
      .then(response => {
        dispatch(editTemplate(response.data));
      });
  };
};
