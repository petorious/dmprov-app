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
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {withRouter} from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import { withFirebase } from 'firekit';
import isGranted  from '../../utils/auth';
import { FilterDrawer, filterSelectors, filterActions } from 'material-ui-filter'
import Scrollbar from '../../components/Scrollbar/Scrollbar'
import SearchField from '../../components/SearchField/SearchField'
import { ResponsiveMenu } from 'material-ui-responsive-menu'

const path = `/campaigns`

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
          key={index}
          onClick={()=>{history.push(`/campaigns/${campaign.key}`)}}
          primaryText={campaign.val.campaign_name}
          secondaryText={campaign.val.campaign_short_description}
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
          rightIconButton={
           // task.userId===auth.uid?
            <IconButton
              onClick={()=>{history.push(`/campaigns/edit/${campaign.key}`)}}>
              <FontIcon className="material-icons" color={'green'}>{'edit'}</FontIcon>
            </IconButton>
          }
          id={index}
        />
        <Divider inset={true}/>
      </div>
    });
  }


  render(){
    const {
     intl,
     list, 
     setSearch,
     campaigns, 
     muiTheme, 
     history, 
     setFilterIsOpen,
     hasFilters,
     isGranted
   } =this.props;

   const menuList=[
      {
        text: intl.formatMessage({id: 'open_filter'}),
        icon: <FontIcon className="material-icons" color={hasFilters?muiTheme.palette.accent1Color:muiTheme.palette.canvasColor}>filter_list</FontIcon>,
        tooltip:intl.formatMessage({id: 'open_filter'}),
        onClick: ()=>{setFilterIsOpen('users', true)}
      }
    ]

   const filterFields = [
      {
        name: 'displayName',
        label: intl.formatMessage({id: 'name'})
      },
      {
        name: 'system',
        label: intl.formatMessage({id: 'system_label'})
      }
    ];





    return (
      <Activity
        iconStyleLeft={{width: 'auto'}}
        title={intl.formatMessage({id: 'campaigns'})}
        iconStyleRight={{width: '100%', textAlign: 'center', marginLeft: 0}}
        iconElementRight={
          <div style={{display: 'flex'}}>
            <div style={{width: 'calc(100% - 84px)'}}>
              <SearchField
                onChange={(e, newVal) => {
                  setSearch('campaigns', 'displayName', newVal)
                }}
                hintText={`${intl.formatMessage({id: 'campaign_name'})} ${intl.formatMessage({id: 'search'})}`}
              />
            </div>
            <div style={{position: 'absolute', right: 10, width: 100}}>
              <ResponsiveMenu
                iconMenuColor={muiTheme.palette.canvasColor}
                menuList={menuList}
              />
            </div>
          </div>
        }
        isLoading={campaigns===undefined}
        containerStyle={{overflow:'hidden'}}
        >
        <div id="scroller" style={{overflow: 'auto', height: '100%'}}>

          <div style={{overflow: 'none', backgroundColor: muiTheme.palette.convasColor}}>
            <List  id='test' style={{height: '100%'}} ref={(field) => { this.list = field; }}>
              {this.renderList(campaigns)}
            </List>
          </div>

          <div style={{position: 'fixed', right: 18, zIndex:3, bottom: 18, }}>
          {
              isGranted('create_campaign') &&
              <FloatingActionButton secondary={true} onClick={()=>{history.push(`/campaigns/create`)}} style={{zIndex:3}}>
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
  muiTheme: PropTypes.object.isRequired,

};

const mapStateToProps = (state, ownProps) => {
  const { filters, auth, browser, lists } = state;
  const { match } = ownProps

  const isSelecting = match.params.select?match.params.select:false

  const { hasFilters } = filterSelectors.selectFilterProps('companies', filters)
  const list = filterSelectors.getFilteredList('users', filters, lists[path], fieldValue => fieldValue.val)

  return {
    campaigns: lists.campaigns,
    auth,
    browser,
    isSelecting,
    hasFilters,
    isGranted: grant=>isGranted(state, grant)
  };
};


export default connect(
  mapStateToProps, { ...filterActions }
)(injectIntl(muiThemeable()(withRouter(withFirebase(Campaigns)))));
