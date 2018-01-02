import * as types from './types';

export default function assets(state={}, action){

  switch (action.type) {
    case types.ON_SIZE_CHANGED:
    return {...state, [action.id]: action.size};
    default:
    return state;
  }

}
