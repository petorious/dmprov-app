import React, { PropTypes } from 'react';

const Thumbnail = (props) =>
  <img
    alt={'asset-thumbnail'}
    // key={`${props.id}_thumb_img`}
    className={'asset-widget-icon'}
    draggable={false}
    height={`${props.height}px`}
    width={`${props.width}px`}
    src={`/media/${props.assetType}_icon.png`}
  />
;

Thumbnail.propTypes = {
  assetType: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

export default Thumbnail;
