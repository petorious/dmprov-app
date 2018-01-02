import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { GRID_UNIT } from '../../../constants';
import Thumbnail from './thumbnail';

import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import ExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import {
  Card,
  CardHeader,
  CardActions,
  CardText,
} from 'material-ui/Card';
//0 here makes the thumbnail the right size for some reason. prepare for bug
const SIZE_CLASSES = {
  thumbnail: [0, 1],
  normal: [4, 1],
  full: [4, 3],
};

class AssetWidget extends Component {

  constructor() {
    super();
    this.getClassName = this.getClassName.bind(this);
    // this.getIconName = this.getIconName.bind(this);
    this.handleContextMenu = this.handleContextMenu.bind(this);
    this.renderThumbnailContents = this.renderThumbnailContents.bind(this);
    this.renderContents = this.renderContents.bind(this);
    // this.handleExpand = this.handleExpand.bind(this);
    // this.handleReduce = this.handleReduce.bind(this);
    // this.handleExpandChange = this.handleExpandChange.bind(this);
  }

  getClassName() {
    // return 'widget ' + this.props.assetType;
    return `widget ${this.props.assetType}`;
  }

  // getIconName() {
  //   return `${this.props.assetType}_icon.png`;
  // }

  handleContextMenu(e) {
    switch (this.props.sizeClass) {
      case 'thumbnail':
        // change to normal
        // console.log('In thumbnail case.');
        this.props.changeSize(...SIZE_CLASSES.normal, 'normal');
        e.preventDefault();
        break;
      case 'normal':
        // console.log('In normal case.');
        // change to full
        this.props.changeSize(...SIZE_CLASSES.full, 'full');
        e.preventDefault();
        break;
      case 'full':
        // console.log('In full case.');
        // change to thumbnail
        this.props.changeSize(...SIZE_CLASSES.thumbnail, 'thumbnail');
        e.preventDefault();
        break;
      default:
        return;
    }
  }



  // handleReduce() {
  //   switch (this.props.handleExpandChange) {
  //     case 'expanded: true':
  //       return this.setState({expanded: false});
  //     case 'expanded: false':
  //       return  this.setstate({expanded: true});  
  //     default:
  //       return this.expanded: true);
  //   }
  // }


  renderContents() {
    switch (this.props.sizeClass) {
      case 'thumbnail':
        return this.renderThumbnailContents();
      case 'full':
        return this.renderFullContents();
      default:
        // 'normal' is implicit default
        return this.renderNormalContents();
    }
  }

  renderThumbnail(id, assetType) {
    return (
      <Thumbnail
        key={`${id}_thumb`}
        id={id}
        width={GRID_UNIT}
        height={GRID_UNIT}
        assetType={assetType}
      />
    );
  }

  // render

  renderThumbnailContents() {
    // console.log(this);
    return this.renderThumbnail(this.props.id, this.props.assetType);
  }

  renderNormalContents() {
    // const thumbnail = this.renderThumbnail(this.props.id, this.props.assetType);

    // const name = (
    //   <span key={`${this.props.id}_normal_name`} className={'asset-widget-name'}>
    //     {this.props.name}
    //   </span>
    // );

    // const slug = (
    //   <span key={`${this.props.id}_normal_slug`} className={'asset-widget-description'}>
    //     {this.props.slug}
    //   </span>
    // );

    // const header = (
    //   <div key={`${this.props.id}_normal_header`} className={'asset-widget-normal-header'}>
    //     {name}
    //     {slug}
    //   </div>
    // );

    // return [
    //   thumbnail,
    //   header,
    // ];


    return (
      <Card style={{ /* padding: '0px' */ }}>
        <CardHeader
          title={this.props.name}
          subtitle={this.props.description}
          avatar={
            <Avatar
              src={'/media/encounter_icon.png'}
              style={{ borderRadius: '0%', margin: '5px', border: '0px' }}
              size={GRID_UNIT-10}
         
            />
          }
          style={
            {
              padding: '10px',
            }}
          textStyle={
            { 
              // paddingLeft: '5px',
              paddingRight: '0px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          showExpandableButton={true}
        />
      </Card>
    );
  }

  renderFullContents() {
    const thumbnail = this.renderThumbnail(this.props.id, this.props.assetType);

    const name = (
      <span key={`${this.props.id}_full_name`} className={'asset-widget-name'}>
        {this.props.name}
      </span>
    );

    // const slug = (
    //   <span key={`${this.props.id}_full_slug`} className={'asset-widget-description'}>
    //     {this.props.slug}
    //   </span>
    // );

    const description = (
      <span key={`${this.props.id}_full_description`} className={'asset-widget-description'}>
        {this.props.description}
      </span>
    );

    const miniHeader = (
      <div key={`${this.props.id}_full_miniheader`} className={'asset-widget-normal-header'}>
        {name}
      </div>
    );

    return (
      <div key={`${this.props.id}_full`} className={'asset-widget-full'}>
        <div key={`${this.props.id}_full_header`} className={'asset-widget-full-header'}>
          {thumbnail}
          {miniHeader}
        </div>
        {description}
      </div>
    );
  }

  render() {
    // const draggableChild = React.Children.only(this.props.children);
    const children = React.Children.toArray(this.props.children)
      .filter((c) => c !== undefined);

    const widgetProps = Object.assign({},
      this.props,
      {
        className: `${this.props.className} ${this.getClassName()}`,
        onContextMenu: this.handleContextMenu,
      });

    const contents = this.renderContents();

    return (
      <div key={this.props.id} {...widgetProps}>
        {contents}
        {children}
      </div>
    );
  }
}

AssetWidget.propTypes = {
  // ReactProps
  children: PropTypes.any,
  className: PropTypes.string,

  // widgetProps
  id: PropTypes.string,
  sizeClass: PropTypes.string,
  changeSize: PropTypes.func,

  // contentProps
  assetType: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  // slug: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default AssetWidget;
