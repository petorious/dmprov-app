import React from 'react';
import { ReactGridLayout } from 'react-grid-layout';
import muiThemeable from 'material-ui/styles/muiThemeable';


//*note lower RGL is static 

const ReactGridCanvas = (props) => {
  const {  muiTheme, ...rest } = props;

    render function() {
      var layout = [
      {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
      {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
      {i: 'c', x: 4, y: 0, w: 1, h: 2}
       ];
  return (
    <ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
        <div key="a" data-grid={{x: 0, y: 0, w: 1, h: 2, static: true}}>a</div>
        <div key="b" data-grid={{x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4}}>b</div>
        <div key="c" data-grid={{x: 4, y: 0, w: 1, h: 2}}>c</div>
      </ReactGridLayout>
    )
  }
};


export default muiThemeable()(ReactGridCanvas);
