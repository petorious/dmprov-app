import React from 'react';
import { ResponsiveReactGridLayout } from 'react-grid-layout';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {GRID_MARGIN, GRID_UNIT} from 'constants';

//*note lower RGL is static 

const ReactGridLayout = (props) => {
  const {  muiTheme, ...rest } = props;
  const styles = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    gridList: {
      width: 500,
      height: 500,
      overflowY: 'auto',
      marginBottom: 24,
    },
    paper:{
      height: 100,
      width: 100,
      margin: 5,
      textAlign: 'center',
      display: 'inline-block',
    }
   };
  let layoutToSave=undefined
  }; 
  

function handleLayoutChange(layout) {
  {
      

  const {reactGridLayout, onLayoutChange} = this.props
 
  const layoutToSave=layout;  

  function getWidthAndCols() {
  function gridWidth(cols, gridUnit, marginSize) {
    return (cols * gridUnit) + ((cols - 1) * marginSize);
  }

  const screenWidth = window.innerWidth;
  let cols = 1;
  let width = gridWidth(cols, GRID_UNIT, GRID_MARGIN);
  while (width <= screenWidth) {
    cols++;
    width = gridWidth(cols, GRID_UNIT, GRID_MARGIN);
    }

  return [width, cols];
  }

  const initialWidthAndCols = getWidthAndCols();

  const initialState = ({
        layout: {
          a: { i: 'a', x: 7, y: 5, w: 4, h: 2 },
          b: { i: 'b', x: 2, y: 1, w: 5, h: 1 },
          c: { i: 'c', x: 4, y: 3, w: 3, h: 2 },
        },
        width: initialWidthAndCols[0],
        cols: initialWidthAndCols[3],
        rowHeight: GRID_UNIT,
        margin: [GRID_MARGIN, GRID_MARGIN],
        verticalCompact: false,
      });
  var layout = [
      {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
      {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
      {i: 'c', x: 4, y: 0, w: 1, h: 2}
       ] 

  var layouts = reactGridLayout.layout?{lg:reactGridLayout.layout}:{lg:layout}
  }
   render () ; 
     const rglProps = {
        isResizable: false,
        // onDrag: this.onDrag,
        // onDragStart: this.onDragStart,
        // onDragStop: this.onDragStop,
        onLayoutChange: this.onLayoutChange,
        // onResize: this.onResize,
        // onResizeStart: this.onResizeStart,
        // onResizeStop: this.onResizeStop,
      };
    
      const renderedWidgets = this.props.widgets.map(this.renderWidget);

      const dashProps = this.props.dashboard;
       dashProps.layout = Object.freeze(dashProps.layout);

    return (
      <div>
          <ResponsiveReactGridLayout
            onLayoutChange={handleLayoutChange}
            className="layout"
            layouts={layouts}
            autoSize={true}
            breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
            cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
            ref="grid"
            />
      </div>
    )
    
   }
 


export default muiThemeable()(ReactGridLayout);
