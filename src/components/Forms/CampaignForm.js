import React, {Component} from 'react';
import {connect} from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import {Field, reduxForm, formValueSelector, } from 'redux-form';
import SuperSelectField from 'material-ui-superselectfield'

import { TextField, SelectField } from 'redux-form-material-ui';
import Toggle from 'material-ui/Toggle';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {Avatar} from '../../containers/Avatar';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import { setDialogIsOpen } from '../../store/dialogs/actions';
import { ImageCropDialog } from '../../containers/ImageCropDialog';
import { withRouter } from 'react-router-dom';
import muiThemeable from 'material-ui/styles/muiThemeable';
import PropTypes from 'prop-types';



class Form extends Component {

  handlePhotoUploadSuccess = (snapshot) =>{
    const { setDialogIsOpen, change}=this.props;
    change('photoURL', snapshot.downloadURL);
    setDialogIsOpen('new_campaign_photo', undefined);
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
                import_contacts
              </FontIcon>
            }
            ref="photoURL"
            withRef
          />
        </div>


        <FlatButton
          onClick={()=>{
            setDialogIsOpen('new_campaign_photo', true)
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
            name="campaign_name"
            component={TextField}
            hintText={intl.formatMessage({id: 'campaign_name_hint'})}
            floatingLabelText={intl.formatMessage({id: 'campaign_label'})}
            ref="name"
            withRef
          />
        </div>

        <div>
          <Field
            name="campaign_short_description"
            component={TextField}
            hintText={intl.formatMessage({id: 'campaign_slug_hint'})}
            floatingLabelText={intl.formatMessage({id: 'campaign_slug_label'})}
            ref="full_name"
            withRef
          />
        </div>

        <div>
          <Field
            name="vat"
            component={TextField}
            hintText={intl.formatMessage({id: 'vat_hint'})}
            floatingLabelText={intl.formatMessage({id: 'vat_label'})}
            ref="vat"
            withRef
          />
        </div>

        <div>
          <Field
            name="player_count"
            component={TextField}
            hintText={intl.formatMessage({id: 'player_count_hint'})}
            floatingLabelText={intl.formatMessage({id: 'player_count_label'})}
            ref="player_count"
            withRef
          />
        </div>

        <div>
          <Field
            name="description"
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
          <SuperSelectField
            name="system"
            component={SuperSelectField}
            hintText={intl.formatMessage({id: 'system_hint'})}
            floatingLabelText={intl.formatMessage({id: 'system_label'})}
            ref="system"
            withRef
          >
          <MenuItem value={1} label="5e DnD" primaryText="5e DnD" />
          <MenuItem value={2} label="3.5 DnD" primaryText="3.5e DnD" />
          <MenuItem value={3} label="Pathfinder" primaryText="Pathfinder" />
          <MenuItem value={4} label="Star Wars FFG" primaryText="Star Wars FFG" />
          <MenuItem value={5} label="7e CoC" primaryText="7e CoC" />
          <MenuItem value={5} label="7e Shadowrun" primaryText="7e Shadowrun" />
          </SuperSelectField>
        </div>
        <div>
          <SuperSelectField
            name="genre"
            component={SuperSelectField}
            hintText={intl.formatMessage({id: 'genre_hint'})}
            floatingLabelText={intl.formatMessage({id: 'genre_label'})}
            ref="genre"
            withRef
          >
          <MenuItem value={1} label="Fantasy" primaryText="Fantasy" />
          <MenuItem value={2} label="Steampunk" primaryText="Steampunk" />
          <MenuItem value={3} label="Cyberpunk" primaryText="Cyberpunk" />
          <MenuItem value={4} label="Space" primaryText="Space" />
          <MenuItem value={5} label="Modern" primaryText="Modern" />
          <MenuItem value={5} label="Noir" primaryText="Noir" />
          </SuperSelectField>
        </div>
        <div >
        <ListItem
          rightToggle={
            <Toggle
              toggled={false}
              onToggle={()=>{this.handleToggle}}
            />
          }
          primaryText={intl.formatMessage({id: 'link_widgets' })}
          //secondaryText={val.description}
        />
        <Divider inset={true}/>
      </div>
      <div >
        <ListItem
          rightToggle={
            <Toggle
              toggled={true}
              onToggle={()=>{this.handleToggle}}
            />
          }
          primaryText={intl.formatMessage({id: 'link_tags' })}
          //secondaryText={val.description}
        />
        <Divider inset={true}/>
      </div>;





        <ImageCropDialog
          path={`${uid}/campaigns/`}
          fileName={`photoURL`}
          onUploadSuccess={(s)=>{this.handlePhotoUploadSuccess(s) }}
          open={dialogs.new_campaign_photo!==undefined}
          src={dialogs.new_campaign_photo}
          handleClose={()=>{setDialogIsOpen('new_campaign_photo',undefined)}}
          title={intl.formatMessage({id: 'change_photo'})}
        />
      </div>

    </form>
  );
}
}

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  initialized: PropTypes.bool.isRequired,
  setDialogIsOpen: PropTypes.func.isRequired,
  dialogs: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};


Form=reduxForm({form: 'campaign'})(Form);
const selector = formValueSelector('campaign')

const mapStateToProps = state => {
  const { intl, vehicleTypes, users, dialogs } = state;

  return {
    intl,
    vehicleTypes,
    users,
    dialogs,
    photoURL: selector(state, 'photoURL')
  };
};

export default connect(
  mapStateToProps, { setDialogIsOpen }
)(injectIntl(withRouter(muiThemeable()(Form))));
