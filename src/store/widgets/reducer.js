import * as types from './types';

export default function widget(state={}, action){

  switch (action.type) {
    case types.ON_WIDGET_CHANGED:
    return {...state, [action.id]: action.widget};
    default:
    return state;
  }

}
