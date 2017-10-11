import {React, Component} from 'react';
import { ResponsiveReactGridLayout, GridItem } from 'react-grid-layout';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {GRID_MARGIN, GRID_UNIT} from 'constants';

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


class ReactGridLayout extends Component {

  constructor(props) {
    super(props)
  };

  
  render () { 

    function handleLayoutChange(layout){
        layoutToSave=layout;
      };

    const { messages, browser, reactGridLayout, onLayoutChange} = this.props

    var layout = [
       //{layout.uid.values}
    ];
    
    var layouts = reactGridLayout.layout?{lg:reactGridLayout.layout}:{lg:layout}

    const menuItems=[
      { key: 'save',
        text:messages.save||'save',
        onTouchTap: ()=>onLayoutChange(layoutToSave)
      },
      {
        key: 'reset',
        text:messages.reset||'reset',
        onTouchTap: ()=>onLayoutChange(undefined)
      }

    ];

    const tilesData = [  
         {
           img: 'static/water-plant-821293_640.jpg',
           title: 'Water plant',
           author: 'BkrmadtyaKarki',
         },
       ];



    return (
      <div>
          <ResponsiveReactGridLayout
            onLayoutChange={handleLayoutChange}
            className="layout"
            layouts={layouts}
            autoSize={true}
            breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
            cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
            ref="grid"
          // {GridItems}
            />

      </div>
    )
    
  }
 };
 


export default muiThemeable()(ReactGridLayout);
