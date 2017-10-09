import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setSimpleValue } from '../../store/simpleValues/actions';
import { setPersistentValue } from '../../store/persistentValues/actions';
import {Responsive, WidthProvider} from 'react-grid-layout';
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


const tabPath = '/campaign_tabs';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 500,
    overflowY: 'auto',
    marginBottom: 24,
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

 //renderGrid(assets)


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
    const { intl, browser, assets, muiTheme, history, reactGridLayout, onLayoutChange, isGranted, campaignDisplayName, currentCampaignUid, uid } =this.props;

    function handleLayoutChange(layout){
      layoutToSave=layout;
    };


    var layout = [
      {i: '1', x: 0, y: 0, w: 4, h: 4.2,isResizable:false},
      {i: '2', x: 6, y: 0, w: 3, h: 1},
      {i: '3', x: 4, y: 0, w: 3, h: 3},
      {i: '4', x: 4, y: 0, w: 3, h: 2}
    ];


    var layouts = reactGridLayout //.layout?{lg:reactGridLayout.layout}:{lg:layout};


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
                <ResponsiveReactGridLayout
                            isDraggable={browser.greaterThan.medium}
                            isResizable={browser.greaterThan.medium}
                            onLayoutChange={handleLayoutChange}
                            className="layout"
                            layouts={layouts}
                            autoSize={true}
                            breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                            cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
                            ref="grid"
                            >

                            <Card key={"1"}>
                              <CardHeader
                                title="URL Avatar"
                                subtitle="Semesnica"
                                />
                              <CardMedia
                                // overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
                                 >
                             </CardMedia>
                              <CardTitle title="Semesnica" subtitle="A beutiful place in Bosnia and Herzegovina" />
                              <CardText>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                              </CardText>
                              <CardActions>
                                <FlatButton label="Action1" />
                                <FlatButton label="Action2" />
                              </CardActions>
                            </Card>

                            <GridList key={"3"}
                              cellHeight={200}
                              style={styles.gridList}
                              >
                              <Subheader>December</Subheader>
                              {assets.map((assets) => (
                                <GridTile
                                  key={assets.img}
                                  title={assets.title}
                                  subtitle={<span>by <b>{assets.author}</b></span>}
                                  actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                                  >
                                </GridTile>
                              ))}
                            </GridList>

                            <Card key={"4"}>
                              <CardHeader
                                title="Without Avatar"
                                subtitle="Subtitle"
                                actAsExpander={true}
                                showExpandableButton={true}
                                />
                              <CardText expandable={true}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                              </CardText>
                              <CardActions expandable={true}>
                                <FlatButton label="Action1" />
                                <FlatButton label="Action2" />
                              </CardActions>
                            </Card>

                            <Paper key={"2"} style={styles.paper}  />

                          </ResponsiveReactGridLayout>
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
               <div style={{overflow: 'none', backgroundColor: muiTheme.palette.convasColor}}>
                 <List  id='test' style={{height: '100%'}} ref={(field) => { this.list = field; }}>
                    {this.renderList(assets)}
                </List>
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
  reactGridLayout: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,
  layouts: PropTypes.object.isRequired,

};

const mapStateToProps = (state, ownProps) => {
  const { auth, browser, lists, persistentValues, onLayoutChange } = state;
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
  mapStateToProps, { setSimpleValue, setPersistentValue, onLayoutChange, }
)(injectIntl(muiThemeable()(withRouter(withFirebase(CampaignPage)))));
