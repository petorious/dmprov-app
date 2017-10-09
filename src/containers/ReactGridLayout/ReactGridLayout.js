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

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ReactGridLayout);