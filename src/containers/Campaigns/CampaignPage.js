import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setSimpleValue } from '../../store/simpleValues/actions';
import { setPersistentValue } from '../../store/persistentValues/actions';
import {Responsive, WidthProvider, GridItem} from 'react-grid-layout';
//react grid layout import 
import TarikReactGridLayout from '../../containers/ReactGridLayout/TarikReactGridLayout';

import { onLayoutChange } from '../../store/grids/actions';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { injectIntl } from 'react-intl';
import { Activity } from '../../containers/Activity';
import {List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {withRouter} from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import { withFirebase } from 'firekit';
import { Tabs, Tab } from 'material-ui/Tabs'
import Scrollbar from '../../components/Scrollbar/Scrollbar'
import { filterSelectors, filterActions } from 'material-ui-filter'
import isGranted  from '../../utils/auth';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Menu} from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import { WidgetFactories } from '../../containers/Widgets';


const path='/campaigns';

const ResponsiveReactGridLayout = WidthProvider(Responsive);


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  paper:{
    height: 100,
    width: 100,
    margin: 5,
    textAlign: 'center',
    display: 'inline-block',
  },
  card:{
    backgroundColor: 'muiTheme.palette.primary2Color',
    color: 'muiTheme.palette.alternateTextColor',
  },
  paper: {
      display: 'inline-block',
      float: 'left',
      margin: '16px 32px 16px 0',
  },
  
  
};
let layoutToSave=undefined;


class CampaignPage extends Component {

   componentDidMount() {
    const { watchList, firebaseApp, auth, uid, path  }=this.props;
   
    let ref=firebaseApp.database().ref('assets')
    .orderByChild('currentCampaignUid')
    .equalTo('-KvecdzKQJ6qlr6U79Xc')
   // .equalTo('${auth.uid}') - doesnt work. object returns 'undefined'
    .limitToFirst(20);
    watchList(ref);
    this.props.initLayout;
  }

  createWidget = (widget) => {
    const {history, widgets}=this.props;
      console.log('Button Pressed');
      ()=> {this.push( `/widgets/${widget.key}`)}
  } 


  renderList(assets) {
    const {history, currentCampaignUid, list} =this.props;


    if(assets===undefined){
      return <div></div>
    }

    return _.map(assets, (asset, index) => {

      return <div key={index}
      >
        <ListItem
          onClick={()=>{history.push(`/assets/edit/${asset.key}`)}}
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


    const { intl,
            browser,
            assets,
            asset,
            campaigns,
            index, 
            muiTheme, 
            createWidget,
            history, 
            isGranted, 
            campaignPageName, 
            currentCampaignUid, 
            reactGridLayout,
            uid, 
            ref,
            key,
          } =this.props;

    
    return (
      <Activity
        isLoading={assets===undefined}
        containerStyle={{overflow:'hidden'}}
        title='Campaign'
                >
        <Scrollbar>
          <Tabs
            //value={editType}
            onChange={this.handleTabActive}>
            <Tab
            //  value={'2'}
              icon={<FontIcon className="material-icons">tab</FontIcon>}>
               <TarikReactGridLayout {...this.props}/>
            </Tab>
            <Tab
             // value={'1'}
              icon={<FontIcon className="material-icons">tab</FontIcon>}>
               <div style={{overflow: 'none', backgroundColor: muiTheme.palette.canvasColor}} ref={(field) => { this.grid = field; }}>
              </div>
            </Tab>
            <Tab
            //  value={'2'}
              icon={<FontIcon className="material-icons">tab</FontIcon>}>
            </Tab>

            <Tab
            //  value={'3'}
              icon={<FontIcon className="material-icons">list</FontIcon>}>
               <div style={{overflow: 'none', backgroundColor: muiTheme.palette.convasColor}}>
                 <List  id='test' style={{height: '100%'}} ref={(field) => { this.list = field; }}>
                    {this.renderList(assets)}
                </List>
              </div>
            </Tab>
            <Tab
            //  value={'3'}
              icon={<FontIcon className="material-icons">screen_share</FontIcon>}>
               <div style={{overflow: 'none', backgroundColor: muiTheme.palette.convasColor}}>
              </div>
            </Tab>
            <Tab
            //  value={'3'}
              icon={<FontIcon className="material-icons">add</FontIcon>}>
               <div style={{overflow: 'none', backgroundColor: muiTheme.palette.convasColor}}>
           
              </div>
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
        <div style={{position: 'fixed', left: 18, zIndex:3, bottom: 18, }}>
          {
              isGranted('create_asset') &&
              <FloatingActionButton  primary={true} onClick={createWidget} style={{zIndex:3}}>
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
  campaigns: PropTypes.string,
  history: PropTypes.object,
  auth: PropTypes.object.isRequired,
  isGranted: PropTypes.func.isRequired,
  muiTheme: PropTypes.object.isRequired,
  widgets: PropTypes.array,
  createWidget: PropTypes.funct,
  onLayoutChange: PropTypes.func.isRequired,
  reactGridLayout: PropTypes.object.isRequired,
 
};

const mapStateToProps = (state, ownProps) => {
  const { auth, browser, firebaseApp, lists, persistentValues, onLayoutChange, grids} = state;
  const { match } = ownProps;
  const uid=match.params.uid;
  const currentCampaignUid=persistentValues['current_campaign_uid']?persistentValues['current_campaign_uid']:undefined;



  const campaignPagePath=`campaigns/${auth.uid}`;
  const campaigns=lists[campaignPagePath]?lists[campaignPagePath]:[];
  const layoutsPath=`layouts/${auth.uid}`;
  const layouts=grids[layoutsPath]?grids[layoutsPath]:[];



  return {
    assets: lists.assets,
    auth,
    uid,
    layouts: grids[layoutsPath],
    campaigns: lists.campaigns,
    campaignPagePath,
    layoutsPath,
    currentCampaignUid,
    browser,
 
    isGranted: grant=>isGranted(state, grant)
  };
};


export default connect(
  mapStateToProps, { setSimpleValue, setPersistentValue, onLayoutChange }
)(injectIntl(muiThemeable()(withRouter(withFirebase(CampaignPage)))));
