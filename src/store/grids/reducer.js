import * as types from './types';

export default function grids(state={}, action){

  switch (action.type) {
    case types.ON_LAYOUT_CHANGED:
    return {...state, [action.id]: action.layout};
    default:
    return state;
  }

}
