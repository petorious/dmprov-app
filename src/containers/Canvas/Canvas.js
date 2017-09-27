import React, {Component} from 'react';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { injectIntl, intlShape } from 'react-intl';
import { ReduxIcon } from '../../components/Icons';
import { Activity } from '../../containers/Activity';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {Line, Bar, Doughnut} from 'react-chartjs-2';
import { withFirebase } from 'firekit';
import CountUp from 'react-countup';
import FontIcon from 'material-ui/FontIcon';
import FloatingActionButton from 'material-ui/FloatingActionButton';


class Canvas extends Component {

  componentDidMount(){
    const {  }=this.props;

 
  }

  render() {

    const {muiTheme, intl, }= this.props;

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

}

Canvas.propTypes = {
  intl: intlShape.isRequired,
};

const mapStateToProps = (state) => {
  const { paths } = state;

  return {
    
  };
};

export default connect(
  mapStateToProps
)(injectIntl(muiThemeable()(withFirebase(Canvas))));
