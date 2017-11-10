import React, {Component} from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { onLayoutChange } from '../../store/grids/actions';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import { Responsive, WidthProvider, GridItem } from 'react-grid-layout';
import muiThemeable from 'material-ui/styles/muiThemeable';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import firebase from 'firebase';
import { injectIntl } from 'react-intl';


//import {GRID_MARGIN, GRID_UNIT} from 'constants';

const ResponsiveReactGridLayout = WidthProvider(Responsive);


const ReactGridLayout = (props) => {
  const { muiTheme, ...rest } = props;

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

  return(
    <ResponsiveReactGridLayout
   
    {...rest}
    />
    );
  }



export default muiThemeable()(ReactGridLayout);

