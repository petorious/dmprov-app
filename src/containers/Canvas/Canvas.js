import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { ReactGridLayout } from 'react-grid-layout';

import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { injectIntl, intlShape } from 'react-intl';
import { ReduxIcon } from '../../components/Icons';
import { Activity } from '../../containers/Activity';
import Canvas from '../../components/Canvas/Canvas';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { withFirebase } from 'firekit';
import FontIcon from 'material-ui/FontIcon';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { onLayoutChange } from '../../store/grids/actions';



// class Canvas extends Component {

//   componentDidMount(){
//     const {  }=this.props;
//  }
function mapStateToProps(state) {

  const {muiTheme, intl, canvas, } = state;

  // render() {

  //   const {muiTheme, intl, }= this.props;

    return (
      <Activity
        iconElementRight={
          <FlatButton
            style={{marginTop: 4}}
            href="https://github.com/petorious/dmprov-app"
            target="_blank"
            rel="noopener"
            secondary={true}
            icon={<ReduxIcon/>}
          />
        }
        
        title={intl.formatMessage({id: 'canvas'})}>
        <div>
        <div className="canvas">
      
          <ReactGridLayout  {...this.props.canvas}>
          {/* this.props.children */}
          </ReactGridLayout>
        </div>
        <FloatingActionButton
          //onClick={()=>{history.push(`/chats/create`)}}
          style={{
            position: 'fixed',
            zIndex:99,
            right:this.props.right||30,
            bottom: 35,
            color: muiTheme.palette.primary1Color,
            fontFamily: muiTheme.fontFamily,
          }}
          
          secondary={true}>
          <FontIcon className="material-icons" >add</FontIcon>
        </FloatingActionButton>
        </div>

        

      </Activity>
    );
  }



// Canvas.propTypes = {
//   intl: intlShape.isRequired,
// };

// const mapStateToProps = (state) => {
//   const { paths } = state;

//   return {
    
//   };
// };

const mapDispatchToProps = (dispatch) => {
  return {

    onLayoutChange:(layout)=>{
      dispatch(onLayoutChange(layout));
    },

  }
}


export default connect(
  mapStateToProps
)(injectIntl(muiThemeable()(withFirebase(Canvas))));
