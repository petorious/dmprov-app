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

  initLayout( firebaseApp, auth, uid, persistentValues, current_campaign_uid) {
    
    const {layout} = this.props;

    return {

        created:firebaseApp.database().ref().child('react_grid_layouts/${uid}').push({
          layout
        })
    }
 ;
  }

  onLayoutChange = (layout) => {
    
      const { firebaseApp, auth, uid, persistentValues, current_campaign_uid }=this.props;


          return {
            updated:firebaseApp.database().ref().child(`react_grid_layouts/${uid}`),
            ...layout
          }
    };

  onSizeChangeExpand = (assets, key) => {
    const { firebaseApp, match, simpleValues } = this.props;
        const uid=match.params.uid;

        return {
          updated:firebaseApp.database().ref().child(`/assets/${key}/sizeClass/`).set('expanded')
        
          }
      }
  
  onSizeChangeShrink = (assets, key) => {
    const { firebaseApp, match, simpleValues } = this.props;
            const uid=match.params.uid;

        return{
          updated:firebaseApp.database().ref().child(`/assets/${key}/sizeClass/`).set('standard')
        }

      }
  


  renderGrid(assets) {
    const {history, currentCampaignUid, list, muiTheme, card} =this.props;

  
    if(assets===undefined){
      return <div></div>
    }

    return _.map(assets, (asset, index) => {

      if(asset.val.sizeClass==='standard'){
        
        return <div key={index}
            data-grid={asset.val.dataGrid}
        >
          <ListItem
            onDoubleClick={()=>{history.push(`/assets/edit/${asset.key}`)}}
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
            style={{overflow: 'none', backgroundColor: 'black'}}
            key={index}
            primaryText={asset.val.asset_name}
            secondaryText={asset.val.asset_slug}
            id={index}
            rightIconButton={
                   <IconMenu
                       iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                       anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                       targetOrigin={{horizontal: 'left', vertical: 'top'}}
                     >
                       

                       <MenuItem
                         primaryText="Size"
                         rightIcon={<ArrowDropRight />}
                         menuItems={[
                           <MenuItem primaryText="Standard" onClick={this.props.onSizeChangeShrink}/>,
                           <MenuItem primaryText="Expanded" onClick={this.props.onSizeChangeExpand}/>,
                           <MenuItem primaryText="Thumbnail" />,
                         ]}
                       />
                       <MenuItem
                         primaryText="View"
                         rightIcon={<ArrowDropRight />}
                         menuItems={[
                           <MenuItem primaryText="Details" />,
                           <MenuItem primaryText="Stats" />,
                           <MenuItem primaryText="Images" />,
                           <MenuItem primaryText="Tags" />,
                           <MenuItem primaryText="Attachements" />,
                         ]}
                       />
                       <MenuItem
                         primaryText="Copy & Paste"
                         rightIcon={<ArrowDropRight />}
                         menuItems={[
                           <MenuItem primaryText="Cut" />,
                           <MenuItem primaryText="Copy" />,
                           <Divider />,
                           <MenuItem primaryText="Paste" />,
                         ]}
                       />
                       <MenuItem primaryText="Anchor" />
                       <Divider />
                       <MenuItem primaryText="Archive" />
                       <Divider />
                       <MenuItem value="Del" primaryText="Delete" />

                     </IconMenu>
                 }
          />  
        </div>
      }
      if(asset.val.sizeClass==='expanded')
        return <div key={index}
          data-grid={asset.val.dataGrid}
          style={{overflow: 'none', backgroundColor: 'black'}}
        >
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
            style={{ backgroundColor: 'black'}}

            key={index}
            primaryText={asset.val.asset_name}
            secondaryText={asset.val.asset_slug}
            id={index}
            initiallyOpen={true}
            
            rightIconButton={
                   <IconMenu
                       iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                       anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                       targetOrigin={{horizontal: 'left', vertical: 'top'}}
                     >
                       

                       <MenuItem
                         primaryText="Size"
                         rightIcon={<ArrowDropRight />}
                         menuItems={[
                           <MenuItem primaryText="Standard" onClick={this.props.onSizeChangeShrink}/>,
                           <MenuItem primaryText="Expanded" onClick={this.props.onSizeChangeExpand}/>,
                           <MenuItem primaryText="Thumbnail" />,
                         ]}
                       />
                       <MenuItem
                         primaryText="View"
                         rightIcon={<ArrowDropRight />}
                         menuItems={[
                           <MenuItem primaryText="Details" />,
                           <MenuItem primaryText="Stats" />,
                           <MenuItem primaryText="Images" />,
                           <MenuItem primaryText="Tags" />,
                           <MenuItem primaryText="Attachements" />,
                         ]}
                       />
                       <MenuItem
                         primaryText="Copy & Paste"
                         rightIcon={<ArrowDropRight />}
                         menuItems={[
                           <MenuItem primaryText="Cut" />,
                           <MenuItem primaryText="Copy" />,
                           <Divider />,
                           <MenuItem primaryText="Paste" />,
                         ]}
                       />
                       <MenuItem primaryText="Anchor" />
                       <Divider />
                       <MenuItem primaryText="Archive" />
                       <Divider />
                       <MenuItem value="Del" primaryText="Delete" />

                     </IconMenu>
                 }
          />  
                  <div style={ { display: 'flex'} }>
                    <Paper style={ { display: 'inline-block', float: 'center',  margin: '8px 8px 8px 8px',} }>
                     <font color="grey">{asset.val.asset_description}
                     </font>
                     </Paper>
                                       
                   </div>
                    

          
        </div>

      if(asset.val.sizeClass==='thumbnail')
        return <div key={index}
            data-grid={asset.val.dataGrid}
        >
          
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
            style={{overflow: 'none', backgroundColor: 'black', primaryTextColor: 'black'}}
            key={index}
            id={index}
            primaryText={".     "}
            secondaryText={"  ."}
           />  
           <Divider/>
        </div>


    });
  }

  renderTitle(campaigns){
    const {history, currentCampaignUid, list} =this.props;
  

      return _.map(campaigns, (campaign, index) => {

        return <div key={currentCampaignUid}
        >
          <ListItem
            key={currentCampaignUid}
            primaryText={campaign.val.asset_name}
            id={currentCampaignUid}
          />
           
          <Divider inset={true}/>
        </div>
      });
    }



  renderList(assets) {
    const {history, currentCampaignUid, list} =this.props;

  //const currentCampaignUid=key;

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
            history, 
            isGranted, 
            campaignPageName, 
            currentCampaignUid, 
            reactGridLayout,
            onLayoutChange,
            uid, 
            key,
          } =this.props;

    


    return (
      <Activity
        isLoading={assets===undefined}
        containerStyle={{overflow:'hidden'}}
        title={this.renderTitle}
        >
        <Scrollbar>
          <Tabs
            //value={editType}
            onChange={this.handleTabActive}>
            <Tab
             // value={'1'}
              icon={<FontIcon className="material-icons">tab</FontIcon>}>
               <div style={{overflow: 'none', backgroundColor: muiTheme.palette.canvasColor}} ref={(field) => { this.grid = field; }}>
                 <ResponsiveReactGridLayout 
                  isDraggable={browser.greaterThan.small}
                  isResizable={browser.greaterThan.small}
                  onLayoutChange={onLayoutChange}
                  className="layout"
                 // layouts={layouts}
                 // autoSize={true}
                  verticalCompact={false}
                  rowHeight={70}
                  breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                  cols={{lg: 18, md: 15, sm: 9, xs: 6, xxs: 3}}
                  ref="grid"
                  {...this.props}
                 >
                   {this.renderGrid(assets)}
                  </ResponsiveReactGridLayout> 
              </div>
            </Tab>
            <Tab
            //  value={'2'}
              icon={<FontIcon className="material-icons">tab</FontIcon>}>
               <ReactGridLayout {...this.props}/>
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
