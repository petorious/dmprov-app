import React, {Component} from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { onLayoutChange } from '../../store/grids/actions';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import { Responsive, WidthProvider, GridItem } from 'react-grid-layout';
import muiThemeable from 'material-ui/styles/muiThemeable';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import {withRouter} from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import { withFirebase } from 'firekit';
import firebase from 'firebase';
import { injectIntl } from 'react-intl';


//import {GRID_MARGIN, GRID_UNIT} from 'constants';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

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



class ReactGridLayout extends Component {

  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {
    const {uid: currentUid, unwatchList, path} =this.props;
    const {uid: nextUid} =nextProps;

    if(currentUid!==nextUid){

      unwatchList(path)
      this.initAssets(nextProps)
    }

  }

  componentDidUpdate(prevProps, prevState) {
    
  }
  componentWillMount() {
    this.initAssets(this.props);
    this.initLayouts(this.props);
  }

  initAssets = (props) => {
    const {watchList, firebaseApp, asset, path}=props;

    let assetsRef=firebaseApp.database()
    .ref('assets/')
    .orderByKey()
    .equalTo('-KvzS2oHg1EQJGLcav5_');

    watchList(assetsRef);

    const key = assetsRef.key;
    const assetValues = assetsRef.val;
    const userAssetsRef = firebaseApp.database().ref(`assets/${key}`);
    // const assetData = {
    //   asset_name:assetValues.asset_name,
    // };

  }

  initLayouts = (props) => {
    const {watchList, firebaseApp, path}=props;

    let layoutsRef=firebaseApp.database().ref('react_grid_layouts/').orderByKey();
    watchList(layoutsRef);

  }

  onLayoutChange = (layout) => {

    this.props.onLayoutChange(layout);

    };

  //onAddItem

  //onBreakpointChange


  componentDidMount() {
      const { watchList, firebaseApp}=this.props;

       let ref=firebaseApp.database().ref('assets')
       // .orderByChild('currentCampaignUid')
       // .equalTo('-KvecdzKQJ6qlr6U79Xc')
      // .equalTo('${auth.uid}') - doesnt work. object returns 'undefined'
       .limitToFirst(20);
      watchList(ref);
    }
  
//// under return map is  //// (asset, index) => {




  renderGrid(assets) {
    const {history, grid, asset} =this.props;

        return _.map(_.range(this.props.assets), (i) => {

          return (
          <div key={i}>
              <GridItem
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
                  key={i}
                  primaryText={asset.val.name}
                  secondaryText={asset.val.asset_slug}
                  onClick={()=>{history.push(`/assets/edit/${asset.key}`)}}
                  id={i}
                />
            </div>
         )
       }
      );
  
  }
  

