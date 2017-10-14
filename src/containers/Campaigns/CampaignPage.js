import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setSimpleValue } from '../../store/simpleValues/actions';
import { setPersistentValue } from '../../store/persistentValues/actions';
import {Responsive, WidthProvider, GridItem} from 'react-grid-layout';
import ReactGridLayout from '../../components/ReactGridLayout/ReactGridLayout'
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
import Paper from 'material-ui/Paper';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

//attempt at doing the campaign page path campaign name thing 
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
  }
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
      this.initLayout(this.props);
    }

    initLayout = (props) => {
      const {watchList, firebaseApp, path}=props;

       let layoutRef=firebaseApp.database().ref('layouts')
       .orderByChild('currentCampaignUid')
       .equalTo('-KvecdzKQJ6qlr6U79Xc')
      // .equalTo('${auth.uid}') - doesnt work. object returns 'undefined'
       .limitToFirst(1);
       watchList(layoutRef);
       watchList('layouts');

  }


  // //## below references the layouts. what about the path???? Maybe this goes below (its copied here)

    // const { watchList, firebaseApp, auth, uid, path  }=this.props;

    // let layoutRef=firebaseApp.database().ref('layouts')
    //     .orderByChild('currentCampaignUid')
    //     .equalTo('-KvecdzKQJ6qlr6U79Xc')
    //    // .equalTo('${auth.uid}') - doesnt work. object returns 'undefined'
    //     .limitToFirst(20);

    //     watchList(layoutRef);
    //   }



    // handleTabActive = (value) => {
    //   const { history, uid, firebaseApp } = this.props
    //   let key=firebaseApp.database().ref(`/campaign_tabs/${uid}/`).push().key

    //   history.push(`${path}/${key}`)
    // }



 // // ## This renders the grid layout assets ( which should take account of which assets) 
 renderGrid(assets) {
   const {history, currentCampaignUid, grid, GridItem} =this.props;

 //const currentCampaignUid=key;

   if(assets===undefined){
     return <div></div>
     alert('Assets were undef')
   }

   return _.map(assets, (asset, index) => {

     return <div key={index}>
       <Card
         leftAvatar={
           <Avatar
             src={asset.val.photoURL}
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

 // // ## this renders the layout of the grid items, within react grid layout. 
 // // ## It includes the # of Grid Items, but not the content
 // // ## Maybe all of the layout renders and stuff goes in the Container RGL 

 // renderGridLayout(layout)
  // const {history, currentCampaignUid, reactGridLayout, ReactGridLayout} =this.props;

  // //const currentCampaignUid=key;
  // const { watchList, firebaseApp, auth, uid, path  }=this.props;

// // ## this gets the layout for the current campaign from the firebase 
  // let layoutRef=firebaseApp.database().ref('layouts')
  //     .orderByChild('currentCampaignUid')
  //     .equalTo('-KvecdzKQJ6qlr6U79Xc');
  //    // .equalTo('${auth.uid}') - doesnt work. object returns 'undefined'
  //     

  //     watchList(layoutRef);
  //   }
// // ## if the firebase has no layouts availible 

  //   if(layouts===undefined){
  //     return <div></div>
  //   }
// // ## This returns the layout. 

  //   return _.map(assets, (asset, index, layout) => {
  //     return <div key={index}>
  //       <ReactGridLayout
  //         {layout.uid}
  //       />
  //     </div>
  //   });
  // }

// //## this handles the layout change.  

  // handleLayoutChange = (layout) => {
  //     const {auth, firebaseApp, layout, onLayoutChange, history, setPersistentValue} =this.props;
  //     const key = layout.key;
  //     const layoutValues = layout.val;
  //     const userCampaignsRef = firebaseApp.database().ref(`/campaigns/${key}`);
  //     const layoutData = {
  //      ...values
  //     };

  //     userCampaignsRef.update({...layoutData});

  //     if (true) {
  //     setOnLayoutChange{'on_layout_change', true}
  // // ## updates the layout in the firebase   

  //      firebaseApp.database().ref.push(`${key}`);

  //     } else {
  //     }
  //   }
  // // ## Eventually... 
  // // handleAddWidget
  // // handleAddAsset
  // // handleChangeWidgetSize 


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
    const { intl,
            browser,
            assets,
            asset,
            index, 
            muiTheme, 
            history, 
            isGranted, 
            campaignDisplayName, 
            currentCampaignUid, 
            uid, 
            key,
          } =this.props;




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
               <div style={{overflow: 'none', backgroundColor: muiTheme.palette.canvasColor}} ref={(field) => { this.grid = field; }}>
                 <ReactGridLayout>
                  //{this.renderGrid(assets)}
                  </ReactGridLayout> 
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
              icon={<FontIcon className="material-icons">list</FontIcon>}>
               <div style={{overflow: 'none', backgroundColor: muiTheme.palette.convasColor}}>
                 <List  id='test' style={{height: '100%'}} ref={(field) => { this.list = field; }}>
                    {this.renderList(assets)}
                </List>
              </div>
            </Tab>
            <Tab
            //  value={'3'}
              icon={<FontIcon className="material-icons">cast</FontIcon>}>
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
  onLayoutChange: PropTypes.func.isRequired,
 
};

const mapStateToProps = (state, ownProps) => {
  const { auth, browser, lists, persistentValues, onLayoutChange, grids} = state;
  const { match } = ownProps;
  const uid=match.params.uid;
  const currentCampaignUid=persistentValues['current_campaign_uid']?persistentValues['current_campaign_uid']:undefined;

  // const campaignPageName= 
  // get the value from the {campaign key} from the firebase 

  const campaignPagePath=`campaigns/${auth.uid}`;
  const campaigns=lists[campaignPagePath]?lists[campaignPagePath]:[];
  const layoutsPath=`layouts/${auth.uid}`;
  const layouts=grids[layoutsPath]?grids[layoutsPath]:[];

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
    layouts: grids[layoutsPath],
    campaigns,
    campaignDisplayName,
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
