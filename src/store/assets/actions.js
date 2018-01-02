import * as types from './types';

export function onSizeChange(asset, sizeClass){
  return {
    type: types.ON_SIZE_CHANGED,
    asset,
    sizeClass,
    
  };
}
