import * as types from './types';

export function onLayoutChange(layout){
  return {
    type: types.ON_LAYOUT_CHANGED,
    layout,
    
  };
}
