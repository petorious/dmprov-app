import React from 'react';
import { React Grid Layout } from 'react-grid-layout';
import muiThemeable from 'material-ui/styles/muiThemeable';


//*note lower RGL is static 

const ReactGridUpper = (props) => {
  const {  muiTheme, ...rest } = props;

  const thumbStyle = {
    backgroundColor: fade(muiTheme.palette.primary1Color, 0.65),
    borderRadius: 3
  };

  return (
    <Scrollbars
      renderThumbVertical={({ style, ...p }) => <div style={{...style, ...thumbStyle}} {...p} />}
      {...rest}
    />
  );

}

export default muiThemeable()(ReactGridUpper);
