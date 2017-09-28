import { ReactGridLayout } from 'react-grid-layout';
import muiThemeable from 'material-ui/styles/muiThemeable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {Responsive, WidthProvider} from 'react-grid-layout';
import {onLayoutChange} from '../../store/grids/actions';
import Activity from '../../containers/Activity/Activity';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { injectIntl } from 'react-intl';


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

let layoutToSave=undefined;


class Canvas extends Component{

 
  render() {

    function handleLayoutChange(layout){
      layoutToSave=layout;
    };

    const { messages, browser, canvas, onLayoutChange} = this.props

    var layout = [
      {i: '1', x: 0, y: 0, w: 4, h: 4.2,isResizable:false},
      {i: '2', x: 0, y: 0, w: 3, h: 1},
      {i: '3', x: 4, y: 0, w: 3, h: 3},
      {i: '4', x: 4, y: 0, w: 3, h: 2}
    ];


    var layouts = canvas.layout?{lg:canvas.layout}:{lg:layout}

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
        title: 'Breakfast',
        author: 'jill111',
      },
      {
        title: 'Tasty burger',
        author: 'pashminu',
      },
      {
        title: 'Camera',
        author: 'Danson67',
      },
      {
        title: 'Morning',
        author: 'fancycrave1',
      },
      {
        title: 'Hats',
        author: 'Hans',
      },
      {
        title: 'Honey',
        author: 'fancycravel',
      },
      {
        title: 'Water plant',
        author: 'BkrmadtyaKarki',
      },
    ];


    return (

      <Activity title={messages.canvas}> 
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
                />
              <CardMedia
                overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
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
              {tilesData.map((tile) => (
                <GridTile
                  key={tile.img}
                  title={tile.title}
                  subtitle={<span>by <b>{tile.author}</b></span>}
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
      </Activity>
    );
  }
};
  


  Canvas.propTypes = {
    onLayoutChange: PropTypes.func.isRequired,
    canvas: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired,
    browser: PropTypes.object.isRequired,
  };

export default injectIntl(muiThemeable()(Canvas));

