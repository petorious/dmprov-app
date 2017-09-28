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


class Campaigns extends Component {

  componentDidMount() {
    const { watchList, firebaseApp}=this.props;

    let ref=firebaseApp.database().ref('campaigns').limitToFirst(20);

    watchList(ref);
  }

  renderList(campaigns) {
    const {history} =this.props;

    if(campaigns===undefined){
      return <div></div>
    }

    return _.map(campaigns, (campaign, index) => {

      return <div key={index}>
        <ListItem
          leftAvatar={
            <Avatar
              src={campaign.val.photoURL}
              alt="arc"
              icon={
                <FontIcon className="material-icons">
                  import_contacts
                </FontIcon>
              }
            />
          }
          key={index}
          primaryText={campaign.val.name}
          secondaryText={campaign.val.full_name}
          onClick={()=>{history.push(`/archive/campaigns/edit/${campaign.key}`)}}
          id={index}
        />
        <Divider inset={true}/>
      </div>
    });
  }


  render(){
    const { intl, campaigns, muiTheme, history, isGranted } =this.props;

    return (
      <Activity
        isLoading={campaigns===undefined}
        containerStyle={{overflow:'hidden'}}
        title={intl.formatMessage({id: 'campaign_archive'})}>

        <div id="scroller" style={{overflow: 'auto', height: '100%'}}>

          <div style={{overflow: 'none', backgroundColor: muiTheme.palette.convasColor}}>
            <List  id='test' style={{height: '100%'}} ref={(field) => { this.list = field; }}>
              {this.renderList(campaigns)}
            </List>
          </div>

          <div style={{position: 'fixed', right: 18, zIndex:3, bottom: 18, }}>
          {
              isGranted('create_campaign') &&
              <FloatingActionButton secondary={true} onClick={()=>{history.push(`/archive/campaigns/create`)}} style={{zIndex:3}}>
                <FontIcon className="material-icons" >add</FontIcon>
              </FloatingActionButton>
          }
          </div>
      </div>
    </Activity>
  );

}

}

Campaigns.propTypes = {
  campaigns: PropTypes.array.isRequired,
  history: PropTypes.object,
  isGranted: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { auth, browser, lists } = state;

  return {
    campaigns: lists.campaigns,
    auth,
    browser,
    isGranted: grant=>isGranted(state, grant)
  };
};


export default connect(
  mapStateToProps,
)(injectIntl(muiThemeable()(withRouter(withFirebase(Campaigns)))));