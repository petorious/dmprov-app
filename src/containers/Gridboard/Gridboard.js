import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import { setPersistentValue } from '../../store/persistentValues/actions';
import {Responsive, WidthProvider} from 'react-grid-layout';
import { onLayoutChange } from '../../store/grids/actions';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import {withRouter} from 'react-router-dom';
import {List, ListItem } from 'material-ui/List';
import { withFirebase } from 'firekit';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { injectIntl } from 'react-intl';

const ResponsiveReactGridLayout = WidthProvider(Responsive);;

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card:{
     backgroundColor: "black",
     color: 'muiTheme.palette.primaryColor',
  },
  gridList: {
    width: 500,
    height: 500,
    overflowY: 'auto',
    marginBottom: 24,
  },
};


let layoutToSave=undefined;

class Gridboard extends Component{

  constructor(props) {
    super(props)
  };

  componentWillMount(){

     
  }
  componentDidMount() {
    const { watchList, firebaseApp, styles, auth, uid, path  }=this.props;
   
    let layoutRef=firebaseApp.database().ref('campaign_layouts')
    .orderByChild('currentCampaignUid')
    .equalTo("-KvecdzKQJ6qlr6U79Xc")
     // .limitToFirst(20);
     watchList(layoutRef);

    let assetRef=firebaseApp.database().ref('assets')
    .orderByChild('layoutUid')
    .equalTo("-L0J5Fu99MIGYopf7X78")

    watchList(assetRef);


  }

   renderGridList(assets) {
    const {history, currentCampaignUid, list, match} =this.props;
    const uid=match.params.uid;


    if(assets===undefined){
      return <div></div>
    }

    return 

 
    _.map(assets, (val, i) => {

      return <div key={val.key}
      >
        <ListItem
          key={val.key}
          primaryText={val.asset_name}
          secondaryText={val.asset_slug}
          id={val.key}
        />
         
      </div>
    });
  }


  render( i, keys){

    function handleLayoutChange(layout){
      layoutToSave=layout;
    };

    const { browser, firebaseApp,  muiTheme, currentCampaignUid, campaign_layouts, assets, match, grids, gridboard, layoutRef, onLayoutChange} = this.props
 
    const uid=match.params.uid;

    let assetSource=[];

    if(assets){
      assetSource=assets
      //   .filter(asset=>{
      //   console.log("asset authorUid ", asset.val.authorUid)
      //   return asset.val.authorUid===uid
      // })
        .map(asset=>{
        console.log('filtered asset', asset)
        return {
          id: asset.key,
          key: asset.val.key,
          name: asset.val.asset_name,
          title: asset.val.title,
          description: asset.val.description}
      })
    };   



   let layout=[];
   if(campaign_layouts){
    layout=campaign_layouts

    this.props.campaign_layouts
    .filter(campaign_layout=>{
            layout=campaign_layout.val.layout1
          })
    // .map(
    //   (campaign_layout, index) => {
    //     return{
    //       val: campaign_layout.val.layout1
    //     }
    //   })
   };
   
    // const menuItems=[
    //   {  key: 'save',
    //     text:messages.save||'save',
    //     onTouchTap: ()=>onLayoutChange(layoutToSave)
    //   },
    //   {
    //     key: 'reset',
    //     text:messages.reset||'reset',
    //     onTouchTap: ()=>onLayoutChange(undefined)
    //   }

    // ];

    const widgetData = [
      {
        img: 'static/vegetables-790022_640.jpg',
        title: 'Breakfast',
        author: 'jill111',
      },
      {
        img: 'static/burger-827309_640.jpg',
        title: 'Tasty burger',
        author: 'pashminu',
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


    var layouts = Gridboard.layout?{lg:Gridboard.layout}:{lg:layout}

    return ( 

      <div>

        <ResponsiveReactGridLayout

            isDraggable={browser.greaterThan.medium}
            isResizable={browser.greaterThan.medium}
            onLayoutChange={handleLayoutChange}
            className="layout"
            rowHeight={60}
            verticalCompact={false}
            layouts={layouts}
            style={styles}
            autoSize={true}
            breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
            cols={{lg: 24, md: 20, sm: 12, xs: 8, xxs: 4}}
            ref={(field) => { this.list = field; }}
            >
             {assetSource.map((val, index) => {
                     return (

                        <Card key={val.id} uid={match.params.uid}>
                        {this.renderGridList(assets)}
                        </Card>
                       
                      )
                     }
                   )}
                 
          </ResponsiveReactGridLayout>
          
        </div>

    );
  }
};


Gridboard.propTypes = {
  onLayoutChange: PropTypes.func.isRequired,
  gridboard: PropTypes.object,
  browser: PropTypes.object.isRequired,
  campaign_layouts: PropTypes.array.isRequired,
  assets: PropTypes.array.isRequired,
}


function mapStateToProps(state, ownProps) {

  const {browser, intl , lists, gridboard, uid, key, currentCampaignUid} = state;
  const { match } = ownProps;

  const layoutsPath=`campaign_layouts/${uid}/`;

  const campaign_layouts=lists[layoutsPath]?lists[layoutsPath]:[];

  return {
    gridboard: gridboard,
    browser: browser,
    //this list imports into the redux logger
    campaign_layouts: lists.campaign_layouts,
    assets: lists.assets,

  };

}

const mapDispatchToProps = (dispatch) => {
  return {

    onLayoutChange:(layout)=>{
      dispatch(onLayoutChange(layout));
    },

  }
}

export default connect(
  mapStateToProps, { setPersistentValue, onLayoutChange }
)(injectIntl(muiThemeable()(withRouter(withFirebase(Gridboard)))));