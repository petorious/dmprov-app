import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactGridLayout from '../../components/ReactGridLayout/ReactGridLayout';
import {onLayoutChange} from '../../grids/actions';

function mapStateToProps(state) {

  const {browser, intl, reactGridLayout} = state;

  return {
    reactGridLayout: reactGridLayout,
    messages:intl.messages,
    browser: browser,
  };

}

const mapDispatchToProps = (dispatch) => {
  return { 


    onLayoutChange:(layout)=>{
      dispatch(onLayoutChange(layout));
    },
  

// function handleLayoutChange(layout) {
//   {
      

  // const {reactGridLayout, onLayoutChange} = this.props
 
  // const layoutToSave=layout;  

// function getWidthAndCols() {
//   function gridWidth(cols, gridUnit, marginSize) {
//     return (cols * gridUnit) + ((cols - 1) * marginSize);
//   }

//   const screenWidth = window.innerWidth;
//   let cols = 1;
//   let width = gridWidth(cols, GRID_UNIT, GRID_MARGIN);
//   while (width <= screenWidth) {
//     cols++;
//     width = gridWidth(cols, GRID_UNIT, GRID_MARGIN);
//     }

//   return [width, cols];
//   }

//   const initialWidthAndCols = getWidthAndCols();

//   const initialState = ({
//         layout: {
//           a: { i: 'a', x: 7, y: 5, w: 4, h: 2 },
//           b: { i: 'b', x: 2, y: 1, w: 5, h: 1 },
//           c: { i: 'c', x: 4, y: 3, w: 3, h: 2 },
//         },
//         width: initialWidthAndCols[0],
//         cols: initialWidthAndCols[3],
//         rowHeight: GRID_UNIT,
//         margin: [GRID_MARGIN, GRID_MARGIN],
//         verticalCompact: false,
//       });

   }
}

export default connect(mapStateToProps,mapDispatchToProps)(ReactGridLayout);