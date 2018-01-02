import React from 'react';
//import RanfiltratorWidget from './RanfiltratorWidget';
import AssetWidget from './AssetWidget';
//import DiceWidget from './DiceWidget';



// intentionally using different style from actiontypes
// to test differences

export const WidgetFactories = {
  AssetWidget: React.createFactory(AssetWidget),
 // DiceWidget: React.createFactory(DiceWidget),
  //RanfiltratorWidget: React.createFactory(RanfiltratorWidget),
};