  ////renderGrid(widgets)

  
  render (){ 
    const { messages,
            muiTheme, 
            index, 
            intl,
            assets,
            i,
            asset,
            uid,
            browser, 
            firebaseApp,
            renderGrid,
            reactGridLayout, 
            onLayoutChange, 
            auth, 
            } = this.props;

    
    // const assetsRef = firebaseApp.database().ref(`assets/${key}`);
    // const assetValues = assetsRef.val;
    // const key = assetsRef.key;
    // const asset_name = (assetsRef.val.asset_name);
    // const asset_slug = (assetsRef.val.asset_slug);

   
//## Below is the layout. To  be imported from firebase. 

    var layout = [
      {i: '1', x: 4, y: 0, w: 3, h: 4.2,isResizable:false},
      {i: '2', x: 0, y: 0, w: 3, h: 1},
      {i: '3', x: 4, y: 0, w: 3, h: 3},
      {i: '4', x: 4, y: 0, w: 3, h: 2},
      {i: '5', x: 4, y: 0, w: 3, h: 2},
      {i: '6', x: 6, y: 0, w: 4, h: 4.2,isResizable:false},
      {i: '7', x: 0, y: 0, w: 3, h: 1},
      {i: '8', x: 4, y: 0, w: 3, h: 3},
      {i: '9', x: 4, y: 0, w: 3, h: 2},
      {i: '10', x: 4, y: 0, w: 3, h: 2},
      {i: '11', x: 6, y: 0, w: 4, h: 4.2,isResizable:false},
      {i: '12', x: 0, y: 0, w: 3, h: 1},
      {i: '13', x: 4, y: 0, w: 3, h: 3},
      {i: '14', x: 4, y: 0, w: 3, h: 2},
      {i: '15', x: 4, y: 0, w: 3, h: 2},
      {i: 'index', x:1, y: 4, w:3, h:1},

    ];
    
    var layouts = {lg:layout}
  ////  var layouts = reactGridLayout.layout?{lg:reactGridLayout.layout}:{lg:layout}

  
    // const assetData = [  
    // {
    //     // leftAvatar: {
    //     //   <Avatar
    //     //     src={asset.val.photoURL}
    //     //     alt="arc"
    //     //     icon={
    //     //       <FontIcon className="material-icons">
    //     //         add_circle
    //     //       </FontIcon>
    //     //     }
    //     //   />
    //     // },
    //     key: '{index}',
    //     title: '{asset.val.asset_name}',
    //     subtitle: '{asset.val.asset_slug}',
    //     id: '{index}',
    // },


    const assetData = [  
    {
          src: '{asset.val.photoURL}',
          icon: '<FontIcon className="material-icons">add_circle</FontIcon>',
          title:  '{asset.val.asset_name}',
          subtitle: '{asset.val.asset_slug}',
          text: '{asset.val.asset_description}',
          key: '{asset.val.uid}',
    },

    ];
       // //const {history, currentCampaignUid, list, assets, grids, GridItem} =this.props;


       // const currentCampaignUid=key;

       //   if(assets===undefined){
       //     return <div></div>
       //   }

       // return _.map(assets, (asset, index) => {

       //     return <div key={index}>
       //       <GridItem
       //         leftAvatar={
       //           <Avatar
       //             src={asset.val.photoURL}
       //             alt="arc"
       //             icon={
       //               <FontIcon className="material-icons">
       //                 add_circle
       //               </FontIcon>
       //             }
       //           />
       //         }
       //         key={index}
       //         primaryText={asset.val.asset_name}
       //         secondaryText={asset.val.asset_slug}
       //         id={index}
       //       />
              
       //       <Divider inset={true}/>
       //     </div>
       //   });
       // }

  

            return (
              <div >
                  <ResponsiveReactGridLayout
                    isDraggable={browser.greaterThan.medium}
                    isResizable={browser.greaterThan.medium}
                    onLayoutChange={onLayoutChange}
                    className="layout"
                    layouts={layouts}
                    autoSize={true}
                    verticalCompact={false}
                    breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                    cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
                    // key={key}
                    // id={key}
                    ref={(field) => { this.grid = field; }}
                    {...this.props}
                    //ref="grid"
                    >
                    <div key={1}>
                    {assetData.map((card) => (
                      <Card 
                          style={{overflow: 'none', backgroundColor:muiTheme.palette.primary2Color}}
                          key={card.uid}
                          // actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                          // leftAvatar={
                          //     <Avatar
                          //       src={asset.val.photoURL}
                          //       alt="arc"
                          //       icon={
                          //         <FontIcon className="material-icons">
                          //           add_circle
                          //         </FontIcon>
                          //       }
                          //     />
                       >
                        <CardHeader
                          title={card.title}
                          subtitle={card.subtitle}
                          actAsExpander={true}
                          showExpandableButton={true}
                      />
                         <CardText expandable={true}>
                          asset_description
                         </CardText>     

                        <CardActions expandable={true}>
                          <FlatButton label="Action1" />
                          <FlatButton label="Action2" />
                        </CardActions>
                      </Card> 
                      ))}
                  </div>
                </ResponsiveReactGridLayout>
              </div>


      
      // // within the RGL===================================================================================================== 
      
      //  {_.map(_.range(assets))}

                     




      // {assetData.map((asset) => (
      //   <GridItem
      //   > {
      //     key='{asset.val.uid}',
      //     title='{asset.val.asset_name}',
      //     subtitle='{asset.val.asset_slug}'
      //     }
      //   </GridItem>
      //   ))}
//
     
    );
    
  }
 };
 ReactGridLayout.propTypes = {
    onLayoutChange: PropTypes.func.isRequired,
    assets: PropTypes.array.isRequired,
    history: PropTypes.object,
    reactGridLayout: PropTypes.object,
    browser: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,

  }

const mapStateToProps = (state, ownProps) => {
   const { auth, browser, onLayoutChange, asset, grids } = state;
   const { uid } = ownProps;
   const path=`assets/${uid}/`

  
     return {
       auth,
       browser,
       asset,
       assets: grids.assets,
       uid,
     };
   };
 

export default connect(
   mapStateToProps, { onLayoutChange }
 )(injectIntl(muiThemeable()(withRouter(withFirebase(ReactGridLayout)))));

