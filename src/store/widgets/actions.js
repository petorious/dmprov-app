import * as types from './types';

export function onWidgetChange(widget){
  return {
    type: types.ON_WIDGET_CHANGED,
    widget,
    
  };
}
