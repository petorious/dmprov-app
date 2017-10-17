import * as types from './types';

export function onLayoutChange(layout, sizeClass){
  return {
    type: types.ON_LAYOUT_CHANGED,
    layout,
    sizeClass,
    
  };
}
