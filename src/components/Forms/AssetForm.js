import React, {Component} from 'react';
import {connect} from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import {Field, reduxForm, formValueSelector } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import {Avatar} from '../../containers/Avatar';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import { setDialogIsOpen } from '../../store/dialogs/actions';
import { ImageCropDialog } from '../../containers/ImageCropDialog';
import { withRouter } from 'react-router-dom';
import muiThemeable from 'material-ui/styles/muiThemeable';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import {SuperSelectField} from '../../containers/SuperSelectField';
import MenuItem from 'material-ui/MenuItem';



class AssetForm extends Component {

  handlePhotoUploadSuccess = (snapshot) =>{
    const { setDialogIsOpen, change}=this.props;
    change('photoURL', snapshot.downloadURL);
    setDialogIsOpen('new_asset_photo', undefined);
  }

  render() {
    const{
      handleSubmit,
      intl,
      initialized,
      setDialogIsOpen,
      dialogs,
      match,
    } = this.props;

    const uid=match.params.uid;

    return (
      <form onSubmit={handleSubmit} style={{
        height: '100%',
        alignItems: 'strech',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
      <button type="submit" style={{display: 'none'}} />

      <div style={{margin: 15, display: 'flex', flexDirection: 'column'}}>

        <div>
          <Field
            name="photoURL"
            size={120}
            component={Avatar}
            icon={
              <FontIcon
                className="material-icons">
                add_circle
              </FontIcon>
            }
            ref="photoURL"
            withRef
          />
        </div>


        <FlatButton
          onClick={()=>{
            setDialogIsOpen('new_asset_photo', true)
          }}
          disabled={uid===undefined || !initialized}
          containerElement='label'
          primary={true}
          icon={
            <FontIcon
              className="material-icons">
              photo_camera
            </FontIcon>
          }
        />
      </div>

      <div>
        <div>
          <Field
            name="asset_name"
            disabled={!initialized}
            component={TextField}
            hintText={intl.formatMessage({id: 'asset_name_hint'})}
            floatingLabelText={intl.formatMessage({id: 'asset_name_label'})}
            ref="asset_name"
            withRef
          />
        </div>

        <div>
          <Field
            name="asset_slug"
            disabled={!initialized}
            component={TextField}
            hintText={intl.formatMessage({id: 'asset_name_hint'})}
            floatingLabelText={intl.formatMessage({id: 'asset_slug_label'})}
            ref="asset_slug"
            withRef
          />
        </div>

        <div>
           <ListItem
              disabled={true}/>
           <Field
              name="asset_type"
              elementHeight={60}
              component={SuperSelectField}
              hintText={intl.formatMessage({id: 'asset_type'})}
              ref="asset_type"
              withRef
            >
            <MenuItem value={1} label={intl.formatMessage({id: 'item'})} primaryText={intl.formatMessage({id: 'item'})}/>
            <MenuItem value={2} label={intl.formatMessage({id: 'npc'})} primaryText={intl.formatMessage({id: 'npc'})}/>
            <MenuItem value={3} label={intl.formatMessage({id: 'location'})} primaryText={intl.formatMessage({id: 'location'})}/>
            <MenuItem value={4} label={intl.formatMessage({id: 'organization'})} primaryText={intl.formatMessage({id: 'organization'})}/>
            <MenuItem value={5} label={intl.formatMessage({id: 'spellpower'})} primaryText={intl.formatMessage({id: 'spellpower'})}/>
            <MenuItem value={6} label={intl.formatMessage({id: 'puztrap'})} primaryText={intl.formatMessage({id: 'puztrap'})}/>
            <MenuItem value={7} label={intl.formatMessage({id: 'condition'})} primaryText={intl.formatMessage({id: 'condition'})}/>
            <MenuItem value={8} label={intl.formatMessage({id: 'encounter'})} primaryText={intl.formatMessage({id: 'encounter'})}/>
            <MenuItem value={9} label={intl.formatMessage({id: 'note'})} primaryText={intl.formatMessage({id: 'note'})}/>
            <MenuItem value={10} label={intl.formatMessage({id: 'vehicle'})} primaryText={intl.formatMessage({id: 'vehicle'})}/>
            <MenuItem value={11} label={intl.formatMessage({id: 'other'})} primaryText={intl.formatMessage({id: 'other'})}/>
           </Field>
          </div>
          <div>
            <Field
              name="asset_subtype"
              disabled={!initialized}
              component={TextField}
              hintText={intl.formatMessage({id: 'asset_subtype_hint'})}
              floatingLabelText={intl.formatMessage({id: 'asset_subtype_label'})}
              ref="asset_subtype"
              withRef
            />
          </div>
        <div>
          <Field
            name="vat"
            disabled={!initialized}
            component={TextField}
            hintText={intl.formatMessage({id: 'vat_hint'})}
            floatingLabelText={intl.formatMessage({id: 'vat_label'})}
            ref="vat"
            withRef
          />
        </div>

        <div>
          <Field
            name="description"
            disabled={!initialized}
            component={TextField}
            multiLine={true}
            rows={2}
            hintText={intl.formatMessage({id: 'description_hint'})}
            floatingLabelText={intl.formatMessage({id: 'description_label'})}
            ref="description"
            withRef
          />
        </div>
        <div>
          <Field
            name="tags"
            disabled={!initialized}
            component={TextField}
            multiLine={true}
            rows={2}
            hintText={intl.formatMessage({id: 'tags_hint'})}
            floatingLabelText={intl.formatMessage({id: 'tags_label'})}
            ref="tags"
            withRef
          />
        </div>


        <ImageCropDialog
          path={`assets/${uid}`}
          fileName={`photoURL`}
          onUploadSuccess={(s)=>{this.handlePhotoUploadSuccess(s) }}
          open={dialogs.new_asset_photo!==undefined}
          src={dialogs.new_asset_photo}
          handleClose={()=>{setDialogIsOpen('new_asset_photo',undefined)}}
          title={intl.formatMessage({id: 'change_photo'})}
        />
      </div>

    </form>
  );
}
}

AssetForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  initialized: PropTypes.bool.isRequired,
  setDialogIsOpen: PropTypes.func.isRequired,
  dialogs: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};


AssetForm=reduxForm({form: 'asset'})(AssetForm);
const selector = formValueSelector('asset')

const mapStateToProps = (state, ownProps) => {
  const { intl, vehicleTypes, users, dialogs } = state;
  const { uid } = ownProps;

  return {
    intl,
    vehicleTypes,
    users,
    uid,
    dialogs,
    photoURL: selector(state, 'photoURL')
  };
};

export default connect(
  mapStateToProps, { setDialogIsOpen }
)(injectIntl(withRouter(muiThemeable()(AssetForm))));
