import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import { setPersistentValue } from '../../store/persistentValues/actions';
import {Responsive, WidthProvider} from 'react-grid-layout';
import { onLayoutChange } from '../../store/grids/actions';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import {withRouter} from 'react-router-dom';
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
    //this.props.watchList('campaign_layouts');

     
  }
  componentDidMount() {
    const { watchList, firebaseApp, auth, uid, path  }=this.props;
   
    // let layoutRef=firebaseApp.database().ref('campaign_layouts')
    //  .orderByKey()
    //  .equalTo('-L0J5Fu99MIGYopf7XaB')
    //  .limitToFirst(20);
    //  watchList(layoutRef);

  }


  render( ){

    function handleLayoutChange(layout){
      layoutToSave=layout;
    };



    const { browser, firebaseApp, currentCampaignUid, campaign_layouts, uid, grids, gridboard, layoutRef, onLayoutChange} = this.props

 
   // let layout=[];
   // if(campaign_layouts){
   //  layout=campaign_layouts

   //  this.props.campaign_layouts

   //  .map(
   //    (campaign_layout, index) => {
   //      return{
   //        val: campaign_layouts.val
   //      }
   //    })
   // };

   console.log("layout", layout)

    
  
  
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

    const tilesData = [
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


    var layout = [

      {i: '1', x: 0, y: 0, w: 4, h: 4.2,isResizable:false},
      {i: '2', x: 0, y: 0, w: 3, h: 1},
      {i: '3', x: 4, y: 0, w: 3, h: 1},
      {i: '4', x: 4, y: 0, w: 3, h: 1}
    ];
    // console.log('Model This', layoutModel)

    var layouts = Gridboard.layout?{lg:Gridboard.layout}:{lg:layout}


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
            ref={(field) => { this.grid = field; }}
            >
            <Card  key={"1"}>
              <CardHeader
                title="URL Avatar"
                subtitle="Semesnica"
                avatar={
            
                <FontIcon className="material-icons">
                  add_circle
                </FontIcon>}
                />
              
              <CardTitle title="Semesnica" subtitle=" in Bosnia and Herzegovina" />
              <CardText expandable={true}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec mattis pretium massa. lacus id, pellentesque lobortis odio.
              </CardText>
              <CardActions>
                <FlatButton label="Open" />
                <FlatButton label="Action2" />
              </CardActions>
            </Card>
            <Card key={"3"}>
              <CardHeader
                title="Without Avatar"
                subtitle="Subtitle"
                actAsExpander={true}
                showExpandableButton={true}
                />
              <CardText expandable={true}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec mattis pretium massa.lacus id, pellentesque lobortis odio.
              </CardText>
              <CardActions expandable={true}>
                <FlatButton label="Action1" />
                <FlatButton label="Action2" />
              </CardActions>
            </Card>
            <Card key={"2"}>
              <CardHeader
                title="Without Avatar"
                subtitle="Subtitle"
                actAsExpander={true}
                showExpandableButton={true}
                />
              <CardText expandable={true}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec mattis pretium massa. acus id, pellentesque lobortis odio.
              </CardText>
              <CardActions expandable={true}>
                <FlatButton label="Action1" />
                <FlatButton label="Action2" />
              </CardActions>
            </Card>
          
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
}


function mapStateToProps(state, ownProps) {

  const {browser, intl , lists, gridboard, uid, currentCampaignUid} = state;
  const { match } = ownProps;

  const layoutsPath=`campaign_layouts/`;

  const campaign_layouts=lists[layoutsPath]?lists[layoutsPath]:[];

  return {
    gridboard: gridboard,
    browser: browser,
    //this list imports into the redux logger
    campaign_layouts: lists.campaign_layouts

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