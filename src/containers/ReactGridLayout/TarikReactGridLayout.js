import React, {  Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {Responsive, WidthProvider} from 'react-grid-layout';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { injectIntl } from 'react-intl';
import { onLayoutChange } from '../../store/grids/actions';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {withRouter} from 'react-router-dom';
import { withFirebase } from 'firekit';

const ResponsiveReactGridLayout = WidthProvider(Responsive);;


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: "grey",

  },
  gridList: {
    width: 500,
    height: 500,
    overflowY: 'auto',
    backgroundColor: "grey",
    marginBottom: 24,
  },
  paper:{
    height: 100,
    width: 100,
    margin: 5,
    backgroundColor: "grey",
    textAlign: 'center',
    display: 'inline-block',
  }
};


let layoutToSave=undefined;

class TarikReactGridLayout extends Component{

  constructor(props) {
    super(props)
    const { watchList, firebaseApp, key, match}=this.props;
    const uid=match.params.uid;


    let layoutRef=firebaseApp.database().ref(`campaign_layouts/-Kv8xYXE5WPCLkZpxJFU/-y3XAuxXJq1ST5CSKOF6S`);
       watchList(layoutRef);

  };





  // renderList(widgets) {
  //   const {history, currentCampaignUid, list} =this.props;


  //   if(assets===undefined){
  //     return <div></div>
  //   }

  //   return _.map(assets, (asset, index) => {

  //     return <div key={index}
  //     >
  //       <ListItem
  //         onClick={()=>{history.push(`/assets/edit/${asset.key}`)}}
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

  render(layouts, layoutsRef, path){

    function handleLayoutChange(layout){
      layoutToSave=layout;
    };


    const { messages, browser, dashboard, match, watchList, onLayoutChange, firebaseApp, campaign_layouts, campaign_layout} = this.props
    const uid=match.params.uid;
  


    // import from the correct layouts file from db => user => campaign => dashboard 

    // { i: {key}, {x: 0, y: 0, w: 4 h: 4  }



    var layout = [

      {i: '1', x: 0, y: 0, w: 4, h: 4.2, isResizable:false},
      {i: '2', x: 0, y: 0, w: 3, h: 1},
      {i: '3', x: 4, y: 0, w: 3, h: 3},
      {i: '4', x: 4, y: 0, w: 3, h: 2}
    ];

      


   //  let layoutRef=firebaseApp.database().ref('campaign_layouts');

      let layoutSource=[];

       

   
    var layouts = {lg:layout}

    // const menuItems=[
    //   {	key: 'save',
    //     text:messages.save||'save',
    //     onTouchTap: ()=>onLayoutChange(layoutToSave)
    //   },
    //   {
    //     key: 'reset',
    //     text:messages.reset||'reset',
    //     onTouchTap: ()=>onLayoutChange(undefined)
    //   }

    // ];


    const tilesData = [
      {
        img: <FontIcon className="material-icons">tab</FontIcon>,
        title: 'Breakfast',
        author: 'jill111',
      },
      {
        img: 'static/burger-827309_640.jpg',
        title: 'Tasty burger',
        author: 'pashminu',
      },
      {
        img: 'static/camera-813814_640.jpg',
        title: 'Camera',
        author: 'Danson67',
      },
      {
        img: 'static/morning-819362_640.jpg',
        title: 'Morning',
        author: 'fancycrave1',
      },
      {
        img: 'static/hats-829509_640.jpg',
        title: 'Hats',
        author: 'Hans',
      },
      {
        img: 'static/honey-823614_640.jpg',
        title: 'Honey',
        author: 'fancycravel',
      },
      {
        img: 'static/water-plant-821293_640.jpg',
        title: 'Water plant',
        author: 'BkrmadtyaKarki',
      },
    ];

    // this is where the widgets get the data for the assets 
    /// the widget gets its own information . 
    const assetData = [];

    const mapData = [];

    const calendarData = [];  

// put {widgets} in between <ResponsiveReactGridLayout/> 

    return (
        <div>
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
                avatar="static/bih.png"
                />
              <CardMedia
                overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
                >
                <img src="static/semesnica.jpg" />
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
              {tilesData.map((tile) => (
                <GridTile
                  key={tile.img}
                  title={tile.title}
                  subtitle={<span>by <b>{tile.author}</b></span>}
                  actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                  >
                  <img src={tile.img} />
                </GridTile>
              ))}
            </GridList>

            <Card  key={"4"}>
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
    );
  }
};


TarikReactGridLayout.propTypes = {
  onLayoutChange: PropTypes.func.isRequired,
  dashboard: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
  browser: PropTypes.object.isRequired,
  campaign_layouts: PropTypes.array.isRequired,

}

const mapStateToProps = (state, ownProps) => {
  const { auth, intl, lists, dialogs, filters, campaign_layouts } = state;
  const { match } = ownProps;

  const uid=match.params.uid;
  const editType = match.params.editType?match.params.editType:'data';

  //const { hasFilters } = filterSelectors.selectFilterProps('user_grants', filters)

  return {
    auth,
    uid,
    dialogs,
    intl,
    campaign_layouts: lists.campaign_layouts,
  };
};

export default connect(
  mapStateToProps, //{ ...filterActions }
)(injectIntl(withRouter(withFirebase(muiThemeable()(TarikReactGridLayout)))));
