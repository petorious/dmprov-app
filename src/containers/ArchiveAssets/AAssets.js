import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { injectIntl } from 'react-intl';
import { Activity } from '../../containers/Activity';
import {List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {withRouter} from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import { withFirebase } from 'firekit';
import isGranted  from '../../utils/auth';


class Assets extends Component {

  componentDidMount() {
    const { watchList, firebaseApp}=this.props;

    let ref=firebaseApp.database().ref('assets').limitToFirst(20);

    watchList(ref);
  }

  renderList(assets) {
    const {history} =this.props;

    if(assets===undefined){
      return <div></div>
    }

    return _.map(assets, (asset, index) => {

      return <div key={index}>
        <ListItem
          leftAvatar={
            <Avatar
              src={asset.val.photoURL}
              alt="business"
              icon={
                <FontIcon className="material-icons">
                  business
                </FontIcon>
              }
            />
          }
          key={index}
          primaryText={asset.val.name}
          secondaryText={asset.val.full_name}
          onClick={()=>{history.push(`/assets/edit/${asset.key}`)}}
          id={index}
        />
        <Divider inset={true}/>
      </div>
    });
  }


  render(){
    const { intl, assets, muiTheme, history, isGranted } =this.props;

    return (
      <Activity
        isLoading={assets===undefined}
        containerStyle={{overflow:'hidden'}}
        title={intl.formatMessage({id: 'asset_archive'})}>

        <div id="scroller" style={{overflow: 'auto', height: '100%'}}>

          <div style={{overflow: 'none', backgroundColor: muiTheme.palette.convasColor}}>
            <List  id='test' style={{height: '100%'}} ref={(field) => { this.list = field; }}>
              {this.renderList(assets)}
            </List>
          </div>

          <div style={{position: 'fixed', right: 18, zIndex:3, bottom: 18, }}>
          {
              isGranted('create_asset') &&
              <FloatingActionButton secondary={true} onClick={()=>{history.push(`/archive/assets/create`)}} style={{zIndex:3}}>
                <FontIcon className="material-icons" >add</FontIcon>
              </FloatingActionButton>
          }
          </div>
      </div>
    </Activity>
  );

}

}

Assets.propTypes = {
  assets: PropTypes.array.isRequired,
  history: PropTypes.object,
  isGranted: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { auth, browser, lists } = state;

  return {
    assets: lists.assets,
    auth,
    browser,
    isGranted: grant=>isGranted(state, grant)
  };
};


export default connect(
  mapStateToProps,
)(injectIntl(muiThemeable()(withRouter(withFirebase(Assets)))));