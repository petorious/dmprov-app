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
  
  renderGrid(assets) {
    const {history, currentCampaignUid, list, muiTheme, card} =this.props;

  
    if(assets===undefined){
      return <div></div>
    }

    return _.map(assets, (asset, index) => {
``
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
                         primaryText="Expand"
                         onClick={this.onSizeChangeExpand(assets[index])}
                
                       />
                       
                       <MenuItem
                         primaryText="Copy & Paste"
                         rightIcon={<ArrowDropRight />}
                         menuItems={[
                           <MenuItem primaryText="Cut"  />,
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
                         primaryText="Minimize"
                         onClick={this.props.onSizeChangeShrink}
                       
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
          <Tabs>
            <Tab label="D">
                  <div style={ { display: 'flex'} }>
                    <Paper style={ { display: 'inline-block', float: 'center',  margin: '8px 8px 8px 8px',} }>
                     <font color="grey">{asset.val.asset_description}
                     </font>
                     </Paper>
                                       
                   </div>
              </Tab>

              <Tab label='T'>

              </Tab>
              <Tab label='A'>

              </Tab>
              <Tab label='S'>

              </Tab>

            
          </Tabs>
                    

          
        </div>

      
          
          


    });
  }