import { GET_TEMPLATES, EDIT_TEMPLATE } from './constants';

export const initialState = {
  templates: [],
};

export default function templatesReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TEMPLATES:
      return {
        ...state,
        templates: payload,
      };

    case EDIT_TEMPLATE:
      return {
        ...state,
        templates: state.templates.map(template => template._id === payload._id
          ? payload
          : template
        ),
      };

    default:
      return state;
  }
}
