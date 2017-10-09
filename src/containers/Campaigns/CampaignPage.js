import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setSimpleValue } from '../../store/simpleValues/actions';
import { setPersistentValue } from '../../store/persistentValues/actions';
import { onLayoutChange } from '../../store/grids/actions';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { injectIntl } from 'react-intl';
import { Activity } from '../../containers/Activity';
import {List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {withRouter} from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import { withFirebase } from 'firekit';
import { Tabs, Tab } from 'material-ui/Tabs'
import Scrollbar from '../../components/Scrollbar/Scrollbar'
import { filterSelectors, filterActions } from 'material-ui-filter'
import isGranted  from '../../utils/auth';

//attempt at doing the campaign page path campaign name thing 
const path='/campaigns'

const tabPath = '/campaign_tabs'

class CampaignPage extends Component {

  componentDidMount() {
      const { watchList, firebaseApp, auth, uid, path  }=this.props;
     
      let ref=firebaseApp.database().ref('assets')
      .orderByChild('currentCampaignUid')
      .equalTo('-KvecdzKQJ6qlr6U79Xc')
     // .equalTo('${auth.uid}') - doesnt work. object returns 'undefined'
      .limitToFirst(20);

      watchList(ref);
    }


  handleTabActive = (value,) => {
    const { history, uid, firebaseApp } = this.props
    let key=firebaseApp.database().ref(`/campaign_tabs/${uid}/`).push().key

    history.push(`${path}/${key}`)
  }

  // handleLayoutChange = (layout) => {
  //   const {setOnLayoutChange}=this.props
  //   setOnLayoutChange{'on_layout_change', true}

  // }

 


  renderList(assets) {
    const {history, currentCampaignUid, list} =this.props;

  //const currentCampaignUid=key;

    if(assets===undefined){
      return <div></div>
    }

    return _.map(assets, (asset, index) => {



      return <div key={index}>
        <ListItem
          leftAvatar={
            <Avatar
              src={asset.val.photoURL}
              alt="arc"
              icon={
                <FontIcon className="material-icons">
                  add_circle
                </FontIcon>
              }
            />
          }
          key={index}
          primaryText={asset.val.asset_name}
          secondaryText={asset.val.asset_slug}
          id={index}
        />
         
        <Divider inset={true}/>
      </div>
    });
  }


  render(){
    const { intl, assets, muiTheme, history, isGranted, campaignDisplayName, currentCampaignUid, uid } =this.props;

    return (
      <Activity
        isLoading={assets===undefined}
        containerStyle={{overflow:'hidden'}}
        title={`${currentCampaignUid}`}
        >
        <Scrollbar>
          <Tabs
            //value={editType}
            onChange={this.handleTabActive}>
            <Tab
             // value={'1'}
              icon={<FontIcon className="material-icons">tab</FontIcon>}>
               <div style={{overflow: 'none', backgroundColor: muiTheme.palette.convasColor}}>
                 <List  id='test' style={{height: '100%'}} ref={(field) => { this.list = field; }}>
                    {this.renderList(assets)}
                </List>
              </div>
            </Tab>
            <Tab
            //  value={'2'}
              icon={<FontIcon className="material-icons">tab</FontIcon>}>
              {
               // editType==='roles' &&
                //<UserRoles {...this.props}/>
              }
            </Tab>
            <Tab
            //  value={'3'}
              icon={<FontIcon className="material-icons">add</FontIcon>}>
            </Tab>
          </Tabs>
        </Scrollbar>
        <div style={{position: 'fixed', right: 18, zIndex:3, bottom: 18, }}>
          {
              isGranted('create_asset') &&
              <FloatingActionButton secondary={true} onClick={()=>{history.push(`/assets/create`)}} style={{zIndex:3}}>
                <FontIcon className="material-icons" >add</FontIcon>
              </FloatingActionButton>
          }
        </div>
    </Activity>
  );

}

}

CampaignPage.propTypes = {
  assets: PropTypes.array.isRequired,
  history: PropTypes.object,
  auth: PropTypes.object.isRequired,
  isGranted: PropTypes.func.isRequired,
  muiTheme: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { auth, browser, lists, persistentValues } = state;
  const { match } = ownProps;
  const uid=match.params.uid;
  const currentCampaignUid=persistentValues['current_campaign_uid']?persistentValues['current_campaign_uid']:undefined;

  // const campaignPageName= 
  // get the value from the {campaign key} from the firebase 

  const campaignPagePath=`campaigns/${auth.uid}`;
  const campaigns=lists[campaignPagePath]?lists[campaignPagePath]:[];


  let campaignDisplayName=''; 
   
  campaigns.map(campaign=>{
     if(campaign.key===uid){
       campaignDisplayName=campaign.val.campaign_name;
     }
      return campaign;
    })

  return {
    assets: lists.assets,
    auth,
    uid,
    campaigns,
    campaignDisplayName,
    campaignPagePath,
    currentCampaignUid,
    browser,
    isGranted: grant=>isGranted(state, grant)
  };
};


export default connect(
  mapStateToProps, { setSimpleValue, setPersistentValue }
)(injectIntl(muiThemeable()(withRouter(withFirebase(CampaignPage)))));
